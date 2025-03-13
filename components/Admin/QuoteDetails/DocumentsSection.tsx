import React from "react";

const DocumentsSection: React.FC = () => {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-base font-semibold text-gray-900">
        Supporting Documents
      </h3>
      <div className="flex flex-col gap-2">
        <button className="flex gap-2 items-center text-gray-600">
          <i className="ti ti-file-download text-xl" />
          <span className="text-sm">Customer ID Proof.pdf</span>
        </button>
        <button className="flex gap-2 items-center text-gray-600">
          <i className="ti ti-file-download text-xl" />
          <span className="text-sm">Elevation Certificate.pdf</span>
        </button>
      </div>
    </section>
  );
};

export default DocumentsSection;
