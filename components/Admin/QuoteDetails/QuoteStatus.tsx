import React from "react";
import { DetailedQuote } from "@/types/admin";
import { StatusBadge } from "../StatusBadge";

interface QuoteStatusProps {
  data: DetailedQuote;
}

const QuoteStatus: React.FC<QuoteStatusProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Quote Status</h3>
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
          <label className="block text-sm text-gray-500 mb-1">Created Date</label>
          <p className="text-gray-700">{data.createdDate}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Expiry Date</label>
          <p className="text-gray-700">{data.expiryDate}</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteStatus;
