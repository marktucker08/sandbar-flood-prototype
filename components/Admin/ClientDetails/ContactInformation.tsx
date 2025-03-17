import React from "react";
import { DetailedClient } from "@/types/admin";

interface ContactInformationProps {
  data: DetailedClient;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-500">Email</label>
          <p className="mt-1 text-sm text-gray-900">{data.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">Phone</label>
          <p className="mt-1 text-sm text-gray-900">{data.phone}</p>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-500">Address</label>
          <p className="mt-1 text-sm text-gray-900">
            {data.address}, {data.city}, {data.state} {data.zipCode}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">Last Contact</label>
          <p className="mt-1 text-sm text-gray-900">{data.lastContact}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation; 