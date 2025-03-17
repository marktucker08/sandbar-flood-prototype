import React from "react";
import { DetailedPolicy } from "@/types/admin";

interface CoverageDetailsProps {
  data: DetailedPolicy;
}

const CoverageDetails: React.FC<CoverageDetailsProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Coverage Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Coverage Amount</label>
          <p className="text-gray-700">{data.coverageAmount}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Deductible</label>
          <p className="text-gray-700">{data.deductible}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Contents Coverage</label>
          <p className="text-gray-700">{data.contentsCoverage}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Building Coverage</label>
          <p className="text-gray-700">{data.buildingCoverage}</p>
        </div>
      </div>
    </div>
  );
};

export default CoverageDetails; 