import React from "react";
import { DetailedQuote } from "@/types/admin";

interface PersonalDetailsProps {
  data: DetailedQuote;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">First Name</label>
          <p className="text-gray-700">{data.firstName}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Last Name</label>
          <p className="text-gray-700">{data.lastName}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Date of Birth</label>
          <p className="text-gray-700">{data.dateOfBirth}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">SSN</label>
          <p className="text-gray-700">{data.ssn}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
