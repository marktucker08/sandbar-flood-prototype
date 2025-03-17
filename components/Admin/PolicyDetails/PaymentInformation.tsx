import React from "react";
import { DetailedPolicy } from "@/types/admin";

interface PaymentInformationProps {
  data: DetailedPolicy;
}

const PaymentInformation: React.FC<PaymentInformationProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Payment Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Payment Frequency</label>
          <p className="text-gray-700">{data.paymentFrequency}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Next Payment Date</label>
          <p className="text-gray-700">{data.nextPaymentDate}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Last Payment Date</label>
          <p className="text-gray-700">{data.lastPaymentDate}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Last Payment Amount</label>
          <p className="text-gray-700">{data.lastPaymentAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentInformation; 