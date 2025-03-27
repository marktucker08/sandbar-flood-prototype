"use client";
import React from "react";
import { FormImageRadio } from "@/components/ui/form";
import FormStepLayout from "./FormStepLayout";
import { QuoteFormData } from "@/types/quote";
import { QUOTE_FORM_STEPS } from "@/constants/formSteps";
import { z } from "zod";

interface FoundationInfoProps {
  onNext: () => void;
  onBack: () => void;
  formData?: QuoteFormData;
  updateFormData?: (data: Partial<QuoteFormData>) => void;
}

const foundationSchema = z.object({
  foundationType: z.enum([
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
});

type FoundationFields = keyof z.infer<typeof foundationSchema>;

const FoundationInfo: React.FC<FoundationInfoProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
}) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const foundationTypes = [
    { value: "slab", label: "Slab at Grade", image: "https://placehold.co/600x400" },
    { value: "raised", label: "Raised Slab on Fill", image: "https://placehold.co/600x400" },
    { value: "unfinished", label: "Unfinished Basement", image: "https://placehold.co/600x400" },
    { value: "finished", label: "Finished Basement", image: "https://placehold.co/600x400" },
    { value: "pilings-enclosure", label: "Elevated on Pilings with Enclosure", image: "https://placehold.co/600x400" },
    { value: "pilings-no-enclosure", label: "Elevated on Pilings with No Enclosure", image: "https://placehold.co/600x400" },
    { value: "full-wall", label: "Elevated on Full Foundation Wall", image: "https://placehold.co/600x400" },
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

  const handleNext = () => {
    try {
      foundationSchema.parse({ foundationType: formData?.foundationType });
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
    isActive: index === 3,
  }));

  return (
    <FormStepLayout
      title="Foundation Type"
      progressSteps={progressSteps}
      onNext={handleNext}
      onBack={onBack}
    >
      <FormImageRadio
        label="Select Foundation Type"
        name="foundationType"
        options={foundationTypes}
        value={formData?.foundationType}
        onChange={handleFoundationChange}
        error={errors.foundationType}
        required
        columns={3}
      />
    </FormStepLayout>
  );
};

export default FoundationInfo;

