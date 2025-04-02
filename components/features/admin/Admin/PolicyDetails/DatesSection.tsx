import React from "react";
import { DetailedPolicy } from "@/types/admin";

interface DatesSectionProps {
  data: DetailedPolicy;
}

const DatesSection: React.FC<DatesSectionProps> = ({ data }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Important Dates</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="form-label">Effective Date</span>
          <span className="form-value">{data.effectiveDate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="form-label">Expiry Date</span>
          <span className="form-value">{data.expiryDate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="form-label">Next Payment Date</span>
          <span className="form-value">{data.nextPaymentDate}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="form-label">Last Payment Date</span>
          <span className="form-value">{data.lastPaymentDate}</span>
        </div>
      </div>
    </div>
  );
};

export default DatesSection; 