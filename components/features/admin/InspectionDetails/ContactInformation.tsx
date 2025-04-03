import React from "react";
import { DetailedInspection } from "@/types/admin";
import { User, Mail, Phone, ClipboardCheck } from "lucide-react";

interface ContactInformationProps {
  data: DetailedInspection;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ data }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Contact Information</h3>
      <div className="form-group">
        <div>
          <label className="form-label">
            <User className="icon-sm" />
            Client Name
          </label>
          <p className="form-value">{data.client}</p>
        </div>
        <div>
          <label className="form-label">
            <Mail className="icon-sm" />
            Client Email
          </label>
          <p className="form-value">{data.clientEmail}</p>
        </div>
        <div>
          <label className="form-label">
            <Phone className="icon-sm" />
            Client Phone
          </label>
          <p className="form-value">{data.clientPhone}</p>
        </div>
        <div>
          <label className="form-label">
            <ClipboardCheck className="icon-sm" />
            Inspector
          </label>
          <p className="form-value">{data.inspector}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation; 