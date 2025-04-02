"use client";
import React from "react";
import { FormInput, FormRadio, FormFileUpload } from "@/components/common/ui/form";
import FormStepLayout from "./FormStepLayout";
import { QuoteFormData } from "@/types/quote";
import { QUOTE_FORM_STEPS } from "@/lib/constants/formSteps";
import { z } from "zod";

interface ElevationCertificateProps {
  onNext: () => void;
  onBack: () => void;
  formData?: QuoteFormData;
  updateFormData?: (data: Partial<QuoteFormData>) => void;
}

const elevationSchema = z.object({
  hasCertificate: z.boolean({
    required_error: "Please indicate if you have an elevation certificate",
  }),
  certificateNumber: z.string().optional(),
  elevation: z.string().optional(),
  stepsToFrontDoor: z.string().optional(),
});

type ElevationFields = keyof z.infer<typeof elevationSchema>;

const ElevationCertificate: React.FC<ElevationCertificateProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
}) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleHasCertificateChange = (value: boolean) => {
    updateFormData?.({ hasCertificate: value });
    
    try {
      elevationSchema.shape.hasCertificate.parse(value);
      setErrors(prev => ({ ...prev, hasCertificate: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, hasCertificate: error.errors[0].message }));
      }
    }
  };

  const handleInputChange = (field: keyof QuoteFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    updateFormData?.({ [field]: newValue });

    if (field in elevationSchema.shape) {
      try {
        elevationSchema.shape[field as ElevationFields].parse(newValue);
        setErrors(prev => ({ ...prev, [field]: "" }));
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
        }
      }
    }
  };

  const handleFileChange = (file: File | null) => {
    updateFormData?.({ elevationCertificate: file || undefined });
  };

  const handleNext = () => {
    try {
      elevationSchema.parse({
        hasCertificate: formData?.hasCertificate,
        certificateNumber: formData?.certificateNumber,
        elevation: formData?.elevation,
        stepsToFrontDoor: formData?.stepsToFrontDoor,
      });
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

  const progressSteps = QUOTE_FORM_STEPS.map((step, index) => ({
    ...step,
    isActive: index === 4,
  }));

  return (
    <FormStepLayout
      title="Elevation Certificate"
      progressSteps={progressSteps}
      onNext={handleNext}
      onBack={onBack}
    >
      <div className="space-y-8">
        <FormRadio
          label="Do you have an Elevation Certificate?"
          name="hasCertificate"
          value={formData?.hasCertificate}
          onChange={handleHasCertificateChange}
          error={errors.hasCertificate}
          required
        />

        {formData?.hasCertificate && (
          <div className="space-y-6">
            <FormInput
              label="Certificate Number"
              placeholder="Enter certificate number"
              value={formData?.certificateNumber || ""}
              onChange={handleInputChange("certificateNumber")}
              error={errors.certificateNumber}
            />
            
            <FormFileUpload
              label="Upload Elevation Certificate"
              name="elevation_certificate"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              description="Please upload a copy of your elevation certificate. Accepted formats: PDF, JPG, PNG (max 10MB)"
              maxSize={10}
            />
          </div>
        )}

        {formData?.hasCertificate === false && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <p className="text-sm text-amber-800">
              An Elevation Certificate may help reduce your premium. You can continue without one, but we recommend obtaining an Elevation Certificate from a licensed surveyor.
            </p>
          </div>
        )}

        {formData?.hasCertificate === false && (
          <div className="space-y-6">
            <FormInput
              label="Elevation"
              type="number"
              placeholder="Enter elevation"
              value={formData?.elevation || ""}
              onChange={handleInputChange("elevation")}
              error={errors.elevation}
            />

            <FormInput
              label="Number of Steps to Front Door"
              type="number"
              placeholder="Enter 0 if unknown"
              value={formData?.stepsToFrontDoor || ""}
              onChange={handleInputChange("stepsToFrontDoor")}
              error={errors.stepsToFrontDoor}
            />
          </div>
        )}
      </div>
    </FormStepLayout>
  );
};

export default ElevationCertificate;

