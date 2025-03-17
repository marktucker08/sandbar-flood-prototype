import React from "react";
import { DetailedInspection } from "@/types/admin";

interface InspectionDetailsProps {
  data: DetailedInspection;
}

const InspectionDetails: React.FC<InspectionDetailsProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Inspection Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Inspection Type</label>
          <p className="text-gray-700">{data.inspectionType}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Inspector</label>
          <p className="text-gray-700">{data.inspector}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Date</label>
          <p className="text-gray-700">{data.date}</p>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Time</label>
          <p className="text-gray-700">{data.time}</p>
        </div>
        <div className="col-span-2">
          <label className="block text-sm text-gray-500 mb-1">Notes</label>
          <p className="text-gray-700">{data.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default InspectionDetails; 