import React from "react";
import { DetailedInspection } from "@/types/admin";
import { ClipboardCheck, User, Calendar, Clock, StickyNote } from "lucide-react";

interface InspectionDetailsProps {
  data: DetailedInspection;
}

const InspectionDetails: React.FC<InspectionDetailsProps> = ({ data }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Inspection Details</h3>
      <div className="form-group">
        <div>
          <label className="form-label">
            <ClipboardCheck className="icon-sm" />
            Inspection Type
          </label>
          <p className="form-value">{data.inspectionType}</p>
        </div>
        <div>
          <label className="form-label">
            <User className="icon-sm" />
            Inspector
          </label>
          <p className="form-value">{data.inspector}</p>
        </div>
        <div>
          <label className="form-label">
            <Calendar className="icon-sm" />
            Date
          </label>
          <p className="form-value">{data.date}</p>
        </div>
        <div>
          <label className="form-label">
            <Clock className="icon-sm" />
            Time
          </label>
          <p className="form-value">{data.time}</p>
        </div>
        <div className="form-group-full">
          <label className="form-label">
            <StickyNote className="icon-sm" />
            Notes
          </label>
          <p className="form-value">{data.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default InspectionDetails; 