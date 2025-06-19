// Utility for Sandbar Flood base rate calculation
// Based on project-docs/RateCalc.md and mapping logic

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

// Table data from RateCalc.md
const A_ZONE_RATES: Record<FoundationRow, number[]> = {
  "Pilings, Crawlspace, Foundation wall, properly vented": [0.15, 0.16, 0.18, 0.20, 0.35, 0.70, 1.50],
  "Unvented enclosure": [0.15, 0.17, 0.22, 0.28, 0.35, 0.70, 1.50],
  "Slab": [0.23, 0.23, 0.25, 0.32, 0.48, 0.70, 1.50],
  "Basement": [0.50, 0.55, 0.60, 0.90, 1.00, 1.00, 2.00],
};

const BCX_ZONE_RATES: Record<"Basement" | "All other foundations", number[]> = {
  Basement: [0.15, 0.25, 0.30, 0.50, 0.50, 0.50, 0.50, 0.55, 0.60, 0.90, 1.00],
  "All other foundations": [0.12, 0.12, 0.12, 0.12, 0.12, 0.13, 0.14, 0.15, 0.18, 0.20, 0.35],
};

function getFoundationRow(
  foundationType: FoundationType,
  isProperlyVented: boolean
): FoundationRow {
  if (
    foundationType === "pilings-enclosure" ||
    foundationType === "pilings-no-enclosure" ||
    foundationType === "crawlspace" ||
    foundationType === "full-wall"
  ) {
    return isProperlyVented
      ? "Pilings, Crawlspace, Foundation wall, properly vented"
      : "Unvented enclosure";
  }
  if (foundationType === "slab") return "Slab";
  if (foundationType === "raised") return "Slab";
  if (foundationType === "unfinished") return "Basement";
  if (foundationType === "finished") return "Basement";
  throw new Error("Unknown foundation type");
}

function getRateTable(floodZone: FloodZone): "A Zones" | "B, C & X Zones" {
  // V-Zones are same as A-Zones?
  if (floodZone.toUpperCase().startsWith("A") || floodZone.toUpperCase().startsWith("V")) {
    return "A Zones";
  }
  if (
    floodZone.toUpperCase() === "B" ||
    floodZone.toUpperCase() === "C" ||
    floodZone.toUpperCase() === "X"
  ) {
    return "B, C & X Zones";
  }
  throw new Error("Unknown flood zone");
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

function getARateIndex(elevAboveBFE: number): number {
  // 4+ = 0, 3+ = 1, 2+ = 2, 1+ = 3, 0 = 4, -1 = 5, Below -1 = 6
  // logic rounds up to next foot if tenths is .8 or higher
  if (elevAboveBFE >= 3.8) return 0;
  if (elevAboveBFE >= 2.8) return 1;
  if (elevAboveBFE >= 1.8) return 2;
  if (elevAboveBFE >= 0.8) return 3;
  if (elevAboveBFE >= -0.2) return 4;
  if (elevAboveBFE >= -1.2) return 5;
  return 6; // below -1.2
}

function getBCXRateIndex(elevAboveBFE: number): number {
  // 10+ & up = 0, 9+ = 1, ... 0 = 10
  if (elevAboveBFE >= 9.8) return 0;
  if (elevAboveBFE >= 8.8) return 1;
  if (elevAboveBFE >= 7.8) return 2;
  if (elevAboveBFE >= 6.8) return 3;
  if (elevAboveBFE >= 5.8) return 4;
  if (elevAboveBFE >= 4.8) return 5;
  if (elevAboveBFE >= 3.8) return 6;
  if (elevAboveBFE >= 2.8) return 7;
  if (elevAboveBFE >= 1.8) return 8;
  if (elevAboveBFE >= 0.8) return 9;
  return 10; // below 0.8
}

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

export function calculateBaseRatePremium(input: RateCalcInput): RateCalcOutput {
  const table = getRateTable(input.floodZone);
  const elevAboveBFE = getElevationAboveBFE(input);
  let initialBaseRate = 0;
  let buildingDetails = "";
  let contentsDetails = "";
  let rceAdderApplied = false;
  
  // Get initial base rate
  if (table === "A Zones") {
    const row = getFoundationRow(input.foundationType, input.isProperlyVented);
    initialBaseRate = A_ZONE_RATES[row][getARateIndex(elevAboveBFE)];
    const zoneDetails = `${table}: ${row}, Elevation Difference: ${elevAboveBFE} ft, Initial Rate: ${initialBaseRate}%`;
    buildingDetails = zoneDetails;
    contentsDetails = zoneDetails;
  } else {
    const row = input.foundationType === "unfinished" || input.foundationType === "finished" ? "Basement" : "All other foundations";
    initialBaseRate = BCX_ZONE_RATES[row][getBCXRateIndex(elevAboveBFE)];
    const zoneDetails = `${table}: ${row}, Elevation Difference: ${elevAboveBFE} ft, Initial Rate: ${initialBaseRate}%`;
    buildingDetails = zoneDetails;
    contentsDetails = zoneDetails;
  }

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
    // A and V zone deductible discounts
    if (input.deductible >= 2500 && input.deductible < 5000) {
      deductibleDiscount = 0.03;
      sharedAdjustment -= 0.03; // -3%
      sharedAdjustmentDetails.push(`Deductible $${input.deductible} (A/V Zone): -3% to base rate`);
    } else if (input.deductible >= 5000 && input.deductible < 10000) {
      deductibleDiscount = 0.075;
      sharedAdjustment -= 0.075; // -7.5%
      sharedAdjustmentDetails.push(`Deductible $${input.deductible} (A/V Zone): -7.5% to base rate`);
    } else if (input.deductible >= 10000) {
      deductibleDiscount = 0.15;
      sharedAdjustment -= 0.15; // -15%
      sharedAdjustmentDetails.push(`Deductible $${input.deductible} (A/V Zone): -15% to base rate`);
    }
  } else {
    // B, C, and X zone deductible discounts
    if (input.deductible >= 5000) {
      deductibleDiscount = 0.10;
      sharedAdjustment -= 0.10; // -10%
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
  if (table === "A Zones") {
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