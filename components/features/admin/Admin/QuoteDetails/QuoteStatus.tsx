import React from "react";
import { DetailedQuote } from "@/types/admin";
import { StatusBadge } from "@/components/common/ui/status-badge";
import { StatusActions } from "@/components/common/ui/status-actions";

interface QuoteStatusProps {
  data: DetailedQuote;
  onStatusAction?: (actionLabel: string) => void;
}

const QuoteStatus: React.FC<QuoteStatusProps> = ({ data, onStatusAction }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Quote Status</h3>
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
          <label className="form-label">Created Date</label>
          <p className="form-value">{data.createdDate}</p>
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

export default QuoteStatus;
