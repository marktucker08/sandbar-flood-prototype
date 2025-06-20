export const BuildingType = [
  { value: "one_home", label: "One Home" },
  { value: "residential_condo", label: "Residential Condo" },
  { value: "mixed_use", label: "Mixed Use" },
  { value: "apartment", label: "Apartment" },
  { value: "commercial", label: "Commercial" },
  { value: "hotel", label: "Hotel" }
]

export const FoundationType = [
  { value: "crawlspace", label: "Crawlspace" },
  { value: "slab", label: "Slab at Grade" },
  { value: "raised", label: "Raised Slab on Fill" },
  { value: "unfinished", label: "Unfinished Basement" },
  { value: "finished", label: "Finished Basement" },
  { value: "pilings-enclosure", label: "Elevated on Pilings with Enclosure" },
  { value: "pilings-no-enclosure", label: "Elevated on Pilings with No Enclosure" },
  { value: "full-wall", label: "Elevated on Full Foundation Wall" }
]

export interface QuoteFormData {
  buildingType?: typeof BuildingType[number]["value"]; 
  // Location Verification
  formattedAddress?: string;
  streetAddress?: string;
  unitAptSuite?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  latLng?: { lat: number, lng: number };
  
  // Insured Information
  insuredType?: 'individual' | 'business';
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  businessName?: string;
  entityType?: string;
  additionalInsured?: string;
  sameAsPropertyAddress?: boolean;
  mailingAddress?: string;
  mailingAddressLine2?: string;
  mailingCity?: string;
  mailingState?: string;
  mailingZipCode?: string;

  // Property Details
  effectiveDate?: string;
  waitingPeriod?: 'standard' | 'loan';
  yearBuilt?: string;
  squareFootage?: string;
  numberOfStories?: string;
  numberOfFamilies?: string;
  numberOfUnits?: string;
  occupancyType?: string;
  condoType?: string;
  commercialOccupancy?: string;
  numberOfResidentialUnits?: string;
  numberOfCommercialUnits?: string;

  // Flood Data
  baseFloodElevation?: string; // BFE
  propertyElevation?: string; // Property Elevation
  floodZone?: string; // Flood Zone
  floodZoneVerified?: boolean; // Flood Zone Verified
  correctedFloodZone?: string; // Corrected Flood Zone

  // Foundation Info
  foundationType?: typeof FoundationType[number]["value"];
  isFoundationVented?: boolean;

  // Elevation Certificate
  hasCertificate?: boolean;
  certificateElevation?: string;
  stepsToFrontDoor?: string;

  // Construction Info
  constructionType?: string;

  // Coverage Options
  buildingReplacementCost?: string;
  contentsReplacementCost?: string;
  buildingCoverage?: string;
  contentsCoverage?: string;
  lossOfUseCoverage?: string;
  deductible?: string;

  // Quote Calculation
  riskFactor?: string;
  premium?: string;

  // Add other quote form fields as needed
} 