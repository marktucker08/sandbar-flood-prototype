import React from "react";
import { DetailedClient } from "@/types/admin";
import { User, Building2, Calendar, CreditCard } from "lucide-react";

interface PersonalDetailsProps {
  data: DetailedClient;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ data }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Personal Details</h3>
      <div className="form-group">
        <div>
          <label className="form-label">
            <User className="icon-sm" />
            Full Name
          </label>
          <p className="form-value">{`${data.firstName} ${data.lastName}`}</p>
        </div>
        <div>
          <label className="form-label">
            <Building2 className="icon-sm" />
            Client Type
          </label>
          <p className="form-value">{data.insuredType}</p>
        </div>
        <div>
          <label className="form-label">
            <Calendar className="icon-sm" />
            Date of Birth
          </label>
          <p className="form-value">N/A</p>
        </div>
        <div>
          <label className="form-label">
            <CreditCard className="icon-sm" />
            SSN
          </label>
          <p className="form-value">N/A</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails; 