"use client";
import React from "react";
import { FormInput, FormRadio, FormSelect } from "@/components/common/ui/form";
import FormStepLayout from "./FormStepLayout";
import { QuoteFormData } from "@/types/quote";
import { FormStep } from "@/lib/constants/formSteps";
import { z } from "zod";
import { FLOOD_ZONES } from "@/lib/constants/floodZones";

interface ElevationCertificateProps {
  onNext: () => void;
  onBack: () => void;
  formData: QuoteFormData;
  updateFormData: (data: Partial<QuoteFormData>) => void;
  progressSteps: FormStep[];
}

const elevationSchema = z.object({
  hasCertificate: z.boolean({
    required_error: "Please indicate if you have an elevation certificate",
  }),
  certificateNumber: z.string().optional(),
  elevation: z.string().optional(),
  stepsToFrontDoor: z.string().optional(),
  floodZoneVerified: z.boolean({
    required_error: "Please verify the flood zone determination",
  }),
  correctedFloodZone: z.string().optional(),
});

type ElevationFields = keyof z.infer<typeof elevationSchema>;

const ElevationCertificate: React.FC<ElevationCertificateProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
  progressSteps,
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

  const handleFloodZoneVerifiedChange = (value: boolean) => {
    updateFormData?.({ floodZoneVerified: value });
    try {
      elevationSchema.shape.floodZoneVerified.parse(value);
      setErrors(prev => ({ ...prev, floodZoneVerified: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, floodZoneVerified: error.errors[0].message }));
      }
    }
    // If user selects Yes, clear correctedFloodZone
    if (value) {
      updateFormData?.({ correctedFloodZone: "" });
    }
  };

      // const handleFileChange = (file: File | null) => {
      //   updateFormData?.({ elevationCertificate: file || undefined });
      // };

  const handleNext = () => {
    try {
      elevationSchema.parse({
        hasCertificate: formData?.hasCertificate,
        certificateNumber: formData?.certificateNumber,
        certificateElevation: formData?.certificateElevation,
        stepsToFrontDoor: formData?.stepsToFrontDoor,
        floodZoneVerified: formData?.floodZoneVerified,
        correctedFloodZone: formData?.floodZoneVerified === false ? formData?.correctedFloodZone : undefined,
      });
      if (formData?.floodZoneVerified === false && !formData?.correctedFloodZone) {
        setErrors(prev => ({ ...prev, correctedFloodZone: "Please enter the correct flood zone." }));
        return;
      }
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
      title="Elevation Certificate And Flood Zone"
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
            {/* <FormInput
              label="Certificate Number"
              placeholder="Enter certificate number"
              value={formData?.certificateNumber || ""}
              onChange={handleInputChange("certificateNumber")}
              error={errors.certificateNumber}
            /> */}
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <p className="text-sm text-amber-800">
              In most cases enter the C2B value from your certificate. If foundation is slab or pilings without enclosure, enter the C2A value from your certificate.
            </p>
          </div>

            <FormInput
              label="1st Floor Elevation"
              type="number"
              placeholder="Enter 1st floor elevation from the certificate"
              value={formData?.certificateElevation || ""}
              onChange={handleInputChange("certificateElevation")}
              error={errors.certificateElevation}
            />
            {/* <FormFileUpload
              label="Upload Elevation Certificate"
              name="elevation_certificate"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              description="Please upload a copy of your elevation certificate. Accepted formats: PDF, JPG, PNG (max 10MB)"
              maxSize={10}
            /> */}
          </div>
        )}

        {formData?.hasCertificate === false && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <p className="text-sm text-amber-800">
              An Elevation Certificate may help reduce your premium. You can continue without one, but we recommend obtaining an Elevation Certificate.
            </p>
          </div>
        )}

        {formData?.hasCertificate === false && (
          <div className="space-y-6">
            {/* <FormInput
              label="Elevation"
              type="number"
              placeholder="Enter elevation"
              value={formData?.certificateElevation || ""}
              onChange={handleInputChange("certificateElevation")}
              error={errors.certificateElevation}
            /> */}

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

        {/* Flood Zone Verification */}
        <div className="space-y-6 pt-8 border-t border-gray-200 mt-8">
          <FormRadio
            label={`Is the Flood Zone determination correct? (Current Flood Zone: ${formData?.floodZone || "Unknown"})`}
            name="floodZoneVerified"
            value={formData?.floodZoneVerified}
            onChange={handleFloodZoneVerifiedChange}
            error={errors.floodZoneVerified}
            required
          />
          {formData?.floodZoneVerified === false && (
            <FormSelect
              label="Select the correct Flood Zone"
              options={FLOOD_ZONES.map(zone => ({ value: zone, label: zone }))}
              value={formData?.correctedFloodZone || ""}
              onChange={(value) => updateFormData?.({ correctedFloodZone: value })}
              error={errors.correctedFloodZone}
              required
            />
          )}
        </div>
      </div>
    </FormStepLayout>
  );
};

export default ElevationCertificate;

