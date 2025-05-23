"use client";
import React from "react";
import { FormInput } from "@/components/common/ui/form";
import FormStepLayout from "./FormStepLayout";
import { QuoteFormData } from "@/types/quote";
import { FormStep } from "@/lib/constants/formSteps";
import { z } from "zod";
import { MapPin } from "lucide-react";

interface LocationVerificationProps {
  onNext: () => void;
  onBack: () => void;
  formData: QuoteFormData;
  updateFormData: (data: Partial<QuoteFormData>) => void;
  progressSteps: FormStep[];
}

const locationSchema = z.object({
  streetAddress: z.string().min(1, "Street address is required"),
  unitAptSuite: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string()
    .min(1, "ZIP code is required")
    // .regex(/^\d{5}$/, "ZIP code must contain only numbers"),
});

type LocationFields = keyof z.infer<typeof locationSchema>;

const LocationVerification: React.FC<LocationVerificationProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
  progressSteps,
}) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (field: keyof QuoteFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    updateFormData?.({ [field]: newValue });

    if (field in locationSchema.shape) {
      try {
        locationSchema.shape[field as LocationFields].parse(newValue);
        setErrors(prev => ({ ...prev, [field]: "" }));
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
        }
      }
    }
  };

  const handleNext = () => {
    const locationFields = {
      streetAddress: formData?.streetAddress,
      unitAptSuite: formData?.unitAptSuite,
      city: formData?.city,
      state: formData?.state,
      zipCode: formData?.zipCode,
    };

    try {
      locationSchema.parse(locationFields);
      onNext();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <FormStepLayout 
      title="Property Location"
      progressSteps={progressSteps}
      onNext={handleNext}
      onBack={onBack}
    >     
      <div className="space-y-6">
        {/* Placeholder Map */}
        <div className="w-full h-48 bg-sky-50 rounded-lg border border-sky-200 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-sky-400 mx-auto mb-2" />
            <p className="text-sky-600 text-sm">Map will be displayed here</p>
            <p className="text-sky-500 text-xs">Google Maps integration coming soon</p>
          </div>
        </div>

        <FormInput
          label="Street Address"
          placeholder="Enter your street address"
          type="text"
          value={formData?.streetAddress || ""}
          onChange={handleInputChange("streetAddress")}
          error={errors.streetAddress}
          required
        />
        
        <FormInput
          label="Unit/Apt/Suite"
          placeholder="Optional"
          type="text"
          value={formData?.unitAptSuite || ""}
          onChange={handleInputChange("unitAptSuite")}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            label="City"
            placeholder="Enter city"
            type="text"
            value={formData?.city || ""}
            onChange={handleInputChange("city")}
            error={errors.city}
            required
          />
          
          <FormInput
            label="State"
            placeholder="Enter state"
            type="text"
            value={formData?.state || ""}
            onChange={handleInputChange("state")}
            error={errors.state}
            required
          />
          
          <FormInput
            label="ZIP Code"
            placeholder="Enter ZIP"
            type="text"
            maxLength={5}
            value={formData?.zipCode || ""}
            onChange={handleInputChange("zipCode")}
            error={errors.zipCode}
            required
          />
        </div>
      </div>
    </FormStepLayout>
  );
};

export default LocationVerification;

