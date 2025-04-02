import React from "react";
import { DetailedQuote } from "@/types/admin";

interface CustomerHistoryProps {
  data: DetailedQuote;
}

const CustomerHistory: React.FC<CustomerHistoryProps> = ({ data }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Customer History</h3>
      <div className="form-group">
        <div>
          <label className="form-label">Previous Claims</label>
          <p className="form-value">{data.previousClaims}</p>
        </div>
        <div>
          <label className="form-label">Last Claim Date</label>
          <p className="form-value">{data.lastClaimDate || "No previous claims"}</p>
        </div>
        <div>
          <label className="form-label">Last Claim Amount</label>
          <p className="form-value">{data.lastClaimAmount || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerHistory;
