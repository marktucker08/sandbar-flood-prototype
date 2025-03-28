import React from "react";
import { DetailedInspection } from "@/types/admin";
import { StatusBadge } from "../StatusBadge";

interface InspectionStatusProps {
  data: DetailedInspection;
}

const InspectionStatus: React.FC<InspectionStatusProps> = ({ data }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Inspection Status</h3>
      <div className="form-group">
        <div>
          <label className="form-label">Status</label>
          <StatusBadge status={data.status} />
        </div>
        <div>
          <label className="form-label">Type</label>
          <p className="form-value">{data.inspectionType}</p>
        </div>
        <div>
          <label className="form-label">Date</label>
          <p className="form-value">{data.date}</p>
        </div>
        <div>
          <label className="form-label">Time</label>
          <p className="form-value">{data.time}</p>
        </div>
      </div>
    </div>
  );
};

export default InspectionStatus; 