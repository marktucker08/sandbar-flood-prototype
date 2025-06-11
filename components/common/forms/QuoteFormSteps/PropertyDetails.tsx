"use client";
import React from "react";
import FormStepLayout from "./FormStepLayout";
import { FormInput, FormRadioGroup, FormSelect } from "@/components/common/ui/form";
import { QuoteFormData } from "@/types/quote";
import { FormStep } from "@/lib/constants/formSteps";
import { z } from "zod";
import { COMMERCIAL_OCCUPANCIES } from "@/lib/constants/occupancies";

interface PropertyDetailsProps {
  onNext: () => void;
  onBack: () => void;
  formData: QuoteFormData;
  updateFormData: (data: Partial<QuoteFormData>) => void;
  progressSteps: FormStep[];
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (index: number) => void;
}

const basePropertySchema = z.object({
  effectiveDate: z.string().min(1, "Effective date is required"),
  waitingPeriod: z.enum(["standard", "loan"]),
  yearBuilt: z.string().min(1, "Year built is required"),
  squareFootage: z.string().min(1, "Square footage is required"),
  numberOfStories: z.string().min(1, "Number of stories is required"),
  numberOfFamilies: z.string().min(1, "Number of families is required").optional(),
  numberOfUnits: z.string().min(1, "Number of units is required").optional(),
  occupancyType: z.enum(["primary", "secondary", "2-4_family", "single_condo"]).optional(),
  condoType: z.enum(["low_rise", "high_rise"]).optional(),
  commercialOccupancy: z.string().optional(),
});

type PropertyFields = keyof z.infer<typeof basePropertySchema>;

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
  progressSteps,
  currentStep,
  completedSteps,
  onStepClick,
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

  const handleSelectChange = (field: keyof QuoteFormData) => (value: string) => {
    updateFormData?.({ [field]: value });
    if (field in basePropertySchema.shape) {
      try {
        basePropertySchema.shape[field as PropertyFields].parse(value);
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
      numberOfUnits: formData?.numberOfUnits,
      occupancyType: formData?.occupancyType,
      condoType: formData?.condoType,
      commercialOccupancy: formData?.commercialOccupancy,
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

  const waitingPeriodOptions = [
    { value: "standard", label: "Standard Wait" },
    { value: "loan", label: "Loan Closing" },
  ];

  const occupancyTypeOptions = [
    { value: "primary", label: "Single-Family Primary" },
    { value: "secondary", label: "Single-Family Secondary" },
    { value: "2-4_family", label: "2-4 Family" },
    { value: "single_condo", label: "Single Condo Unit" }, 
  ];

  const condoTypeOptions = [
    { value: "low_rise", label: "Low-Rise Condo" },
    { value: "high_rise", label: "High-Rise Condo" },
  ];

  const commercialOccupancyOptions = COMMERCIAL_OCCUPANCIES.map((occ) => ({ value: occ, label: occ.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim() }));

  return (
    <FormStepLayout
      title="Property Details"
      progressSteps={progressSteps}
      onNext={handleNext}
      onBack={onBack}
      currentStep={currentStep}
      completedSteps={completedSteps}
      onStepClick={onStepClick}
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
        error={errors.waitingPeriod}
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
        {formData.buildingType === "one_home" ? (
          <FormInput
            label="Number of Families"
            type="number"
            placeholder="Enter number of families"
            value={formData?.numberOfFamilies || ""}
            onChange={handleInputChange("numberOfFamilies")}
            error={errors.numberOfFamilies}
            required
          />
        ) :
          ["residential_condo", "mixed_use", "commercial", "apartment"].includes(formData.buildingType || "") ? (
            <FormInput
              label="Number of Units"
              type="number"
              placeholder="Enter number of units"
              value={formData?.numberOfUnits || ""}
              onChange={handleInputChange("numberOfUnits")}
              error={errors.numberOfUnits}
              required
            />
          ) : null
        }
      </div>
      {formData.buildingType === "one_home" ? (
      <FormRadioGroup
        label="Occupancy Type"
        name="occupancyType"
        options={occupancyTypeOptions}
        value={formData?.occupancyType}
        onChange={(value) => updateFormData?.({ occupancyType: value as "primary" | "secondary" | "2-4_family" | "single_condo" })}
        layout="grid"
        gridCols={2}
        error={errors.occupancyType}
        required
      />
      ) : ["residential_condo"].includes(formData.buildingType || "") ? (
      <FormRadioGroup
        label="Condo Type"
        name="condoType"
        options={condoTypeOptions}
        value={formData?.condoType}
        onChange={(value) => updateFormData?.({ condoType: value as "low_rise" | "high_rise" })}
        layout="grid"
        gridCols={2}
        error={errors.condoType}
        required
      />
      ) : ["mixed_use", "commercial"].includes(formData.buildingType || "") ? (
        <FormSelect
          label="Commercial Occupancy Type"
          options={commercialOccupancyOptions}
          value={formData?.commercialOccupancy || ""}
          onChange={handleSelectChange("commercialOccupancy")}
          error={errors.commercialOccupancy}
          required
        />
      ) : null}
    </FormStepLayout>
  );
};

export default PropertyDetails;

