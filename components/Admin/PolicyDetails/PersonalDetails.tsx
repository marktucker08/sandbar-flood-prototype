import React from "react";
import { DetailedPolicy } from "@/types/admin";

interface PersonalDetailsProps {
  data: DetailedPolicy;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({ data }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Personal Details</h3>
      <div className="form-group">
        <div>
          <label className="form-label">First Name</label>
          <p className="form-value">{data.firstName}</p>
        </div>
        <div>
          <label className="form-label">Last Name</label>
          <p className="form-value">{data.lastName}</p>
        </div>
        <div>
          <label className="form-label">Date of Birth</label>
          <p className="form-value">{data.dateOfBirth}</p>
        </div>
        <div>
          <label className="form-label">SSN</label>
          <p className="form-value">{data.ssn}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails; 