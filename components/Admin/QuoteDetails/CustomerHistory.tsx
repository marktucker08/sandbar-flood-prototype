import React from "react";
import { DetailedQuote } from "@/types/admin";

interface CustomerHistoryProps {
  data: DetailedQuote;
}

const CustomerHistory: React.FC<CustomerHistoryProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Customer History</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Previous Claims</label>
          <p className="text-gray-700">{data.previousClaims}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Last Claim Date</label>
          <p className="text-gray-700">{data.lastClaimDate || "No previous claims"}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Last Claim Amount</label>
          <p className="text-gray-700">{data.lastClaimAmount || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerHistory;
