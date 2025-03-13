import React from "react";

const CustomerHistory: React.FC = () => {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-base font-semibold text-gray-900">
        Customer History
      </h3>
      <div className="flex flex-col gap-2">
        <h4 className="mb-1 text-sm text-gray-500">Previous Policies:</h4>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-900">Policy #P-2023011-002</span>
          <span className="px-2 py-0.5 text-xs text-green-700 bg-green-100 rounded-full">
            Active
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-900">Policy #P-2023905-001</span>
          <span className="px-2 py-0.5 text-xs text-red-700 bg-red-100 rounded-full">
            Expired
          </span>
        </div>
      </div>
    </section>
  );
};

export default CustomerHistory;
