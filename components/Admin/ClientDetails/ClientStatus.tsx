import React, { useMemo } from "react";
import { DetailedClient } from "@/types/admin";
import { StatusBadge } from "../StatusBadge";
import { Activity, FileText, ClipboardList, ClipboardCheck } from "lucide-react";

interface ClientStatusProps {
  data: DetailedClient;
}

const ClientStatus: React.FC<ClientStatusProps> = ({ data }) => {
  const stats = useMemo(() => ({
    activePolicies: data.policies.filter(p => p.status === "active").length,
    pendingQuotes: data.quotes.filter(q => q.status === "pending").length,
    pendingInspections: data.inspections.filter(i => i.status === "pending").length,
  }), [data.policies, data.quotes, data.inspections]);

  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Client Status</h3>
      <div className="form-group">
        <div>
          <label className="form-label">
            <Activity className="icon-sm" />
            Status
          </label>
          <div className="mt-1">
            <StatusBadge status={data.status} />
          </div>
        </div>
        <div>
          <label className="form-label">
            <FileText className="icon-sm" />
            Active Policies
          </label>
          <p className="form-value">
            {stats.activePolicies}
          </p>
        </div>
        <div>
          <label className="form-label">
            <ClipboardList className="icon-sm" />
            Pending Quotes
          </label>
          <p className="form-value">
            {stats.pendingQuotes}
          </p>
        </div>
        <div>
          <label className="form-label">
            <ClipboardCheck className="icon-sm" />
            Pending Inspections
          </label>
          <p className="form-value">
            {stats.pendingInspections}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientStatus; 