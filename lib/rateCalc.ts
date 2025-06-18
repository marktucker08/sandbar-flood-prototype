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

export function calculateBaseRatePremium(input: RateCalcInput): {
  premium: number;
  baseRatePercent: number;
  discounts: { primary: boolean; deductible: number };
  minimumApplied: boolean;
  details: string;
  rceAdderApplied?: boolean;
} {
  const table = getRateTable(input.floodZone);
  const elevAboveBFE = getElevationAboveBFE(input);
  let baseRatePercent = 0;
  let details = "";
  let rceAdderApplied = false;
  if (table === "A Zones") {
    const row = getFoundationRow(input.foundationType, input.isProperlyVented);
    baseRatePercent = A_ZONE_RATES[row][getARateIndex(elevAboveBFE)];
    details = `A Zones: ${row}, Elevation Difference: ${elevAboveBFE} ft, Rate: ${baseRatePercent}%`;
  } else {
    const row = input.foundationType === "unfinished" || input.foundationType === "finished" ? "Basement" : "All other foundations";
    baseRatePercent = BCX_ZONE_RATES[row][getBCXRateIndex(elevAboveBFE)];
    details = `B, C & X Zones: ${row}, Elevation Difference: ${elevAboveBFE} ft, Rate: ${baseRatePercent}%`;
  }
  // RCE Adder
  if (input.replacementCost > 0) {
    const rce = input.buildingCoverage / input.replacementCost;
    if (rce < 0.5) {
      baseRatePercent = +(baseRatePercent * 1.25).toFixed(4);
      rceAdderApplied = true;
      details += `\nRCE < 50%: 25% adder applied to base rate.`;
    }
  }
  // Calculate base premium
  const basePremium = ((input.buildingCoverage + input.contentsCoverage) * baseRatePercent) / 100;
  // Discounts
  let discount = 0;
  let primary = false;
  const discountDetails: string[] = [];
  if (input.occupancyType.toLowerCase() === "primary") {
    discount += 0.075;
    primary = true;
    discountDetails.push("Primary residence: -7.5% off");
  }
  let deductibleDiscount = 0;
  if (input.deductible >= 2500 && input.deductible < 5000) {
    deductibleDiscount = 0.03;
    discountDetails.push(`Deductible $${input.deductible}: -3% off`);
  } else if (input.deductible >= 5000 && input.deductible < 10000) {
    deductibleDiscount = 0.075;
    discountDetails.push(`Deductible $${input.deductible}: -7.5% off`);
  } else if (input.deductible >= 10000) {
    deductibleDiscount = 0.15;
    discountDetails.push(`Deductible $${input.deductible}: -15% off`);
  }
  discount += deductibleDiscount;
  let premium = basePremium * (1 - discount);
  let minimumApplied = false;
  if (table === "A Zones" && premium < 450) {
    premium = 450;
    minimumApplied = true;
  }
  if (discountDetails.length > 0) {
    details += `\nDiscounts applied: ${discountDetails.join(", ")}. Total discount: -${(discount * 100).toFixed(1)}%`;
  }
  return {
    premium: Math.round(premium),
    baseRatePercent,
    discounts: { primary, deductible: deductibleDiscount },
    minimumApplied,
    details,
    rceAdderApplied,
  };
} 