import React from "react";
import { DetailedClient } from "@/types/admin";

interface ActionButtonsProps {
  data: DetailedClient;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ data }) => {
  return (
    <div className="flex gap-4 justify-end mt-6">
      <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
        Edit Client
      </button>
      <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
        Create New Quote
      </button>
      <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
        Schedule Inspection
      </button>
      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
        Deactivate Client
      </button>
    </div>
  );
};

export default ActionButtons; 