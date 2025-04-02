"use client";
import * as React from "react";
import LocationVerification from "./QuoteFormSteps/LocationVerification";
import InsuredInformation from "./QuoteFormSteps/InsuredInformation";
import PropertyDetails from "./QuoteFormSteps/PropertyDetails";
import ElevationCertificate from "./QuoteFormSteps/ElevationCertificate";
import FoundationInfo from "./QuoteFormSteps/FoundationInfo";
import ConstructionInfo from "./QuoteFormSteps/ConstructionInfo";
import CoverageOptions from "./QuoteFormSteps/CoverageOptions";
import { QuoteFormData } from "@/types/quote";

export const InsuranceForm = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState<QuoteFormData>({});

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

  const updateFormData = (stepData: Partial<QuoteFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...stepData,
    }));
  };

  const steps = [
    <LocationVerification
      key="location"
      onNext={handleNext}
      onBack={handleBack}
      formData={formData}
      updateFormData={updateFormData}
    />,
    <InsuredInformation
      key="insured"
      onNext={handleNext}
      onBack={handleBack}
      formData={formData}
      updateFormData={updateFormData}
    />,
    <PropertyDetails
      key="property"
      onNext={handleNext}
      onBack={handleBack}
      formData={formData}
      updateFormData={updateFormData}
    />,
    <FoundationInfo
      key="foundation"
      onNext={handleNext}
      onBack={handleBack}
      formData={formData}
      updateFormData={updateFormData}
    />,
    <ElevationCertificate
      key="elevation"
      onNext={handleNext}
      onBack={handleBack}
      formData={formData}
      updateFormData={updateFormData}
    />,
    <ConstructionInfo
      key="construction"
      onNext={handleNext}
      onBack={handleBack}
      formData={formData}
      updateFormData={updateFormData}
    />,
    <CoverageOptions
      key="coverage"
      onBack={handleBack}
      formData={formData}
      updateFormData={updateFormData}
    />,
  ];

  return (
    <main className="background-gradient min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {React.cloneElement(steps[currentStep], {
          formData,
          updateFormData,
        })}
      </div>
    </main>
  );
};
