"use client";
import React from "react";
import FormStepLayout from "./FormStepLayout";
import { FormInput, FormRadioGroup } from "@/components/ui/form";
import { QuoteFormData } from "@/types/quote";
import { QUOTE_FORM_STEPS } from "@/lib/formSteps";
import { z } from "zod";

interface PropertyDetailsProps {
  onNext: () => void;
  onBack: () => void;
  formData?: QuoteFormData;
  updateFormData?: (data: Partial<QuoteFormData>) => void;
}

const basePropertySchema = z.object({
  effectiveDate: z.string().min(1, "Effective date is required"),
  waitingPeriod: z.enum(["standard", "loan"]),
  yearBuilt: z.string().min(1, "Year built is required"),
  squareFootage: z.string().min(1, "Square footage is required"),
  numberOfStories: z.string().min(1, "Number of stories is required"),
  numberOfFamilies: z.string().min(1, "Number of families is required"),
  occupancyType: z.enum(["primary", "secondary", "seasonal", "rental"]),
});

type PropertyFields = keyof z.infer<typeof basePropertySchema>;

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
}) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (field: keyof QuoteFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    updateFormData?.({ [field]: newValue });

    if (field in basePropertySchema.shape) {
      try {
        basePropertySchema.shape[field as PropertyFields].parse(newValue);
        setErrors(prev => ({ ...prev, [field]: "" }));
      } catch (error) {
        if (error instanceof Error) {
          setErrors(prev => ({ ...prev, [field]: error.message }));
        }
      }
    }
  };

  const handleNext = () => {
    const propertyFields = {
      effectiveDate: formData?.effectiveDate,
      waitingPeriod: formData?.waitingPeriod,
      yearBuilt: formData?.yearBuilt,
      squareFootage: formData?.squareFootage,
      numberOfStories: formData?.numberOfStories,
      numberOfFamilies: formData?.numberOfFamilies,
      occupancyType: formData?.occupancyType,
    };

    try {
      basePropertySchema.parse(propertyFields);
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
    isActive: index === 2,
  }));

  const waitingPeriodOptions = [
    { value: "standard", label: "Standard Wait" },
    { value: "loan", label: "Loan Closing" },
  ];

  const occupancyTypeOptions = [
    { value: "primary", label: "Primary Residence" },
    { value: "secondary", label: "Secondary Residence" },
    { value: "seasonal", label: "Seasonal Residence" },
    { value: "rental", label: "Building Rented To Others" },
  ];

  return (
    <FormStepLayout
      title="Property Details"
      progressSteps={progressSteps}
      onNext={handleNext}
      onBack={onBack}
    >
      <FormInput
        label="Effective Date"
        type="date"
        placeholder="Select date"
        value={formData?.effectiveDate || ""}
        onChange={handleInputChange("effectiveDate")}
        error={errors.effectiveDate}
        required
      />

      <FormRadioGroup
        label="Waiting Period"
        name="waitingPeriod"
        options={waitingPeriodOptions}
        value={formData?.waitingPeriod}
        onChange={(value) => updateFormData?.({ waitingPeriod: value as "standard" | "loan" })}
        layout="grid"
        gridCols={2}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Year Built"
          type="number"
          placeholder="Enter year"
          value={formData?.yearBuilt || ""}
          onChange={handleInputChange("yearBuilt")}
          error={errors.yearBuilt}
          required
        />
        <FormInput
          label="Square Footage"
          type="number"
          placeholder="Enter square feet"
          value={formData?.squareFootage || ""}
          onChange={handleInputChange("squareFootage")}
          error={errors.squareFootage}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Number of Stories"
          type="number"
          placeholder="Enter number of stories"
          value={formData?.numberOfStories || ""}
          onChange={handleInputChange("numberOfStories")}
          error={errors.numberOfStories}
          required
        />
        <FormInput
          label="Number of Families"
          type="number"
          placeholder="Enter number of families"
          value={formData?.numberOfFamilies || ""}
          onChange={handleInputChange("numberOfFamilies")}
          error={errors.numberOfFamilies}
          required
        />
      </div>

      <FormRadioGroup
        label="Occupancy Type"
        name="occupancyType"
        options={occupancyTypeOptions}
        value={formData?.occupancyType}
        onChange={(value) => updateFormData?.({ occupancyType: value as "primary" | "secondary" | "seasonal" | "rental" })}
        layout="horizontal"
        required
      />
    </FormStepLayout>
  );
};

export default PropertyDetails;

