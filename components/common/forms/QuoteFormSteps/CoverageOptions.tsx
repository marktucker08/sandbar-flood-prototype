"use client";
import React from "react";
import FormStepLayout from "./FormStepLayout";
import { FormInput, FormRadioGroup } from "@/components/common/ui/form";
import { useRouter } from "next/navigation";
import { QuoteFormData } from "@/types/quote";
import { FormStep } from "@/lib/constants/formSteps";
import { z } from "zod";
import { useQuote } from "@/context/QuoteContext";

interface CoverageOptionsProps {
  onBack: () => void;
  formData: QuoteFormData;
  updateFormData: (data: Partial<QuoteFormData>) => void;
  progressSteps: FormStep[];
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
  progressSteps,
}) => {
  const router = useRouter();
  const { setQuoteData } = useQuote();
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

  const calculateRiskFactor = () => {
    let riskFactor = 1.0;

    // Building age factor
    const buildingAge = Number(formData?.yearBuilt || 0);
    if (buildingAge > 50) riskFactor *= 1.5;
    else if (buildingAge > 25) riskFactor *= 1.25;
    else if (buildingAge > 10) riskFactor *= 1.1;

    // Basement type factor
    const foundationType = formData?.foundationType;
    if (foundationType === 'unfinished') riskFactor *= 1.3;
    else if (foundationType === 'finished') riskFactor *= 1.2;
    else riskFactor *= 1.0;

    // Flood zone factor
    const floodZone: string = 'C';
    if (floodZone === 'A') riskFactor *= 2.0;
    else if (floodZone === 'B') riskFactor *= 1.5;
    else if (floodZone === 'C') riskFactor *= 1.2;
    else if (floodZone === 'X') riskFactor *= 1.0;

    return riskFactor;
  };

  const calculatePremium = (riskFactor: number) => {
    const basePremium = Number(formData?.buildingCoverage || 0) * 0.001;
    const contentsPremium = Number(formData?.contentsCoverage || 0) * 0.0005;
    
    let premium = (basePremium + contentsPremium) * riskFactor;

    // Apply deductible discount
    const deductible = Number(formData?.deductible || 0);
    if (deductible >= 50000) premium *= 0.7;
    else if (deductible >= 25000) premium *= 0.8;
    else if (deductible >= 10000) premium *= 0.85;
    else if (deductible >= 5000) premium *= 0.9;
    else if (deductible >= 2000) premium *= 0.95;

    return Math.round(premium * 100) / 100;
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

      const riskFactor = calculateRiskFactor();
      const premium = calculatePremium(riskFactor);

      const quoteData = {
        quoteId: `Q-${Date.now()}`,
        propertyAddress: `${formData?.streetAddress}, ${formData?.city}, ${formData?.state} ${formData?.zipCode}`,
        coverageAmount: Number(formData?.buildingCoverage) + Number(formData?.contentsCoverage),
        premium,
        deductible: Number(formData?.deductible),
        effectiveDate: formData?.effectiveDate || new Date().toISOString().split('T')[0],
        expirationDate: new Date(new Date(formData?.effectiveDate || new Date()).setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        status: 'Pending Review',
        riskFactor,
        buildingCoverage: Number(formData?.buildingCoverage),
        contentsCoverage: Number(formData?.contentsCoverage),
        lossOfUseCoverage: Number(formData?.lossOfUseCoverage),
        buildingReplacementCost: Number(formData?.buildingReplacementCost),
        contentsReplacementCost: Number(formData?.contentsReplacementCost),
        yearBuilt: formData?.yearBuilt || '',
        squareFootage: formData?.squareFootage || '',
        numberOfStories: formData?.numberOfStories || '',
        numberOfFamilies: formData?.numberOfFamilies || '',
        occupancyType: formData?.occupancyType || '',
        foundationType: formData?.foundationType || '',
        constructionType: formData?.constructionType || '',
        floodZone: 'C', // This should come from form data or API
      };

      updateFormData?.({
        riskFactor: riskFactor.toString(),
        premium: premium.toString(),
      });

      setQuoteData(quoteData);
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

