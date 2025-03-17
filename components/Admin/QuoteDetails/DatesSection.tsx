import React from "react";
import { DetailedQuote } from "@/types/admin";

interface DatesSectionProps {
  data: DetailedQuote;
}

const DatesSection: React.FC<DatesSectionProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Important Dates</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Created Date</span>
          <span className="text-gray-700">{data.createdDate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Expiry Date</span>
          <span className="text-gray-700">{data.expiryDate}</span>
        </div>
        {data.lastClaimDate && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Last Claim Date</span>
            <span className="text-gray-700">{data.lastClaimDate}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatesSection;
