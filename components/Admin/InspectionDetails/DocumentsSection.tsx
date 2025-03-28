import React from "react";
import { DetailedInspection } from "@/types/admin";
import { File, Download, Eye, Upload } from "lucide-react";

interface DocumentsSectionProps {
  data: DetailedInspection;
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({ data }) => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Documents</h3>
      <div className="space-y-3">
        {data.documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <File className="icon-md text-gray-500" />
              <div>
                <p className="form-value">{doc.name}</p>
                <p className="text-sm text-gray-500">{doc.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="admin-action-button">
                <Download className="icon-sm" />
              </button>
              <button className="admin-action-button">
                <Eye className="icon-sm" />
              </button>
            </div>
          </div>
        ))}
        <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors">
          <Upload className="icon-sm mr-2 inline-block" />
          Upload Document
        </button>
      </div>
    </div>
  );
};

export default DocumentsSection; 