import React from "react";
import { DetailedQuote } from "@/types/admin";
import { StatusBadge } from "../StatusBadge";

interface QuoteStatusProps {
  data: DetailedQuote;
}

const QuoteStatus: React.FC<QuoteStatusProps> = ({ data }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Quote Status</h3>
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
          <label className="form-label">Created Date</label>
          <p className="form-value">{data.createdDate}</p>
        </div>
        <div>
          <label className="form-label">Expiry Date</label>
          <p className="form-value">{data.expiryDate}</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteStatus;
