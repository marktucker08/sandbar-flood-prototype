import React from "react";
import { DetailedInspection } from "@/types/admin";
import { Button } from "@/components/ui";
import { CheckCircle2, XCircle, Calendar, Edit, Printer, Clock } from "lucide-react";

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
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Approve Inspection
            </Button>
            <Button variant="default" className="bg-red-500 hover:bg-red-600 text-white">
              <XCircle className="w-4 h-4 mr-2" />
              Reject Inspection
            </Button>
          </>
        );
      case "approved":
        return (
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Follow-up
          </Button>
        );
      case "rejected":
        return (
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule New Inspection
          </Button>
        );
      case "expired":
        return (
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Clock className="w-4 h-4 mr-2" />
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
        <Edit className="w-4 h-4 mr-2" />
        Edit Inspection
      </Button>
      <Button variant="secondary">
        <Printer className="w-4 h-4 mr-2" />
        Print Report
      </Button>
      {getActionButtons()}
    </div>
  );
};

export default ActionButtons; 