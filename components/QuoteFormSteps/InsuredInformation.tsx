"use client";
import React from "react";
import FormStepLayout from "./FormStepLayout";
import FormInput from "../FormInput";

interface InsuredInformationProps {
  onNext: () => void;
  onBack: () => void;
}

const InsuredInformation: React.FC<InsuredInformationProps> = ({
  onNext,
  onBack,
}) => {
  const [insuredType, setInsuredType] = React.useState("individual");
  const [entityType, setEntityType] = React.useState("");

  const progressSteps = [
    { label: "Location", sublabel: "Verification", isActive: true },
    { label: "Insured", sublabel: "Information", isActive: true },
    { label: "Property", sublabel: "Details", isActive: false },
    { label: "Foundation", sublabel: "Type", isActive: false },
    { label: "Elevation", sublabel: "Certificate", isActive: false },
    { label: "Construction", sublabel: "Type", isActive: false },
    { label: "Coverage", sublabel: "Options", isActive: false },
  ];

  const entityTypes = [
    { label: "Individual", value: "individual" },
    { label: "Corporation", value: "corporation" },
    { label: "Partnership", value: "partnership" },
    { label: "Limited Liability Company", value: "llc" },
    { label: "Limited Partnership", value: "limited_partnership" },
    { label: "Unlimited Liability Company", value: "unlimited_llc" },
    { label: "Unlimited Partnership", value: "unlimited_partnership" },
    { label: "Other", value: "other" },
  ]

  return (
    <FormStepLayout
      title="Insured Information"
      progressSteps={progressSteps}
      onNext={onNext}
      onBack={onBack}
    >
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Insured Type
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="insuredType"
              value="individual"
              checked={insuredType === "individual"}
              onChange={(e) => setInsuredType(e.target.value)}
              className="w-4 h-4 text-amber-200 focus:ring-amber-200 border-gray-300"
            />
            <span className="text-sm text-gray-900">Individual</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="insuredType"
              value="business"
              checked={insuredType === "business"}
              onChange={(e) => setInsuredType(e.target.value)}
              className="w-4 h-4 text-amber-200 focus:ring-amber-200 border-gray-300"
            />
            <span className="text-sm text-gray-900">Business</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insuredType === "individual" ? (
          <>
            <FormInput
              label="First Name"
              placeholder="Enter first name"
              type="text"
            />
            <FormInput
              label="Last Name"
              placeholder="Enter last name"
              type="text"
            />
            </>
      ) : ( <>
        <FormInput
          label="Business Name"
          placeholder="Company Name"
          type="text"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Entity Type
          </label>
          <select
            name="entityType"
            value={entityType}
            onChange={(e) => setEntityType(e.target.value)}
            className="w-full px-4 py-2.5 text-gray-900 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-transparent transition-all duration-300"
          >
            <option value="">Select entity type</option>
            {entityTypes.map((entity) => (
              <option key={entity.value} value={entity.value}>
                {entity.label}
              </option>
            ))}
          </select>
        </div>
        </>
      )}
      </div>  

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Additional Insured Full Name"
          placeholder="Optional"
          type="text"
        />
       
      </div>

      <FormInput
        label="Mailing Address"
        placeholder="Enter street address"
        type="text"
      />
      <FormInput
        label="Address Line 2"
        placeholder="Optional"
        type="text"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="col-span-2">
          <FormInput
            label="City"
            placeholder="Enter city"
            type="text"
          />
        </div>
        <FormInput
          label="State"
          placeholder="Enter state"
          type="text"
        />
        <FormInput
          label="ZIP Code"
          placeholder="Enter ZIP"
          type="text"
        />
      </div>
    </FormStepLayout>
  );
};

export default InsuredInformation;

