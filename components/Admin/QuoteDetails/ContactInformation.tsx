import React from "react";
import { DetailedQuote } from "@/types/admin";

interface ContactInformationProps {
  data: DetailedQuote;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ data }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Contact Information</h3>
      <div className="form-group">
        <div>
          <label className="form-label">Email</label>
          <p className="form-value">{data.email}</p>
        </div>
        <div>
          <label className="form-label">Phone</label>
          <p className="form-value">{data.phone}</p>
        </div>
        <div className="form-group-full">
          <label className="form-label">Address</label>
          <p className="form-value">
            {data.address}, {data.city}, {data.state} {data.zipCode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
