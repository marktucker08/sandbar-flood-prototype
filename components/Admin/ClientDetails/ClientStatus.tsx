import React, { useMemo } from "react";
import { DetailedClient } from "@/types/admin";
import { StatusBadge } from "../StatusBadge";
import { Activity, FileText, ClipboardList, ClipboardCheck } from "lucide-react";
import { Label } from "@/components/ui/Label";

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
    <div className="bg-white rounded-xl border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Status</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label icon={Activity}>Status</Label>
          <div className="mt-1">
            <StatusBadge status={data.status} />
          </div>
        </div>
        <div>
          <Label icon={FileText}>Active Policies</Label>
          <p className="mt-1 text-sm text-gray-900">
            {stats.activePolicies}
          </p>
        </div>
        <div>
          <Label icon={ClipboardList}>Pending Quotes</Label>
          <p className="mt-1 text-sm text-gray-900">
            {stats.pendingQuotes}
          </p>
        </div>
        <div>
          <Label icon={ClipboardCheck}>Pending Inspections</Label>
          <p className="mt-1 text-sm text-gray-900">
            {stats.pendingInspections}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientStatus; 