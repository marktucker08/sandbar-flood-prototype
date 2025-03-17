import React from "react";
import { DetailedPolicy } from "@/types/admin";
import { StatusBadge } from "../StatusBadge";

interface PolicyStatusProps {
  data: DetailedPolicy;
}

const PolicyStatus: React.FC<PolicyStatusProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Policy Status</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Status</label>
          <StatusBadge status={data.status} />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Premium</label>
          <p className="text-gray-700">{data.premium}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Effective Date</label>
          <p className="text-gray-700">{data.effectiveDate}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Expiry Date</label>
          <p className="text-gray-700">{data.expiryDate}</p>
        </div>
      </div>
    </div>
  );
};

export default PolicyStatus; 