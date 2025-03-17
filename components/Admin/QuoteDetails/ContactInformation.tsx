import React from "react";
import { DetailedQuote } from "@/types/admin";

interface ContactInformationProps {
  data: DetailedQuote;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Email</label>
          <p className="text-gray-700">{data.email}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Phone</label>
          <p className="text-gray-700">{data.phone}</p>
        </div>
        <div className="col-span-2">
          <label className="block text-sm text-gray-500 mb-1">Address</label>
          <p className="text-gray-700">
            {data.address}, {data.city}, {data.state} {data.zipCode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
