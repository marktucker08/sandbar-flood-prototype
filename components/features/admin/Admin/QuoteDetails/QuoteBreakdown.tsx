import React from "react";
import { DetailedQuote } from "@/types/admin";

interface QuoteBreakdownProps {
  data: DetailedQuote;
}

const QuoteBreakdown: React.FC<QuoteBreakdownProps> = ({ data }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Premium Breakdown</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="form-label">Base Rate</span>
          <span className="form-value">{data.baseRate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="form-label">Flood Zone Factor</span>
          <span className="form-value">{data.floodZoneFactor}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="form-label">Elevation Factor</span>
          <span className="form-value">{data.elevationFactor}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="form-label">Deductible Factor</span>
          <span className="form-value">{data.deductibleFactor}</span>
        </div>
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between items-center">
            <span className="form-value font-semibold">Total Premium</span>
            <span className="form-value font-semibold">{data.totalPremium}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteBreakdown;
