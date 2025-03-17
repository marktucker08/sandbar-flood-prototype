import React from "react";
import { DetailedPolicy } from "@/types/admin";

interface DocumentsSectionProps {
  data: DetailedPolicy;
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-solid p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Documents</h3>
      <div className="space-y-3">
        {data.documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <i className="ti ti-file text-xl text-gray-500" />
              <div>
                <p className="text-gray-700">{doc.name}</p>
                <p className="text-sm text-gray-500">{doc.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <i className="ti ti-download" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <i className="ti ti-eye" />
              </button>
            </div>
          </div>
        ))}
        <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors">
          <i className="ti ti-upload mr-2" />
          Upload Document
        </button>
      </div>
    </div>
  );
};

export default DocumentsSection; 