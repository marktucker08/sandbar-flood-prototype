import React from "react";
import { DetailedInspection } from "@/types/admin";

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

  return (
    <div className="bg-white rounded-lg border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Inspection Findings</h3>
      <div className="space-y-4">
        {data.findings.map((finding) => (
          <div key={finding.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-700">{finding.category}</h4>
              <span className={`text-sm font-medium ${getSeverityColor(finding.severity)}`}>
                {finding.severity} Severity
              </span>
            </div>
            <p className="text-gray-600">{finding.description}</p>
          </div>
        ))}
        {data.findings.length === 0 && (
          <p className="text-gray-500 text-center py-4">No findings reported</p>
        )}
      </div>
    </div>
  );
};

export default FindingsSection; 