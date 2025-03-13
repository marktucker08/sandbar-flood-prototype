import React from "react";

const DatesSection: React.FC = () => {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-base font-semibold text-gray-900">
        Expiration and Effective Dates
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <dt className="mb-1 text-sm text-gray-500">Effective Date:</dt>
          <dd className="text-sm text-gray-900">2024-10-15</dd>
        </div>
        <div>
          <dt className="mb-1 text-sm text-gray-500">Expiration Date:</dt>
          <dd className="text-sm text-gray-900">2025-10-14</dd>
        </div>
      </div>
    </section>
  );
};

export default DatesSection;
