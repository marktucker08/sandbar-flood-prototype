import React from "react";
import { DetailedClient } from "@/types/admin";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactInformationProps {
  data: DetailedClient;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ data }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Contact Information</h3>
      <div className="form-group">
        <div>
          <label className="form-label">
            <Mail className="icon-sm" />
            Email
          </label>
          <p className="form-value">{data.email}</p>
        </div>
        <div>
          <label className="form-label">
            <Phone className="icon-sm" />
            Phone
          </label>
          <p className="form-value">{data.phoneNumber}</p>
        </div>
        <div className="form-group-full">
          <label className="form-label">
            <MapPin className="icon-sm" />
            Address
          </label>
          <p className="form-value">
            {data.address}, {data.city}, {data.state} {data.zipCode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation; 