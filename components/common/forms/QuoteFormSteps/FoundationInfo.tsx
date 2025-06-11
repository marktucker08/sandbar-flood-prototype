"use client";
import React from "react";
import { FormImageRadio, FormRadio } from "@/components/common/ui/form";
import FormStepLayout from "./FormStepLayout";
import { QuoteFormData } from "@/types/quote";
import { FormStep } from "@/lib/constants/formSteps";
import { z } from "zod";

interface FoundationInfoProps {
  onNext: () => void;
  onBack: () => void;
  formData: QuoteFormData;
  updateFormData: (data: Partial<QuoteFormData>) => void;
  progressSteps: FormStep[];
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (index: number) => void;
}

const foundationSchema = z.object({
  foundationType: z.enum([
    "crawlspace",
    "slab",
    "raised",
    "unfinished",
    "finished",
    "pilings-enclosure",
    "pilings-no-enclosure",
    "full-wall"
  ], {
    required_error: "Please select a foundation type",
  }),
  isFoundationVented: z.boolean({
    required_error: "Please specify if the foundation is properly vented",
  }),
});

type FoundationFields = keyof z.infer<typeof foundationSchema>;

const FoundationInfo: React.FC<FoundationInfoProps> = ({
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

  const foundationTypes = [
    { value: "crawlspace", label: "Crawlspace", image: "https://placehold.co/400x200" },
    { value: "slab", label: "Slab at Grade", image: "https://placehold.co/400x200" },
    { value: "raised", label: "Raised Slab on Fill", image: "https://placehold.co/400x200" },
    { value: "unfinished", label: "Unfinished Basement", image: "https://placehold.co/400x200" },
    { value: "finished", label: "Finished Basement", image: "https://placehold.co/400x200" },
    { value: "pilings-enclosure", label: "Elevated on Pilings with Enclosure", image: "https://placehold.co/400x200" },
    { value: "pilings-no-enclosure", label: "Elevated on Pilings with No Enclosure", image: "https://placehold.co/400x200" },
    { value: "full-wall", label: "Elevated on Full Foundation Wall", image: "https://placehold.co/400x200" },
  ];

  const handleFoundationChange = (value: string) => {
    updateFormData?.({ foundationType: value as FoundationFields });
    
    try {
      foundationSchema.shape.foundationType.parse(value);
      setErrors(prev => ({ ...prev, foundationType: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, foundationType: error.errors[0].message }));
      }
    }
  };

  const handleVentedChange = (value: boolean) => {
    updateFormData?.({ isFoundationVented: value });
    try {
      foundationSchema.shape.isFoundationVented.parse(value);
      setErrors(prev => ({ ...prev, isFoundationVented: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, isFoundationVented: error.errors[0].message }));
      }
    }
  };

  const handleNext = () => {
    try {
      foundationSchema.parse({ foundationType: formData?.foundationType, isFoundationVented: formData?.isFoundationVented });
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
      title="Foundation Type"
      progressSteps={progressSteps}
      onNext={handleNext}
      onBack={onBack}
      currentStep={currentStep}
      completedSteps={completedSteps}
      onStepClick={onStepClick}
    >
      <FormImageRadio
        label="Select Foundation Type"
        name="foundationType"
        options={foundationTypes}
        value={formData?.foundationType}
        onChange={handleFoundationChange}
        error={errors.foundationType}
        required
        columns={4}
      />
      <div className="mt-8">
        <FormRadio
          label="Is the foundation properly vented?"
          name="isFoundationVented"
          value={formData?.isFoundationVented ?? null}
          onChange={handleVentedChange}
          error={errors.isFoundationVented}
          required
        />
      </div>
    </FormStepLayout>
  );
};

export default FoundationInfo;

