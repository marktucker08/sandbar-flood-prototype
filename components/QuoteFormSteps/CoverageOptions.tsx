"use client";
import React from "react";
import FormStepLayout from "./FormStepLayout";
import { FormInput, FormRadioGroup } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { QuoteFormData } from "@/types/quote";
import { QUOTE_FORM_STEPS } from "@/lib/formSteps";
import { z } from "zod";

interface CoverageOptionsProps {
  onBack: () => void;
  formData?: QuoteFormData;
  updateFormData?: (data: Partial<QuoteFormData>) => void;
}

const coverageSchema = z.object({
  buildingReplacementCost: z.string().min(1, "Building replacement cost is required"),
  contentsReplacementCost: z.string().min(1, "Contents replacement cost is required"),
  buildingCoverage: z.string().min(1, "Building coverage is required"),
  contentsCoverage: z.string().min(1, "Contents coverage is required"),
  lossOfUseCoverage: z.string().min(1, "Loss of use coverage is required"),
  deductible: z.string().min(1, "Deductible is required"),
});

type CoverageFields = keyof z.infer<typeof coverageSchema>;

const CoverageOptions: React.FC<CoverageOptionsProps> = ({
  onBack,
  formData,
  updateFormData,
}) => {
  const router = useRouter();
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const deductibleOptions = [
    { value: "1000", label: "$1,000" },
    { value: "1500", label: "$1,500" },
    { value: "2000", label: "$2,000" },
    { value: "5000", label: "$5,000" },
    { value: "10000", label: "$10,000" },
    { value: "25000", label: "$25,000" },
    { value: "50000", label: "$50,000" },
  ];

  const handleInputChange = (field: keyof QuoteFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = e.target.value;
    updateFormData?.({ [field]: newValue });

    if (field in coverageSchema.shape) {
      try {
        coverageSchema.shape[field as CoverageFields].parse(newValue);
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

  const handleSubmit = async () => {
    try {
      coverageSchema.parse({
        buildingReplacementCost: formData?.buildingReplacementCost,
        contentsReplacementCost: formData?.contentsReplacementCost,
        buildingCoverage: formData?.buildingCoverage,
        contentsCoverage: formData?.contentsCoverage,
        lossOfUseCoverage: formData?.lossOfUseCoverage,
        deductible: formData?.deductible,
      });
      router.push("/quote/processing");
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
    isActive: index === 6,
  }));

  return (
    <FormStepLayout
      title="Coverage Options"
      progressSteps={progressSteps}
      onNext={handleSubmit}
      onBack={onBack}
      nextLabel="Submit"
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Building Replacement Cost"
            type="number"
            placeholder="Enter amount"
            prefix="$"
            value={formData?.buildingReplacementCost || ""}
            onChange={handleInputChange("buildingReplacementCost")}
            error={errors.buildingReplacementCost}
            required
          />
          <FormInput
            label="Contents Replacement Cost"
            type="number"
            placeholder="Enter amount"
            prefix="$"
            value={formData?.contentsReplacementCost || ""}
            onChange={handleInputChange("contentsReplacementCost")}
            error={errors.contentsReplacementCost}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Building Coverage"
            type="number"
            placeholder="Enter amount"
            prefix="$"
            value={formData?.buildingCoverage || ""}
            onChange={handleInputChange("buildingCoverage")}
            error={errors.buildingCoverage}
            required
          />
          <FormInput
            label="Contents Coverage"
            type="number"
            placeholder="Enter amount"
            prefix="$"
            value={formData?.contentsCoverage || ""}
            onChange={handleInputChange("contentsCoverage")}
            error={errors.contentsCoverage}
            required
          />
        </div>

        <FormInput
          label="Loss of Use Coverage"
          type="number"
          placeholder="Enter amount"
          prefix="$"
          value={formData?.lossOfUseCoverage || ""}
          onChange={handleInputChange("lossOfUseCoverage")}
          error={errors.lossOfUseCoverage}
          required
        />

        <FormRadioGroup
          label="Deductible"
          name="deductible"
          options={deductibleOptions}
          value={formData?.deductible}
          onChange={handleDeductibleChange}
          error={errors.deductible}
          required
          gridCols={2}
          className="max-w-50% grid-flow-row gap-y-2"
        />

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            Coverage Summary
          </h3>
          <div className="space-y-2 text-sm text-blue-700">
            <p>• Building and contents coverage protect against flood damage</p>
            <p>• Loss of use coverage helps with temporary living expenses</p>
            <p>• Higher deductibles generally result in lower premiums</p>
            <p>• Coverage cannot exceed replacement cost</p>
          </div>
        </div>
      </div>
    </FormStepLayout>
  );
};

export default CoverageOptions;

