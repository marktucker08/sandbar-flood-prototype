"use client";
import React from "react";
import FormStepLayout from "./FormStepLayout";
import FormInput from "../FormInput";

interface PropertyDetailsProps {
  onNext: () => void;
  onBack: () => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  onNext,
  onBack,
}) => {
  const [waitingPeriod, setWaitingPeriod] = React.useState("standard");
  const [occupancy, setOccupancy] = React.useState("primary");

  const progressSteps = [
    { label: "Location", sublabel: "Verification", isActive: true },
    { label: "Insured", sublabel: "Information", isActive: true },
    { label: "Property", sublabel: "Details", isActive: true },
    { label: "Foundation", sublabel: "Type", isActive: false },
    { label: "Elevation", sublabel: "Certificate", isActive: false },
    { label: "Construction", sublabel: "Type", isActive: false },
    { label: "Coverage", sublabel: "Options", isActive: false },
  ];

  const occupancyTypes = [
    { value: "primary", label: "Primary Residence" },
    { value: "secondary", label: "Secondary Residence" },
    { value: "seasonal", label: "Seasonal" },
    { value: "rental", label: "Building Rented To Others" },
  ];

  return (
    <FormStepLayout
      title="Property Details"
      progressSteps={progressSteps}
      onNext={onNext}
      onBack={onBack}
    >
      <FormInput
        label="Effective Date"
        type="date"
        placeholder="Select date"
      />

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Waiting Period
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="waitingPeriod"
              value="standard"
              checked={waitingPeriod === "standard"}
              onChange={(e) => setWaitingPeriod(e.target.value)}
              className="w-4 h-4 text-amber-200 focus:ring-amber-200 border-gray-300"
            />
            <span className="text-sm text-gray-900">Standard Wait</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="waitingPeriod"
              value="loan"
              checked={waitingPeriod === "loan"}
              onChange={(e) => setWaitingPeriod(e.target.value)}
              className="w-4 h-4 text-amber-200 focus:ring-amber-200 border-gray-300"
            />
            <span className="text-sm text-gray-900">Loan Closing</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Year Built"
          type="number"
          placeholder="Enter year"
        />
        <FormInput
          label="Square Footage"
          type="number"
          placeholder="Enter square feet"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Number of Stories"
          type="number"
          placeholder="Enter number of stories"
        />
        <FormInput
          label="Number of Families"
          type="number"
          placeholder="Enter number of families"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Occupancy Type
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {occupancyTypes.map(({ value, label }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="occupancy"
                value={value}
                checked={occupancy === value}
                onChange={(e) => setOccupancy(e.target.value)}
                className="w-4 h-4 text-amber-200 focus:ring-amber-200 border-gray-300"
              />
              <span className="text-sm text-gray-900">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </FormStepLayout>
  );
};

export default PropertyDetails;

