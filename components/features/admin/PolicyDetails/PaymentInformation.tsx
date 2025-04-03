import React from "react";
import { DetailedPolicy } from "@/types/admin";

interface PaymentInformationProps {
  data: DetailedPolicy;
}

const PaymentInformation: React.FC<PaymentInformationProps> = ({ data }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Payment Information</h3>
      <div className="form-group">
        <div>
          <label className="form-label">Payment Frequency</label>
          <p className="form-value">{data.paymentFrequency}</p>
        </div>
        <div>
          <label className="form-label">Next Payment Date</label>
          <p className="form-value">{data.nextPaymentDate}</p>
        </div>
        <div>
          <label className="form-label">Last Payment Date</label>
          <p className="form-value">{data.lastPaymentDate}</p>
        </div>
        <div>
          <label className="form-label">Last Payment Amount</label>
          <p className="form-value">{data.lastPaymentAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentInformation; 