import React from "react";

const QuoteBreakdown: React.FC = () => {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-base font-semibold text-gray-900">Quote Breakdown</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <dt className="mb-1 text-sm text-gray-500">Premium Amount:</dt>
          <dd className="text-sm text-gray-900">$120 per month</dd>
        </div>
        <div>
          <dt className="mb-1 text-sm text-gray-500">Annual Premium:</dt>
          <dd className="text-sm text-gray-900">$1,400</dd>
        </div>
        <div>
          <dt className="mb-1 text-sm text-gray-500">Total Charges:</dt>
          <dd className="text-sm text-gray-900">$1,320</dd>
        </div>
        <div>
          <dt className="mb-1 text-sm text-gray-500">Tax:</dt>
          <dd className="text-sm text-gray-900">$20</dd>
        </div>
        <div>
          <dt className="mb-1 text-sm text-gray-500">Final Premium:</dt>
          <dd className="text-sm text-gray-900">$1,340</dd>
        </div>
      </div>
    </section>
  );
};

export default QuoteBreakdown;
