import React from "react";
import { DetailedInspection } from "@/types/admin";
import { Button } from "@/components/ui";

interface ActionButtonsProps {
  data: DetailedInspection;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ data }) => {
  const getActionButtons = () => {
    switch (data.status) {
      case "pending":
        return (
          <>
            <Button variant="default" className="bg-blue-400 hover:bg-blue-500 text-white">
              Approve Inspection
            </Button>
            <Button variant="default" className="bg-red-500 hover:bg-red-600 text-white">
              Reject Inspection
            </Button>
          </>
        );
      case "approved":
        return (
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
            Schedule Follow-up
          </Button>
        );
      case "rejected":
        return (
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
            Schedule New Inspection
          </Button>
        );
      case "expired":
        return (
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
            Reschedule Inspection
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-4 justify-end mt-6">
      <Button variant="secondary">
        Edit Inspection
      </Button>
      <Button variant="secondary">
        Print Report
      </Button>
      {getActionButtons()}
    </div>
  );
};

export default ActionButtons; 