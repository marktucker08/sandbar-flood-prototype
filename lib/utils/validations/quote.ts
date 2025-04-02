import { z } from "zod";

// Complete Quote Form Schema
export const quoteFormSchema = z.object({
  // Location Verification
  streetAddress: z.string().min(1, "Street address is required"),
  unitAptSuite: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required").max(5, "ZIP code must be 5 digits"),
  
  // Insured Information
  insuredType: z.enum(["individual", "business"]),
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  businessName: z.string().min(1, "Business name is required").optional(),
  entityType: z.string().optional(),
  additionalInsured: z.string().optional(),
  sameAsPropertyAddress: z.boolean(),
  mailingAddress: z.string().min(1, "Mailing address is required"),
  mailingAddressLine2: z.string().optional(),
  mailingCity: z.string().min(1, "Mailing city is required"),
  mailingState: z.string().min(1, "Mailing state is required"),
  mailingZipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format"),

  // Property Details
  effectiveDate: z.string().min(1, "Effective date is required"),
  waitingPeriod: z.enum(["standard", "loan"]),
  yearBuilt: z.string().min(1, "Year built is required"),
  squareFootage: z.string().min(1, "Square footage is required"),
  numberOfStories: z.string().min(1, "Number of stories is required"),
  numberOfFamilies: z.string().min(1, "Number of families is required"),
  occupancyType: z.enum(["primary", "secondary", "seasonal", "rental"]),

  // Foundation Info
  foundationType: z.enum([
    "slab",
    "raised",
    "unfinished",
    "finished",
    "pilings-enclosure",
    "pilings-no-enclosure",
    "full-wall"
  ]),

  // Elevation Certificate
  hasCertificate: z.boolean(),
  certificateNumber: z.string().optional(),
  elevation: z.string().optional(),
  stepsToFrontDoor: z.string().optional(),

  // Construction Info
  constructionType: z.enum(["frame", "masonry", "superior"]),

  // Coverage Options
  buildingReplacementCost: z.string().min(1, "Building replacement cost is required"),
  contentsReplacementCost: z.string().min(1, "Contents replacement cost is required"),
  buildingCoverage: z.string().min(1, "Building coverage is required"),
  contentsCoverage: z.string().min(1, "Contents coverage is required"),
  lossOfUseCoverage: z.string().min(1, "Loss of use coverage is required"),
}).refine((data) => {
  if (data.insuredType === "individual") {
    return data.firstName && data.lastName;
  }
  return data.businessName && data.entityType;
}, {
  message: "Business name and entity type are required for business accounts",
  path: ["businessName"],
}).refine((data) => {
  if (data.hasCertificate) {
    return data.certificateNumber && data.elevation;
  }
  return true;
}, {
  message: "Certificate number and elevation are required when certificate is available",
  path: ["certificateNumber"],
}).refine((data) => {
  const buildingCost = parseFloat(data.buildingReplacementCost);
  const buildingCoverage = parseFloat(data.buildingCoverage);
  const contentsCost = parseFloat(data.contentsReplacementCost);
  const contentsCoverage = parseFloat(data.contentsCoverage);

  return buildingCoverage <= buildingCost && contentsCoverage <= contentsCost;
}, {
  message: "Coverage amounts cannot exceed replacement costs",
  path: ["buildingCoverage"],
}).refine((data) => {
  if (!data.sameAsPropertyAddress) {
    return data.mailingAddress && data.mailingCity && data.mailingState && data.mailingZipCode;
  }
  return true;
}, {
  message: "Mailing address fields are required when using a different address",
  path: ["mailingAddress"],
});

export type QuoteFormSchema = z.infer<typeof quoteFormSchema>; 