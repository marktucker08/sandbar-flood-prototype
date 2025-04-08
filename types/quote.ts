export interface QuoteFormData {
  // Location Verification
  streetAddress?: string;
  unitAptSuite?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  
  // Insured Information
  insuredType?: 'individual' | 'business';
  firstName?: string;
  lastName?: string;
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
  occupancyType?: string;

  // Foundation Info
  foundationType?: string;

  // Elevation Certificate
  hasCertificate?: boolean;
  certificateNumber?: string;
  elevation?: string;
  stepsToFrontDoor?: string;
  elevationCertificate?: File;

  // Construction Info
  constructionType?: string;
  constructionDocs?: File | null;

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
} 