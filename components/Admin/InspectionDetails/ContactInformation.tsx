import React from "react";
import { DetailedInspection } from "@/types/admin";
import { User, Mail, Phone, ClipboardCheck } from "lucide-react";

interface ContactInformationProps {
  data: DetailedInspection;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1 flex items-center gap-1">
            <User className="w-4 h-4" />
            Client Name
          </label>
          <p className="text-gray-700">{data.client}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1 flex items-center gap-1">
            <Mail className="w-4 h-4" />
            Client Email
          </label>
          <p className="text-gray-700">{data.clientEmail}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1 flex items-center gap-1">
            <Phone className="w-4 h-4" />
            Client Phone
          </label>
          <p className="text-gray-700">{data.clientPhone}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1 flex items-center gap-1">
            <ClipboardCheck className="w-4 h-4" />
            Inspector
          </label>
          <p className="text-gray-700">{data.inspector}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation; 