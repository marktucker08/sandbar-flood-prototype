"use client";
import React from "react";
import { FormImageRadio, FormFileUpload } from "@/components/common/ui/form";
import FormStepLayout from "./FormStepLayout";
import { QuoteFormData } from "@/types/quote";
import { FormStep } from "@/lib/constants/formSteps";
import { z } from "zod";

interface ConstructionInfoProps {
  onNext: () => void;
  onBack: () => void;
  formData: QuoteFormData;
  updateFormData: (data: Partial<QuoteFormData>) => void;
  progressSteps: FormStep[];
}

const constructionSchema = z.object({
  constructionType: z.enum(["frame", "masonry", "superior"], {
    required_error: "Please select a construction type",
  }),
  constructionDocs: z.any().optional(), // File type will be handled separately
});

type ConstructionFields = keyof z.infer<typeof constructionSchema>;

const ConstructionInfo: React.FC<ConstructionInfoProps> = ({
  onNext,
  onBack,
  formData,
  updateFormData,
  progressSteps,
}) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const constructionTypes = [
    {
      value: "frame",
      label: "Frame",
      description: "Wood frame, steel frame, or other skeletal structure",
      image: "/wood-frame2.jpg"
    },
    {
      value: "masonry",
      label: "Masonry",
      description: "Brick, concrete block, or stone construction",
      image: "/brick-wall2.jpg"
    },
    {
      value: "superior",
      label: "Superior",
      description: "Reinforced concrete or superior construction methods",
      image: "/concrete-wall2.jpg"
    }
  ];

  const handleConstructionChange = (value: string) => {
    updateFormData?.({ constructionType: value as ConstructionFields });
    
    try {
      constructionSchema.shape.constructionType.parse(value);
      setErrors(prev => ({ ...prev, constructionType: "" }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, constructionType: error.errors[0].message }));
      }
    }
  };

  const handleFileChange = (file: File | null) => {
    updateFormData?.({ constructionDocs: file });
  };

  const handleNext = () => {
    try {
      constructionSchema.parse({
        constructionType: formData?.constructionType,
        constructionDocs: formData?.constructionDocs,
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
      title="Construction Type"
      progressSteps={progressSteps}
      onNext={handleNext}
      onBack={onBack}
    >
      <div className="space-y-8">
        <FormImageRadio
          label="Select Construction Type"
          name="constructionType"
          options={constructionTypes}
          value={formData?.constructionType}
          onChange={handleConstructionChange}
          error={errors.constructionType}
          required
          columns={3}
        />

        <FormFileUpload
          label="Construction Type Documentation"
          name="construction_docs"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          description="Please upload any relevant documentation about your building's construction type (optional)"
          maxSize={10}
        />
      </div>
    </FormStepLayout>
  );
};

export default ConstructionInfo;

