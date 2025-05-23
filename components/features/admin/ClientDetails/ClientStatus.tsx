import { DetailedClient, Policy, Quote } from "@/types/admin";
import React, { useMemo } from "react";
import { StatusBadge } from "@/components/common/ui/status-badge";
import { StatusActions } from "@/components/common/ui/status-actions";
import { Activity, FileText, ClipboardList } from "lucide-react";

interface ClientStatusProps {
  data: DetailedClient;
  onStatusAction?: (actionLabel: string) => void;
}

const ClientStatus: React.FC<ClientStatusProps> = ({ data, onStatusAction }) => {
  const stats = useMemo(() => ({
    activePolicies: data.policies.filter((p: Policy) => p.status === "active").length,
    pendingQuotes: data.quotes.filter((q: Quote) => q.status === "pending").length,
  }), [data.policies, data.quotes]);

  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Client Status</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="admin-stats-item">
          <span className="admin-stats-label">Active Policies</span>
          <span className="admin-stats-value">{stats.activePolicies}</span>
        </div>
        <div className="admin-stats-item">
          <span className="admin-stats-label">Pending Quotes</span>
          <span className="admin-stats-value">{stats.pendingQuotes}</span>
        </div>
      </div>
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

export default ClientStatus; 