import React from "react";

const PersonalDetails: React.FC = () => {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-base font-semibold text-gray-900">
        Personal Details
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <dt className="mb-1 text-sm text-gray-500">Client ID:</dt>
          <dd className="text-sm text-gray-900">CUST-34256</dd>
        </div>
        <div>
          <dt className="mb-1 text-sm text-gray-500">Full Name:</dt>
          <dd className="text-sm text-gray-900">Theresa Heidenreich</dd>
        </div>
        <div>
          <dt className="mb-1 text-sm text-gray-500">Occupation:</dt>
          <dd className="text-sm text-gray-900">Marketing Manager</dd>
        </div>
      </div>
    </section>
  );
};

export default PersonalDetails;
