import React from "react";
import { DetailedInspection } from "@/types/admin";
import { ClipboardCheck, User, Calendar, Clock, StickyNote } from "lucide-react";

interface InspectionDetailsProps {
  data: DetailedInspection;
}

const InspectionDetails: React.FC<InspectionDetailsProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Inspection Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-500 mb-1 flex items-center gap-1">
            <ClipboardCheck className="w-4 h-4" />
            Inspection Type
          </label>
          <p className="text-gray-700">{data.inspectionType}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500 mb-1 flex items-center gap-1">
            <User className="w-4 h-4" />
            Inspector
          </label>
          <p className="text-gray-700">{data.inspector}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500 mb-1 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Date
          </label>
          <p className="text-gray-700">{data.date}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500 mb-1 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Time
          </label>
          <p className="text-gray-700">{data.time}</p>
        </div>
        <div className="col-span-2">
          <label className="text-sm text-gray-500 mb-1 flex items-center gap-1">
            <StickyNote className="w-4 h-4" />
            Notes
          </label>
          <p className="text-gray-700">{data.notes}</p>
        </div>
      </div>
    </div>
  );
};

export default InspectionDetails; 