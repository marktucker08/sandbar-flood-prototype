"use client";
import React from "react";
import FormInput from "../FormInput";
import FormStepLayout from "./FormStepLayout";
import { QuoteFormData } from "@/types/quote";

interface LocationVerificationProps {
  onNext: () => void;
  onBack: () => void;
  formData?: QuoteFormData;
  updateFormData?: (data: Partial<QuoteFormData>) => void;
}

const LocationVerification: React.FC<LocationVerificationProps> = ({
  onNext,
  onBack,
}) => {
  const progressSteps = [
    { label: "Location", sublabel: "Verification", isActive: true },
    { label: "Insured", sublabel: "Information", isActive: false },
    { label: "Property", sublabel: "Details", isActive: false },
    { label: "Foundation", sublabel: "Type", isActive: false },
    { label: "Elevation", sublabel: "Certificate", isActive: false },
    { label: "Construction", sublabel: "Type", isActive: false },
    { label: "Coverage", sublabel: "Options", isActive: false },
  ];

  return (
    <FormStepLayout 
      title="Property Location"
      progressSteps={progressSteps}
      onNext={onNext}
      onBack={onBack}
    >     
          <div className="space-y-6">
            <FormInput
              label="Street Address"
              placeholder="Enter your street address"
              type="text"
            />
            <FormInput
              label="Unit/Apt/Suite"
              placeholder="Optional"
              type="text"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormInput
                label="City"
                placeholder="Enter city"
                type="text"
              />
              <FormInput
                label="State"
                placeholder="Enter state"
                type="text"
              />
              <FormInput
                label="ZIP Code"
                placeholder="Enter ZIP"
                type="text"
              />
            </div>
          </div>
    </FormStepLayout>
  );
};

export default LocationVerification;

