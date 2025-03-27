import React from "react";
import { DetailedClient } from "@/types/admin";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Label } from "@/components/ui/Label";

interface ContactInformationProps {
  data: DetailedClient;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label icon={Mail}>Email</Label>
          <p className="mt-1 text-sm text-gray-900">{data.email}</p>
        </div>
        <div>
          <Label icon={Phone}>Phone</Label>
          <p className="mt-1 text-sm text-gray-900">{data.phone}</p>
        </div>
        <div className="col-span-2">
          <Label icon={MapPin}>Address</Label>
          <p className="mt-1 text-sm text-gray-900">
            {data.address}, {data.city}, {data.state} {data.zipCode}
          </p>
        </div>
        <div>
          <Label icon={Clock}>Last Contact</Label>
          <p className="mt-1 text-sm text-gray-900">{data.lastContact}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation; 