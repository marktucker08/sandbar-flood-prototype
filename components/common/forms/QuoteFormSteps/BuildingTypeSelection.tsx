import * as React from "react";
import { FormIconRadioGroup } from "@/components/common/ui/form";
import { QuoteFormData, BuildingType } from "@/types/quote";
import { Building, Store, Hotel, Building2 as BuildingOffice, House } from "lucide-react";
import FormStepLayout from "./FormStepLayout";
import { FormStep } from "@/lib/constants/formSteps";
import { z } from "zod";

interface BuildingTypeSelectionProps {
  onNext: () => void;
  formData: QuoteFormData;
  updateFormData: (data: Partial<QuoteFormData>) => void;
  progressSteps: FormStep[];
}

const residentialTypes = [
  {
    value: "one_home",
    label: "One Home",
    description: "Single-family home, single unit in a building of any size, or an entire detached 2-4 family building.",
    icon: House,
    isPopular: true
  },
  {
    value: "residential_condo",
    label: "Entire Residential Condo Building",
    description: "RCBAP - Requires condo form of ownership",
    icon: Building
  },
  {
    value: "mixed_use",
    label: "Mixed Use Building",
    description: "Some residential and some commercial use in the same building. Entire Building.",
    icon: BuildingOffice
  },
  {
    value: "apartment",
    label: "Apartment or Coop",
    description: "An entire apartment building or coop (not condo form of ownership)",
    icon: Hotel
  }
];

const commercialTypes = [
  {
    value: "commercial",
    label: "Main Street Mercantile Commercial Buildings",
    description: "An entire office, retail, restaurant, industrial, other non-residential building",
    icon: Store
  },
  {
    value: "hotel",
    label: "Hotels, Motels, and Inns",
    description: "Entire building",
    icon: Hotel
  }
];

const buildingTypeSchema = z.object({
  buildingType: z.enum(["one_home", "residential_condo", "mixed_use", "apartment", "commercial", "hotel"], {
    required_error: "Please select a building type"
  }),
});

export default function BuildingTypeSelection({ onNext, formData, updateFormData, progressSteps }: BuildingTypeSelectionProps) {
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSelect = (value: string) => {
    updateFormData({ buildingType: value as BuildingType });
    
    try {
      buildingTypeSchema.parse({ buildingType: value });
      setErrors({});
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
      title="Select Building Type"
      progressSteps={progressSteps}
      onNext={() => {
        if (formData.buildingType) {
          onNext();
        } else {
          setErrors({ buildingType: "Please select a building type" });
        }
      }}
      onBack={() => {}}
    >
      <div className="space-y-8">
        <p className="text-gray-500 mb-6">Choose the type of building you want to insure</p>
        
        <FormIconRadioGroup
          label="Someone lives here"
          name="buildingType"
          options={residentialTypes}
          value={formData?.buildingType}
          onChange={handleSelect}
          error={errors.buildingType}
          required
          gridCols={2}
        />

        <FormIconRadioGroup
          label="Nobody lives here"
          name="buildingType"
          options={commercialTypes}
          value={formData?.buildingType}
          onChange={handleSelect}
          error={errors.buildingType}
          required
          gridCols={2}
        />
      </div>
    </FormStepLayout>
  );
} 