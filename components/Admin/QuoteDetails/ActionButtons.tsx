import React from "react";

const ActionButtons: React.FC = () => {
  return (
    <div className="flex gap-4 justify-end items-center mt-6">
      <button className="flex gap-2 items-center px-4 py-2 text-sm text-gray-600 rounded-md border border border-solid">
        <i className="ti ti-pencil text-xl" />
        <span>Update Details</span>
      </button>
      <button className="flex gap-2 items-center px-4 py-2 text-sm text-white bg-blue-600 rounded-md">
        <i className="ti ti-download text-xl" />
        <span>Download Quote</span>
      </button>
    </div>
  );
};

export default ActionButtons;
