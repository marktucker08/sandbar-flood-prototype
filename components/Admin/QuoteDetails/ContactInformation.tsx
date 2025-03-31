import React from "react";
import { DetailedQuote } from "@/types/admin";
import { Mail, Phone, MapPin, Building2 } from "lucide-react";

interface ContactInformationProps {
  data: DetailedQuote;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ data }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header flex items-center gap-2">
        
        Contact Information
      </h3>
      <div className="form-group">
        <div>
          <label className="form-label flex items-center gap-2">
            <Mail className="icon-sm" />
            Email
          </label>
          <p className="form-value">{data.email}</p>
        </div>
        <div>
          <label className="form-label flex items-center gap-2">
            <Phone className="icon-sm" />
            Phone
          </label>
          <p className="form-value">{data.phone}</p>
        </div>
        <div>
          <label className="form-label flex items-center gap-2">
            <MapPin className="icon-sm" />
            Address
          </label>
          <p className="form-value">{data.address}</p>
        </div>
        <div>
          <label className="form-label flex items-center gap-2">
            <Building2 className="icon-sm" />
            City
          </label>
          <p className="form-value">{data.city}</p>
        </div>
        <div>
          <label className="form-label flex items-center gap-2">
            <MapPin className="icon-sm" />
            State
          </label>
          <p className="form-value">{data.state}</p>
        </div>
        <div>
          <label className="form-label flex items-center gap-2">
            <MapPin className="icon-sm" />
            ZIP Code
          </label>
          <p className="form-value">{data.zipCode}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
