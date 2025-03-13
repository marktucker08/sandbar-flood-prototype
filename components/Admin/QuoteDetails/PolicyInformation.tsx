import React from "react";

const PolicyInformation: React.FC = () => {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-base font-semibold text-gray-900">
        Policy Information
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <dt className="mb-1 text-sm text-gray-500">Policy Type:</dt>
          <dd className="text-sm text-gray-900">Flood Insurance</dd>
        </div>
        <div>
          <dt className="mb-1 text-sm text-gray-500">Policy Description:</dt>
          <dd className="text-sm text-gray-900">+1 123 456 7890</dd>
        </div>
        <div>
          <dt className="mb-1 text-sm text-gray-500">Coverage Amount:</dt>
          <dd className="text-sm text-gray-900">$50,000</dd>
        </div>
        <div>
          <dt className="mb-1 text-sm text-gray-500">Deductible:</dt>
          <dd className="text-sm text-gray-900">$1,500</dd>
        </div>
      </div>
    </section>
  );
};

export default PolicyInformation;
