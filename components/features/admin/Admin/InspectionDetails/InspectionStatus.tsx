import React from "react";
import { DetailedInspection } from "@/types/admin";
import { StatusBadge } from "@/components/common/ui/status-badge";
import { StatusActions } from "@/components/common/ui/status-actions";

interface InspectionStatusProps {
  data: DetailedInspection;
  onStatusAction?: (actionLabel: string) => void;
}

const InspectionStatus: React.FC<InspectionStatusProps> = ({ data, onStatusAction }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Inspection Status</h3>
      <div className="form-group">
        <div>
          <label className="form-label">Status</label>
          <div className="mt-1">
            <StatusBadge status={data.status} />
          </div>
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
      <div className="mt-4">
        <StatusActions 
          status={data.status} 
          onActionClick={onStatusAction}
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default InspectionStatus; 