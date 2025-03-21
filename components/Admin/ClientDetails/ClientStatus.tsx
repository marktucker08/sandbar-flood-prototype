import React from "react";
import { DetailedClient } from "@/types/admin";
import { StatusBadge } from "../StatusBadge";

interface ClientStatusProps {
  data: DetailedClient;
}

const ClientStatus: React.FC<ClientStatusProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Status</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-500">Status</label>
          <div className="mt-1">
            <StatusBadge status={data.status} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">Active Policies</label>
          <p className="mt-1 text-sm text-gray-900">
            {data.policies.filter(p => p.status === "active").length}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">Pending Quotes</label>
          <p className="mt-1 text-sm text-gray-900">
            {data.quotes.filter(q => q.status === "pending").length}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500">Pending Inspections</label>
          <p className="mt-1 text-sm text-gray-900">
            {data.inspections.filter(i => i.status === "pending").length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClientStatus; 