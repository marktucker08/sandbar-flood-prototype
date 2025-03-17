import React from "react";
import { DetailedPolicy } from "@/types/admin";

interface DatesSectionProps {
  data: DetailedPolicy;
}

const DatesSection: React.FC<DatesSectionProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Important Dates</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Effective Date</span>
          <span className="text-gray-700">{data.effectiveDate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Expiry Date</span>
          <span className="text-gray-700">{data.expiryDate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Next Payment Date</span>
          <span className="text-gray-700">{data.nextPaymentDate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Last Payment Date</span>
          <span className="text-gray-700">{data.lastPaymentDate}</span>
        </div>
      </div>
    </div>
  );
};

export default DatesSection; 