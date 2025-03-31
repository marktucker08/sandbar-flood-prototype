import React from "react";
import { DetailedClient } from "@/types/admin";
import { StatusBadge } from "@/components/ui/status-badge";
import Link from "next/link";
import { FileText, ClipboardList, ClipboardCheck, ChevronRight } from "lucide-react";

interface AssociatedRecordsProps {
  data: DetailedClient;
}

const AssociatedRecords: React.FC<AssociatedRecordsProps> = ({ data }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Associated Records</h3>
      
      {/* Policies Section */}
      <div className="mb-6">
        <div className="admin-section-header">
          <h4 className="admin-section-title flex items-center gap-2">
            <FileText className="icon-sm" />
            Policies
          </h4>
          <Link href={`/admin/dashboard/clients/${data.id}/policies`}>
            <button className="admin-action-button">
              View All
              <ChevronRight className="icon-sm" />
            </button>
          </Link>
        </div>
        <div className="space-y-3">
          {data.policies.map((policy) => (
            <div
              key={policy.id}
              className="admin-card p-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="form-value font-medium">{policy.id}</p>
                  <p className="text-xs text-gray-500">{policy.type}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="form-value">{policy.premium}</span>
                  <StatusBadge status={policy.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quotes Section */}
      <div className="mb-6">
        <div className="admin-section-header">
          <h4 className="admin-section-title flex items-center gap-2">
            <ClipboardList className="icon-sm" />
            Quotes
          </h4>
          <Link href={`/admin/dashboard/clients/${data.id}/quotes`}>
            <button className="admin-action-button">
              View All
              <ChevronRight className="icon-sm" />
            </button>
          </Link>
        </div>
        <div className="space-y-3">
          {data.quotes.map((quote) => (
            <div
              key={quote.id}
              className="admin-card p-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="form-value font-medium">{quote.id}</p>
                  <p className="text-xs text-gray-500">{quote.property}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="form-value">{quote.premium}</span>
                  <StatusBadge status={quote.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inspections Section */}
      <div>
        <div className="admin-section-header">
          <h4 className="admin-section-title flex items-center gap-2">
            <ClipboardCheck className="icon-sm" />
            Inspections
          </h4>
          <Link href={`/admin/dashboard/clients/${data.id}/inspections`}>
            <button className="admin-action-button">
              View All
              <ChevronRight className="icon-sm" />
            </button>
          </Link>
        </div>
        <div className="space-y-3">
          {data.inspections.map((inspection) => (
            <div
              key={inspection.id}
              className="admin-card p-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="form-value font-medium">{inspection.id}</p>
                  <p className="text-xs text-gray-500">{inspection.property}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="form-value">
                    {inspection.date} {inspection.time}
                  </span>
                  <StatusBadge status={inspection.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssociatedRecords; 