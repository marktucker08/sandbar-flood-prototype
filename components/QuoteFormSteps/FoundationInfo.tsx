"use client";
import React from "react";
import Image from "next/image";
import FormStepLayout from "./FormStepLayout";

interface FoundationInfoProps {
  onNext: () => void;
  onBack: () => void;
}

const FoundationInfo: React.FC<FoundationInfoProps> = ({
  onNext,
  onBack,
}) => {
  const [foundation, setFoundation] = React.useState("slab");

  const progressSteps = [
    { label: "Location", sublabel: "Verification", isActive: true },
    { label: "Insured", sublabel: "Information", isActive: true },
    { label: "Property", sublabel: "Details", isActive: true },
    { label: "Foundation", sublabel: "Type", isActive: true },
    { label: "Elevation", sublabel: "Certificate", isActive: false },
    { label: "Construction", sublabel: "Type", isActive: false },
    { label: "Coverage", sublabel: "Options", isActive: false },
  ];

  const foundationTypes = [
    { value: "slab", label: "Slab at Grade", image: "/images/foundation-slab.png" },
    { value: "raised", label: "Raised Slab on Fill", image: "/images/foundation-raised.png" },
    { value: "unfinished", label: "Unfinished Basement", image: "/images/foundation-unfinished.png" },
    { value: "finished", label: "Finished Basement", image: "/images/foundation-finished.png" },
    { value: "pilings-enclosure", label: "Elevated on Pilings with Enclosure", image: "/images/foundation-pilings-enclosure.png" },
    { value: "pilings-no-enclosure", label: "Elevated on Pilings with No Enclosure", image: "/images/foundation-pilings-no-enclosure.png" },
    { value: "full-wall", label: "Elevated on Full Foundation Wall", image: "/images/foundation-full-wall.png" },
  ];

  return (
    <FormStepLayout
      title="Foundation Type"
      progressSteps={progressSteps}
      onNext={onNext}
      onBack={onBack}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foundationTypes.map(({ value, label, image }) => (
          <label
            key={value}
            className={`relative flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
              foundation === value
                ? "border-amber-300 bg-amber-50"
                : "border-gray-200 hover:border-amber-200"
            }`}
          >
            <input
              type="radio"
              name="foundation"
              value={value}
              checked={foundation === value}
              onChange={(e) => setFoundation(e.target.value)}
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
            <span className="text-sm font-medium text-center text-gray-900">
              {label}
            </span>
            {foundation === value && (
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-amber-300" />
            )}
          </label>
        ))}
      </div>
    </FormStepLayout>
  );
};

export default FoundationInfo;

