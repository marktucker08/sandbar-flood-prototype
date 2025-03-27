import React from "react";
import { DetailedClient } from "@/types/admin";
import { StatusBadge } from "../StatusBadge";
import Link from "next/link";
import { FileText, ClipboardList, ClipboardCheck, ChevronRight } from "lucide-react";

interface AssociatedRecordsProps {
  data: DetailedClient;
}

const AssociatedRecords: React.FC<AssociatedRecordsProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Associated Records</h3>
      
      {/* Policies Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-md font-medium text-gray-700 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Policies
          </h4>
          <Link href={`/admin/dashboard/clients/${data.id}/policies`}>
            <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
        <div className="space-y-3">
          {data.policies.map((policy) => (
            <div
              key={policy.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{policy.id}</p>
                <p className="text-xs text-gray-500">{policy.type}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-900">{policy.premium}</span>
                <StatusBadge status={policy.status} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quotes Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-md font-medium text-gray-700 flex items-center gap-2">
            <ClipboardList className="w-4 h-4" />
            Quotes
          </h4>
          <Link href={`/admin/dashboard/clients/${data.id}/quotes`}>
            <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
        <div className="space-y-3">
          {data.quotes.map((quote) => (
            <div
              key={quote.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{quote.id}</p>
                <p className="text-xs text-gray-500">{quote.property}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-900">{quote.premium}</span>
                <StatusBadge status={quote.status} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inspections Section */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-md font-medium text-gray-700 flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4" />
            Inspections
          </h4>
          <Link href={`/admin/dashboard/clients/${data.id}/inspections`}>
            <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
        <div className="space-y-3">
          {data.inspections.map((inspection) => (
            <div
              key={inspection.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{inspection.id}</p>
                <p className="text-xs text-gray-500">{inspection.property}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-900">
                  {inspection.date} {inspection.time}
                </span>
                <StatusBadge status={inspection.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssociatedRecords; 