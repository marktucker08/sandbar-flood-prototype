import React from "react";
import { DetailedInspection } from "@/types/admin";
import { AlertCircle, AlertTriangle, CheckCircle2 } from "lucide-react";

interface FindingsSectionProps {
  data: DetailedInspection;
}

const FindingsSection: React.FC<FindingsSectionProps> = ({ data }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "text-red-600";
      case "Medium":
        return "text-yellow-600";
      case "Low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "High":
        return <AlertCircle className="icon-sm" />;
      case "Medium":
        return <AlertTriangle className="icon-sm" />;
      case "Low":
        return <CheckCircle2 className="icon-sm" />;
      default:
        return null;
    }
  };

  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Inspection Findings</h3>
      <div className="space-y-4">
        {data.findings.map((finding) => (
          <div key={finding.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-700">{finding.category}</h4>
              <span className={`text-sm font-medium ${getSeverityColor(finding.severity)} flex items-center gap-1`}>
                {getSeverityIcon(finding.severity)}
                {finding.severity} Severity
              </span>
            </div>
            <p className="form-value">{finding.description}</p>
          </div>
        ))}
        {data.findings.length === 0 && (
          <p className="form-value text-center py-4">No findings reported</p>
        )}
      </div>
    </div>
  );
};

export default FindingsSection; 