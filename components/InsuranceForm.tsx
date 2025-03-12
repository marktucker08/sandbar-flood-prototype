"use client";
import * as React from "react";
import LocationVerification from "./QuoteFormSteps/LocationVerification";
import InsuredInformation from "./QuoteFormSteps/InsuredInformation";
import PropertyDetails from "./QuoteFormSteps/PropertyDetails";
import ElevationCertificate from "./QuoteFormSteps/ElevationCertificate";
import FoundationInfo from "./QuoteFormSteps/FoundationInfo";
import ConstructionInfo from "./QuoteFormSteps/ConstructionInfo";
import CoverageOptions from "./QuoteFormSteps/CoverageOptions";

interface FormData {
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

export const InsuranceForm = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState<FormData>({});
  // const [isNextDisabled, setIsNextDisabled] = React.useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    <LocationVerification
      key="location"
      onNext={handleNext}
      onBack={handleBack}
      // isFirstStep={true}
      // isNextDisabled={isNextDisabled}
    />,
    <InsuredInformation
      key="insured"
      onNext={handleNext}
      onBack={handleBack}
      // isNextDisabled={isNextDisabled}
    />,
    <PropertyDetails
      key="property"
      onNext={handleNext}
      onBack={handleBack}
      // isNextDisabled={isNextDisabled}
    />,
    <FoundationInfo
      key="foundation"
      onNext={handleNext}
      onBack={handleBack}
      // isNextDisabled={isNextDisabled}
    />,
    <ElevationCertificate
      key="elevation"
      onNext={handleNext}
      onBack={handleBack}
      // isNextDisabled={isNextDisabled}
    />,
    <ConstructionInfo
      key="construction"
      onNext={handleNext}
      onBack={handleBack}
      // isNextDisabled={isNextDisabled}
    />,
    <CoverageOptions
      key="coverage"
      onNext={() => {
        console.log("Submitting form data:", formData);
        // Handle form submission here
      }}
      onBack={handleBack}
      // isLastStep={true}
      // isNextDisabled={isNextDisabled}
    />,
  ];

  // Update form data
  const updateFormData = (stepData: Partial<FormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...stepData,
    }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {React.cloneElement(steps[currentStep], {
          formData,
          updateFormData,
        })}
      </div>
    </main>
  );
};
