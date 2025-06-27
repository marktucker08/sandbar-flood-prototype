// Utility for Sandbar Flood base rate calculation
// Based on project-docs/RateCalc.md and mapping logic

import { createClient } from "./supabase/client";

export type FoundationType =
  | "pilings-enclosure"
  | "pilings-no-enclosure"
  | "crawlspace"
  | "full-wall"
  | "slab"
  | "unfinished"
  | "finished"
  | "raised";

export type FloodZone = string; // e.g., "A", "AE", "X", etc.

export interface RateCalcInput {
  propertyElevation: number; // from API
  baseFloodElevation: number; // from API
  certificateElevation?: number; // optional
  numberOfSteps?: number; // optional, if no certificateElevation
  foundationType: FoundationType;
  isProperlyVented: boolean;
  floodZone: FloodZone;
  occupancyType: string; // e.g., "primary", "secondary"
  deductible: 1500 | 2500 | 5000 | 10000;
  buildingCoverage: number;
  contentsCoverage: number;
  replacementCost: number; // NEW: for RCE calculation
}

// Foundation row types for table lookup
export type FoundationRow =
  | "Pilings, Crawlspace, Foundation wall, properly vented"
  | "Unvented enclosure"
  | "Slab"
  | "Basement";

export interface RateCalcOutput {
  buildingPremium: number;
  contentsPremium: number;
  buildingBaseRate: number;
  contentsBaseRate: number;
  discounts: {
    primary: boolean;
    deductible: number;
    buildingCoverageLimit: number;
  };
  minimumApplied: boolean;
  buildingDetails: string;
  contentsDetails: string;
  rceAdderApplied?: boolean;
}

export async function calculateBaseRatePremium(input: RateCalcInput): Promise<RateCalcOutput> {
  // Determine zone type for DB lookup
  const zoneType = input.floodZone.toUpperCase().startsWith('A') || input.floodZone.toUpperCase().startsWith('V')
    ? 'A'
    : input.floodZone.toUpperCase();

  // Map foundation type for DB lookup
  const foundationTypeForDb = mapFoundationTypeForBaseRates(
    input.foundationType,
    input.isProperlyVented,
    input.floodZone
  );

  // Determine elevation diff string for DB lookup
  let elevationDiff: string;
  const elevAboveBFE = getElevationAboveBFE(input);
  if (zoneType === 'A') {
    // 4+ = 0, 3+ = 1, 2+ = 2, 1+ = 3, 0 = 4, -1 = 5, Below -1 = 6
    if (elevAboveBFE >= 3.8) elevationDiff = '4+';
    else if (elevAboveBFE >= 2.8) elevationDiff = '3+';
    else if (elevAboveBFE >= 1.8) elevationDiff = '2+';
    else if (elevAboveBFE >= 0.8) elevationDiff = '1+';
    else if (elevAboveBFE >= -0.2) elevationDiff = '0';
    else if (elevAboveBFE >= -1.2) elevationDiff = '-1';
    else elevationDiff = 'Below -1';
  } else {
    // 10+ & up = 0, 9+ = 1, ... 0 = 10
    if (elevAboveBFE >= 9.8) elevationDiff = '10+';
    else if (elevAboveBFE >= 8.8) elevationDiff = '9+';
    else if (elevAboveBFE >= 7.8) elevationDiff = '8+';
    else if (elevAboveBFE >= 6.8) elevationDiff = '7+';
    else if (elevAboveBFE >= 5.8) elevationDiff = '6+';
    else if (elevAboveBFE >= 4.8) elevationDiff = '5+';
    else if (elevAboveBFE >= 3.8) elevationDiff = '4+';
    else if (elevAboveBFE >= 2.8) elevationDiff = '3+';
    else if (elevAboveBFE >= 1.8) elevationDiff = '2+';
    else if (elevAboveBFE >= 0.8) elevationDiff = '1+';
    else elevationDiff = '0';
  }

  // Fetch base rate from DB
  const initialBaseRate = await getBaseRateFromDb(zoneType, foundationTypeForDb, elevationDiff);
  if (initialBaseRate === null) {
    throw new Error(`No base rate found for zone: ${zoneType}, foundation: ${foundationTypeForDb}, elevation: ${elevationDiff}`);
  }

  let buildingDetails = `${zoneType} Zone: ${foundationTypeForDb}, Elevation Difference: ${elevAboveBFE} ft, Initial Rate: ${initialBaseRate}%`;
  let contentsDetails = buildingDetails;
  let rceAdderApplied = false;

  // Calculate shared adjustments (apply to both building and contents)
  let sharedAdjustment = 0;
  const sharedAdjustmentDetails: string[] = [];

  // Primary residence discount
  let primary = false;
  if (input.occupancyType.toLowerCase() === "primary") {
    sharedAdjustment -= 0.075; // -7.5%
    primary = true;
    sharedAdjustmentDetails.push("Primary residence: -7.5% to base rate");
  }

  // Deductible discount
  let deductibleDiscount = 0;
  const isAVZone = input.floodZone.toUpperCase().startsWith('A') || input.floodZone.toUpperCase().startsWith('V');
  if (isAVZone) {
    if (input.deductible >= 2500 && input.deductible < 5000) {
      deductibleDiscount = 0.03;
      sharedAdjustment -= 0.03;
      sharedAdjustmentDetails.push(`Deductible $${input.deductible} (A/V Zone): -3% to base rate`);
    } else if (input.deductible >= 5000 && input.deductible < 10000) {
      deductibleDiscount = 0.075;
      sharedAdjustment -= 0.075;
      sharedAdjustmentDetails.push(`Deductible $${input.deductible} (A/V Zone): -7.5% to base rate`);
    } else if (input.deductible >= 10000) {
      deductibleDiscount = 0.15;
      sharedAdjustment -= 0.15;
      sharedAdjustmentDetails.push(`Deductible $${input.deductible} (A/V Zone): -15% to base rate`);
    }
  } else {
    if (input.deductible >= 5000) {
      deductibleDiscount = 0.10;
      sharedAdjustment -= 0.10;
      sharedAdjustmentDetails.push(`Deductible $${input.deductible} (B/C/X Zone): -10% to base rate`);
    }
  }

  // Calculate building-specific adjustments
  let buildingAdjustment = sharedAdjustment;
  const buildingAdjustmentDetails = [...sharedAdjustmentDetails];

  // Building Coverage limits discount
  let buildingCoverageLimitDiscount = 0;
  if (input.buildingCoverage > 500000) {
    buildingCoverageLimitDiscount = 0.12; // -12%
    buildingAdjustment -= 0.12;
    buildingAdjustmentDetails.push("Building coverage above $500,000: -12% to base rate");
  } else if (input.buildingCoverage >= 300000) {
    buildingCoverageLimitDiscount = 0.075; // -7.5%
    buildingAdjustment -= 0.075;
    buildingAdjustmentDetails.push("Building coverage $300,000-$500,000: -7.5% to base rate");
  }

  // RCE Adder (building only)
  if (input.replacementCost > 0) {
    const rce = input.buildingCoverage / input.replacementCost;
    if (rce < 0.5) {
      buildingAdjustment += 0.25; // +25%
      rceAdderApplied = true;
      buildingAdjustmentDetails.push("RCE < 50%: +25% to base rate");
    }
  }

  // Apply adjustments to get initial adjusted rates
  const adjustedBuildingRate = initialBaseRate * (1 + buildingAdjustment);
  const adjustedContentsRate = initialBaseRate * (1 + sharedAdjustment);

  // Add adjustment details to both summaries
  buildingDetails += `\nInitial base rate: ${initialBaseRate}%`;
  contentsDetails += `\nInitial base rate: ${initialBaseRate}%`;

  if (buildingAdjustmentDetails.length > 0) {
    buildingDetails += `\nRate adjustments: ${buildingAdjustmentDetails.join(", ")}`;
    buildingDetails += `\nNet rate adjustment: ${(buildingAdjustment * 100).toFixed(1)}%`;
    buildingDetails += `\nAdjusted building rate: ${adjustedBuildingRate.toFixed(4)}%`;
  }

  if (sharedAdjustmentDetails.length > 0) {
    contentsDetails += `\nRate adjustments: ${sharedAdjustmentDetails.join(", ")}`;
    contentsDetails += `\nNet rate adjustment: ${(sharedAdjustment * 100).toFixed(1)}%`;
    contentsDetails += `\nAdjusted contents rate: ${adjustedContentsRate.toFixed(4)}%`;
  }

  // Apply minimum adjusted base rate of 0.11%
  const MINIMUM_ADJUSTED_BASE_RATE = 0.11;
  let finalBuildingRate = adjustedBuildingRate;
  let finalContentsRate = adjustedContentsRate;

  if (adjustedBuildingRate < MINIMUM_ADJUSTED_BASE_RATE) {
    finalBuildingRate = MINIMUM_ADJUSTED_BASE_RATE;
    buildingDetails += `\nMinimum adjusted base rate of ${MINIMUM_ADJUSTED_BASE_RATE}% applied`;
  }

  if (adjustedContentsRate < MINIMUM_ADJUSTED_BASE_RATE) {
    finalContentsRate = MINIMUM_ADJUSTED_BASE_RATE;
    contentsDetails += `\nMinimum adjusted base rate of ${MINIMUM_ADJUSTED_BASE_RATE}% applied`;
  }

  // Calculate separate premiums
  let buildingPremium = (input.buildingCoverage * finalBuildingRate) / 100;
  let contentsPremium = (input.contentsCoverage * finalContentsRate) / 100;

  // Apply minimum premium if needed (A Zones only)
  let minimumApplied = false;
  if (zoneType === "A") {
    const totalPremium = buildingPremium + contentsPremium;
    if (totalPremium < 450) {
      // Distribute the minimum premium proportionally between building and contents
      const ratio = buildingPremium / totalPremium;
      buildingPremium = 450 * ratio;
      contentsPremium = 450 * (1 - ratio);
      minimumApplied = true;
      buildingDetails += "\nMinimum premium of $450 applied for A Zones (proportionally distributed)";
      contentsDetails += "\nMinimum premium of $450 applied for A Zones (proportionally distributed)";
    }
  }

  return {
    buildingPremium: Math.round(buildingPremium),
    contentsPremium: Math.round(contentsPremium),
    buildingBaseRate: +finalBuildingRate.toFixed(4),
    contentsBaseRate: +finalContentsRate.toFixed(4),
    discounts: {
      primary,
      deductible: deductibleDiscount,
      buildingCoverageLimit: buildingCoverageLimitDiscount
    },
    minimumApplied,
    buildingDetails,
    contentsDetails,
    rceAdderApplied,
  };
}

/**
 * Fetches the base rate from the database for the given zone, foundation, and elevation diff.
 * @param zoneType e.g. 'A', 'B', 'C', 'X'
 * @param foundationType e.g. 'VENTED', 'UNVENTED', 'SLAB', 'BASEMENT', 'OTHER'
 * @param elevationDiff e.g. '4+', '3+', '2+', '1+', '0', '-1', 'Below -1', '10+', etc.
 * @returns rate as number, or null if not found
 */
export async function getBaseRateFromDb(
  zoneType: string,
  foundationType: string,
  elevationDiff: string
): Promise<number | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('base_rates')
    .select('rate')
    .eq('zone_type', zoneType)
    .eq('foundation_type', foundationType)
    .eq('elevation_diff', elevationDiff)
    .single();

  if (error || !data) {
    // Optionally log error
    return null;
  }
  return Number(data.rate);
}

/**
 * Maps the input foundation type, venting, and flood zone to the correct foundation type string for base_rates lookup.
 */
export function mapFoundationTypeForBaseRates(
  foundationType: FoundationType,
  isProperlyVented: boolean,
  floodZone: string
): string {
  const zone = floodZone.toUpperCase();
  if (zone.startsWith("A") || zone.startsWith("V")) {
    if (
      foundationType === "pilings-enclosure" ||
      foundationType === "pilings-no-enclosure" ||
      foundationType === "crawlspace" ||
      foundationType === "full-wall"
    ) {
      return isProperlyVented ? "VENTED" : "UNVENTED";
    }
    if (foundationType === "slab" || foundationType === "raised") return "SLAB";
    if (foundationType === "unfinished" || foundationType === "finished") return "BASEMENT";
  } else if (["B", "C", "X"].includes(zone)) {
    if (foundationType === "unfinished" || foundationType === "finished") return "BASEMENT";
    return "OTHER";
  }
  throw new Error(`Unknown foundation type (${foundationType}) or flood zone (${floodZone}) for base_rates mapping`);
}

function getElevationAboveBFE(input: RateCalcInput): number {
  // If certificateElevation is provided, use it. Otherwise, use numberOfSteps * 7in (converted to ft)
  let elevation = input.propertyElevation;
  if (typeof input.certificateElevation === "number") {
    elevation = input.certificateElevation;
  } else if (typeof input.numberOfSteps === "number") {
    elevation = input.propertyElevation + (input.numberOfSteps * 7) / 12;
  }
  return +(elevation - input.baseFloodElevation).toFixed(1); // round to 1 decimal
} 