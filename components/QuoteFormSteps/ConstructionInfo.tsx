"use client";
import React from "react";
import Image from "next/image";
import FormStepLayout from "./FormStepLayout";

interface ConstructionInfoProps {
  onNext: () => void;
  onBack: () => void;
}

const ConstructionInfo: React.FC<ConstructionInfoProps> = ({
  onNext,
  onBack,
}) => {
  const [constructionType, setConstructionType] = React.useState("");

  const progressSteps = [
    { label: "Location", sublabel: "Verification", isActive: true },
    { label: "Insured", sublabel: "Information", isActive: true },
    { label: "Property", sublabel: "Details", isActive: true },
    { label: "Foundation", sublabel: "Type", isActive: true },
    { label: "Elevation", sublabel: "Certificate", isActive: true },
    { label: "Construction", sublabel: "Type", isActive: true },
    { label: "Coverage", sublabel: "Options", isActive: false },
  ];

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

  return (
    <FormStepLayout
      title="Construction Type"
      progressSteps={progressSteps}
      onNext={onNext}
      onBack={onBack}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {constructionTypes.map(({ value, label, description, image }) => (
          <label
            key={value}
            className={`relative flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
              constructionType === value
                ? "border-amber-300 bg-amber-50"
                : "border-gray-200 hover:border-amber-200"
            }`}
          >
            <input
              type="radio"
              name="constructionType"
              value={value}
              checked={constructionType === value}
              onChange={(e) => setConstructionType(e.target.value)}
              className="sr-only"
            />
            <div className="w-full aspect-square relative mb-4 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={image}
                alt={label}
                fill
                className="object-contain p-2"
              />
            </div>
            <div className="text-center">
              <span className="block text-sm font-medium text-gray-900 mb-2">
                {label}
              </span>
              <span className="block text-xs text-gray-600">
                {description}
              </span>
            </div>
            {constructionType === value && (
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-amber-300" />
            )}
          </label>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 mb-2">
          Construction Type Documentation
        </h3>
        <p className="text-sm text-blue-700 mb-4">
          Please upload any relevant documentation about your building&apos;s construction type (optional)
        </p>
        <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-amber-200 focus:outline-none">
          <span className="flex items-center space-x-2">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
          </span>
          <input type="file" name="construction_docs" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
        </label>
      </div>
    </FormStepLayout>
  );
};

export default ConstructionInfo;

