"use client";
import React from "react";
import FormStepLayout from "./FormStepLayout";
import FormInput from "../FormInput";

interface CoverageOptionsProps {
  onNext: () => void;
  onBack: () => void;
}

const CoverageOptions: React.FC<CoverageOptionsProps> = ({
  onNext,
  onBack,
}) => {
  const [deductible, setDeductible] = React.useState("1000");

  const progressSteps = [
    { label: "Location", sublabel: "Verification", isActive: true },
    { label: "Insured", sublabel: "Information", isActive: true },
    { label: "Property", sublabel: "Details", isActive: true },
    { label: "Foundation", sublabel: "Type", isActive: true },
    { label: "Elevation", sublabel: "Certificate", isActive: true },
    { label: "Construction", sublabel: "Type", isActive: true },
    { label: "Coverage", sublabel: "Options", isActive: true },
  ];

  const deductibleOptions = [
    { value: "1000", label: "$1,000" },
    { value: "1500", label: "$1,500" },
    { value: "2000", label: "$2,000" },
    { value: "5000", label: "$5,000" },
    { value: "10000", label: "$10,000" },
    { value: "25000", label: "$25,000" },
    { value: "50000", label: "$50,000" },
  ];

  return (
    <FormStepLayout
      title="Coverage Options"
      progressSteps={progressSteps}
      onNext={onNext}
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
          />
          <FormInput
            label="Contents Replacement Cost"
            type="number"
            placeholder="Enter amount"
            prefix="$"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Building Coverage"
            type="number"
            placeholder="Enter amount"
            prefix="$"
          />
          <FormInput
            label="Contents Coverage"
            type="number"
            placeholder="Enter amount"
            prefix="$"
          />
        </div>

        <FormInput
          label="Loss of Use Coverage"
          type="number"
          placeholder="Enter amount"
          prefix="$"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Deductible
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {deductibleOptions.map(({ value, label }) => (
              <label
                key={value}
                className={`relative flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  deductible === value
                    ? "border-amber-300 bg-amber-50"
                    : "border-gray-200 hover:border-amber-200"
                }`}
              >
                <input
                  type="radio"
                  name="deductible"
                  value={value}
                  checked={deductible === value}
                  onChange={(e) => setDeductible(e.target.value)}
                  className="sr-only"
                />
                <span className="text-sm font-medium text-gray-900">
                  {label}
                </span>
                {deductible === value && (
                  <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-amber-300" />
                )}
              </label>
            ))}
          </div>
        </div>

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

