"use client";
import React from "react";
import FormStepLayout from "./FormStepLayout";
import FormInput from "../FormInput";

interface ElevationCertificateProps {
  onNext: () => void;
  onBack: () => void;
}

const ElevationCertificate: React.FC<ElevationCertificateProps> = ({
  onNext,
  onBack,
}) => {
  const [hasCertificate, setHasCertificate] = React.useState<boolean | null>(null);
  const [certificateNumber, setCertificateNumber] = React.useState("");

  const progressSteps = [
    { label: "Location", sublabel: "Verification", isActive: true },
    { label: "Insured", sublabel: "Information", isActive: true },
    { label: "Property", sublabel: "Details", isActive: true },
    { label: "Foundation", sublabel: "Type", isActive: true },
    { label: "Elevation", sublabel: "Certificate", isActive: true },
    { label: "Construction", sublabel: "Type", isActive: false },
    { label: "Coverage", sublabel: "Options", isActive: false },
  ];

  return (
    <FormStepLayout
      title="Elevation Certificate"
      progressSteps={progressSteps}
      onNext={onNext}
      onBack={onBack}
    >
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Do you have an Elevation Certificate?
          </label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="hasCertificate"
                checked={hasCertificate === true}
                onChange={() => setHasCertificate(true)}
                className="w-4 h-4 text-amber-200 focus:ring-amber-200 border-gray-300"
              />
              <span className="text-sm text-gray-900">Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="hasCertificate"
                checked={hasCertificate === false}
                onChange={() => setHasCertificate(false)}
                className="w-4 h-4 text-amber-200 focus:ring-amber-200 border-gray-300"
              />
              <span className="text-sm text-gray-900">No</span>
            </label>
          </div>
        </div>

        {hasCertificate && (
          <div className="space-y-6">
            <FormInput
              label="Certificate Number"
              placeholder="Enter certificate number"
              value={certificateNumber}
              onChange={(e) => setCertificateNumber(e.target.value)}
            />
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                Upload Elevation Certificate
              </h3>
              <p className="text-sm text-blue-700 mb-4">
                Please upload a copy of your elevation certificate. Accepted formats: PDF, JPG, PNG (max 10MB)
              </p>
              <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-amber-200 focus:outline-none">
                <span className="flex items-center space-x-2">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
                </span>
                <input type="file" name="file_upload" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
              </label>
            </div>
          </div>
        )}

        {hasCertificate === false && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <p className="text-sm text-amber-800">
              An Elevation Certificate may help reduce your premium. You can continue without one, but we recommend obtaining an Elevation Certificate from a licensed surveyor.
            </p>
          </div>
        )}

        {hasCertificate === false && (
          <>
            <FormInput
              label="Elevation"
              type="number"
              placeholder="Enter elevation"
        />

        <FormInput
          label="Number of Steps to Front Door"
          type="number"
          placeholder="Enter 0 if unknown"
        />
        </>
        )}
        
        
        
      </div>
    </FormStepLayout>
  );
};

export default ElevationCertificate;

