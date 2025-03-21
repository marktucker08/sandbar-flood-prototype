export interface QuoteFormData {
  // Location Verification
  address?: string;
  
  // Insured Information
  insuredType?: 'individual' | 'business';
  insuredFirstName?: string;
  insuredLastName?: string;
  additionalInsuredFirstName?: string;
  additionalInsuredLastName?: string;
  mailingAddress?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;

  // Property Details
  effectiveDate?: string;
  waitingPeriod?: 'standard' | 'loan';
  yearBuilt?: string;
  numberOfStories?: string;
  numberOfFamilies?: string;
  squareFootage?: string;
  occupancy?: 'primary' | 'secondary' | 'seasonal' | 'rental';

  // Foundation Info
  foundation?: 'slab' | 'raised' | 'unfinished' | 'finished' | 'pilings-enclosure' | 'pilings-no-enclosure' | 'full-wall';

  // Elevation Certificate
  elevationCertificate?: string;

  // Construction Info
  constructionType?: string;

  // Coverage Options
  buildingReplacementCost?: string;
  contentsReplacementCost?: string;
  buildingCoverage?: string;
  contentsCoverage?: string;
  lossOfUseCoverage?: string;
  deductible?: string;
} 