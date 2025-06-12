"use client";
import React from "react";
import FormStepLayout from "./FormStepLayout";
import { FormInput, FormRadioGroup } from "@/components/common/ui/form";
import { QuoteFormData } from "@/types/quote";
import { FormStep } from "@/lib/constants/formSteps";
import { z } from "zod";

interface CoverageOptionsProps {
  onBack: () => void;
  onNext: () => void;
  formData: QuoteFormData;
  updateFormData: (data: Partial<QuoteFormData>) => void;
  progressSteps: FormStep[];
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (index: number) => void;
}

const deductibleOptions = [
  { value: "1000", label: "$1,000" },
  { value: "1500", label: "$1,500" },
  { value: "2000", label: "$2,000" },
  { value: "5000", label: "$5,000" },
  { value: "10000", label: "$10,000" },
  { value: "25000", label: "$25,000" },
  { value: "50000", label: "$50,000" },
];


const coverageSchema = z.object({
  buildingReplacementCost: z.string().min(1, "Building replacement cost is required"),
  contentsReplacementCost: z.string().min(1, "Contents replacement cost is required"),
  buildingCoverage: z.string().min(1, "Building coverage is required"),
  contentsCoverage: z.string().min(1, "Contents coverage is required"),
  lossOfUseCoverage: z.string().min(1, "Loss of use coverage is required"),
  deductible: z.enum(["1000", "1500", "2000", "5000", "10000", "25000", "50000"], {
    required_error: "Deductible is required",
  }),
});

type CoverageFields = keyof z.infer<typeof coverageSchema>;

const CoverageOptions: React.FC<CoverageOptionsProps> = ({
  onBack,
  onNext,
  formData,
  updateFormData,
  progressSteps,
  currentStep,
  completedSteps,
  onStepClick,
}) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleInputChange = (field: keyof QuoteFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateFormData?.({ [field]: value });

    if (field in coverageSchema.shape) {
      try {
        coverageSchema.shape[field as CoverageFields].parse(value.toString());
        setErrors(prev => ({ ...prev, [field]: "" }));
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors(prev => ({ ...prev, [field]: error.errors[0].message }));
        }
      }
    }
  };

  const handleDeductibleChange = (value: string) => {
    updateFormData?.({ deductible: value });
    try {
      coverageSchema.shape.deductible.parse(value);
      setErrors(prev => ({ ...prev, deductible: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, deductible: error.errors[0].message }));
      }
    }
  };

  const handleNext = () => {
    try {
      coverageSchema.parse({
        buildingReplacementCost: formData?.buildingReplacementCost,
        contentsReplacementCost: formData?.contentsReplacementCost,
        buildingCoverage: formData?.buildingCoverage,
        contentsCoverage: formData?.contentsCoverage,
        lossOfUseCoverage: formData?.lossOfUseCoverage,
        deductible: formData?.deductible,
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

  return (
    <FormStepLayout
      title="Coverage Options"
      progressSteps={progressSteps}
      onNext={handleNext}
      onBack={onBack}
      nextLabel="Review Quote"
      currentStep={currentStep}
      completedSteps={completedSteps}
      onStepClick={onStepClick}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Building Replacement Cost"
            value={formData?.buildingReplacementCost || ""}
            onChange={handleInputChange("buildingReplacementCost")}
            error={errors.buildingReplacementCost}
            required
          />
          <FormInput
            label="Contents Replacement Cost"
            value={formData?.contentsReplacementCost || ""}
            onChange={handleInputChange("contentsReplacementCost")}
            error={errors.contentsReplacementCost}
            required
          />
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Building Coverage"
            value={formData?.buildingCoverage || ""}
            onChange={handleInputChange("buildingCoverage")}
            error={errors.buildingCoverage}
            required
          />
          <FormInput
            label="Contents Coverage"
            value={formData?.contentsCoverage || ""}
            onChange={handleInputChange("contentsCoverage")}
            error={errors.contentsCoverage}
            required
          />
          <FormInput
          label="Loss of Use Coverage"
          value={formData?.lossOfUseCoverage || ""}
          onChange={handleInputChange("lossOfUseCoverage")}
          error={errors.lossOfUseCoverage}
          required
        />
        </div>

        <FormRadioGroup
          label="Deductible"
          name="deductible"
          options={deductibleOptions}
          value={formData?.deductible}
          onChange={handleDeductibleChange}
          layout="grid"
          gridCols={2}
          error={errors.deductible}
          required
        />
      </div>
    </FormStepLayout>
  );
};

export default CoverageOptions;

