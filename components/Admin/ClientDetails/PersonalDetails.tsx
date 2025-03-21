import React from "react";
import { DetailedClient } from "@/types/admin";

interface PersonalDetailsProps {
  data: DetailedClient;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-500">Full Name</label>
          <p className="mt-1 text-sm text-gray-900">{data.name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">Client Type</label>
          <p className="mt-1 text-sm text-gray-900">{data.type}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">Date of Birth</label>
          <p className="mt-1 text-sm text-gray-900">{data.dateOfBirth}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">SSN</label>
          <p className="mt-1 text-sm text-gray-900">{data.ssn}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails; 