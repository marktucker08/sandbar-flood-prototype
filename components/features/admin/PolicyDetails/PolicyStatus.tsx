import React from "react";
import { DetailedPolicy } from "@/types/admin";
import { StatusBadge } from "@/components/common/ui/status-badge";
import { StatusActions } from "@/components/common/ui/status-actions";

interface PolicyStatusProps {
  data: DetailedPolicy;
  onStatusAction?: (actionLabel: string) => void;
}

const PolicyStatus: React.FC<PolicyStatusProps> = ({ data, onStatusAction }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Policy Status</h3>
      <div className="form-group">
        <div>
          <label className="form-label">Status</label>
          <div className="mt-1">
            <StatusBadge status={data.status} />
          </div>
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
      <div className="mt-4">
        <StatusActions 
          status={data.status} 
          onActionClick={onStatusAction}
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default PolicyStatus; 