import React from "react";

const QuoteStatus: React.FC = () => {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-base font-semibold text-gray-900">Quote Status</h3>
      <div className="flex gap-2 items-center">
        <span className="px-3 py-1 text-sm text-blue-800 bg-blue-100 rounded-full">
          Pending Approval
        </span>
        <button>
          <i className="ti ti-pencil text-xl text-gray-600" />
        </button>
      </div>
    </section>
  );
};

export default QuoteStatus;
