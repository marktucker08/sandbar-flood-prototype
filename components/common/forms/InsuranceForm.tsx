"use client";
import * as React from "react";
import BuildingTypeSelection from "./QuoteFormSteps/BuildingTypeSelection";
import LocationVerification from "./QuoteFormSteps/LocationVerification";
import InsuredInformation from "./QuoteFormSteps/InsuredInformation";
import PropertyDetails from "./QuoteFormSteps/PropertyDetails";
import ElevationCertificate from "./QuoteFormSteps/ElevationCertificate";
import FoundationInfo from "./QuoteFormSteps/FoundationInfo";
import ConstructionInfo from "./QuoteFormSteps/ConstructionInfo";
import CoverageOptions from "./QuoteFormSteps/CoverageOptions";
import QuoteSummary from "./QuoteFormSteps/QuoteSummary";
import { QuoteFormData } from "@/types/quote";
import { QUOTE_FORM_STEPS, FormStep } from "@/lib/constants/formSteps";
// import { ProgressBar } from "@/components/features/quotes/ProgressBar";

export const InsuranceForm = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState<QuoteFormData>({});
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setCompletedSteps((prev) => {
        if (!prev.includes(currentStep)) {
          return [...prev, currentStep];
        }
        return prev;
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (index: number) => {
    // Only allow navigation to previous/completed steps
    if (index < currentStep && completedSteps.includes(index)) {
      setCurrentStep(index);
    }
  };

  const updateFormData = (stepData: Partial<QuoteFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...stepData,
    }));
  };

  const progressSteps: FormStep[] = React.useMemo(() => {
    return QUOTE_FORM_STEPS.map((step, index) => ({
      ...step,
      isActive: currentStep === index
    }));
  }, [currentStep]);

  const steps = [
    <BuildingTypeSelection
      key="building-type"
      onNext={handleNext}
      formData={formData}
      updateFormData={updateFormData}
      progressSteps={progressSteps}
      currentStep={currentStep}
      completedSteps={completedSteps}
    />,
    <LocationVerification
      key="location"
      onNext={handleNext}
      onBack={handleBack}
      formData={formData}
      updateFormData={updateFormData}
      progressSteps={progressSteps}
      currentStep={currentStep}
      completedSteps={completedSteps}
    />,
    <InsuredInformation
      key="insured"
      onNext={handleNext}
      onBack={handleBack}
      formData={formData}
      updateFormData={updateFormData}
      progressSteps={progressSteps}
      currentStep={currentStep}
      completedSteps={completedSteps}
    />,
    <PropertyDetails
      key="property"
      onNext={handleNext}
      onBack={handleBack}
      formData={formData}
      updateFormData={updateFormData}
      progressSteps={progressSteps}
      currentStep={currentStep}
      completedSteps={completedSteps}
    />,
    <FoundationInfo
      key="foundation"
      onNext={handleNext}
      onBack={handleBack}
      formData={formData}
      updateFormData={updateFormData}
      progressSteps={progressSteps}
      currentStep={currentStep}
      completedSteps={completedSteps}
    />,
    <ElevationCertificate
      key="elevation"
      onNext={handleNext}
      onBack={handleBack}
      formData={formData}
      updateFormData={updateFormData}
      progressSteps={progressSteps}
      currentStep={currentStep}
      completedSteps={completedSteps}
    />,
    <ConstructionInfo
      key="construction"
      onNext={handleNext}
      onBack={handleBack}
      formData={formData}
      updateFormData={updateFormData}
      progressSteps={progressSteps} 
      currentStep={currentStep}
      completedSteps={completedSteps}
    />,
    <CoverageOptions
      key="coverage"
      onBack={handleBack}
      onNext={handleNext}
      formData={formData}
      updateFormData={updateFormData}
      progressSteps={progressSteps}
      currentStep={currentStep}
      completedSteps={completedSteps}
    />,
    <QuoteSummary
      key="summary"
      onBack={handleBack}
      formData={formData}
      updateFormData={updateFormData}
      progressSteps={progressSteps}
      setCurrentStep={setCurrentStep}
      currentStep={currentStep}
      completedSteps={completedSteps}
    />,
  ];

  return (
    <main className="background-gradient min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* <ProgressBar
          steps={progressSteps}
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={handleStepClick}
        /> */}
        {React.cloneElement(steps[currentStep], {
          formData,
          updateFormData,
          progressSteps,
          currentStep,
          completedSteps,
          onStepClick: handleStepClick,
        })}
      </div>
    </main>
  );
};
