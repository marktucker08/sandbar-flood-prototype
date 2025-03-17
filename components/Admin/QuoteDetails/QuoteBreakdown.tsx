import React from "react";
import { DetailedQuote } from "@/types/admin";

interface QuoteBreakdownProps {
  data: DetailedQuote;
}

const QuoteBreakdown: React.FC<QuoteBreakdownProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Premium Breakdown</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Base Rate</span>
          <span className="text-gray-700">{data.baseRate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Flood Zone Factor</span>
          <span className="text-gray-700">{data.floodZoneFactor}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Elevation Factor</span>
          <span className="text-gray-700">{data.elevationFactor}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Deductible Factor</span>
          <span className="text-gray-700">{data.deductibleFactor}</span>
        </div>
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Total Premium</span>
            <span className="font-semibold text-gray-700">{data.totalPremium}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteBreakdown;
