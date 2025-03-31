import React from "react";
import { DetailedPolicy } from "@/types/admin";
import { User, Calendar, CreditCard } from "lucide-react";

interface PersonalDetailsProps {
  data: DetailedPolicy;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ data }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header flex items-center gap-2">
      
        Personal Details
      </h3>
      <div className="form-group">
        <div>
          <label className="form-label flex items-center gap-2">
            <User className="icon-sm" />
            First Name
          </label>
          <p className="form-value">{data.firstName}</p>
        </div>
        <div>
          <label className="form-label flex items-center gap-2">
            Last Name
          </label>
          <p className="form-value">{data.lastName}</p>
        </div>
        <div>
          <label className="form-label flex items-center gap-2">
            <Calendar className="icon-sm" />
            Date of Birth
          </label>
          <p className="form-value">{data.dateOfBirth}</p>
        </div>
        <div>
          <label className="form-label flex items-center gap-2">
            <CreditCard className="icon-sm" />
            SSN
          </label>
          <p className="form-value">{data.ssn}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails; 