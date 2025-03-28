import React from "react";
import { DetailedPolicy } from "@/types/admin";
import { StatusBadge } from "../StatusBadge";

interface PolicyStatusProps {
  data: DetailedPolicy;
}

const PolicyStatus: React.FC<PolicyStatusProps> = ({ data }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Policy Status</h3>
      <div className="form-group">
        <div>
          <label className="form-label">Status</label>
          <StatusBadge status={data.status} />
        </div>
        <div>
          <label className="form-label">Premium</label>
          <p className="form-value">{data.premium}</p>
        </div>
        <div>
          <label className="form-label">Effective Date</label>
          <p className="form-value">{data.effectiveDate}</p>
        </div>
        <div>
          <label className="form-label">Expiry Date</label>
          <p className="form-value">{data.expiryDate}</p>
        </div>
      </div>
    </div>
  );
};

export default PolicyStatus; 