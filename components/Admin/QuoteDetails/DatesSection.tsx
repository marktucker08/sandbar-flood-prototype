import React from "react";
import { DetailedQuote } from "@/types/admin";

interface DatesSectionProps {
  data: DetailedQuote;
}

const DatesSection: React.FC<DatesSectionProps> = ({ data }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Important Dates</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="form-label">Created Date</span>
          <span className="form-value">{data.createdDate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="form-label">Expiry Date</span>
          <span className="form-value">{data.expiryDate}</span>
        </div>
        {data.lastClaimDate && (
          <div className="flex justify-between items-center">
            <span className="form-label">Last Claim Date</span>
            <span className="form-value">{data.lastClaimDate}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatesSection;
