import React from "react";
import { DetailedPolicy } from "@/types/admin";
import { Button } from "@/components/ui";

interface ActionButtonsProps {
  data: DetailedPolicy;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ data }) => {
  const getActionButtons = () => {
    switch (data.status) {
      case "active":
        return (
          <>
            <Button variant="default" className="bg-red-600 hover:bg-red-700 text-white">
              Cancel Policy
            </Button>
            <Button variant="default" className="bg-yellow-600 hover:bg-yellow-700 text-white">
              Suspend Policy
            </Button>
          </>
        );
      case "pending":
        return (
          <Button variant="default" className="bg-green-600 hover:bg-green-700">
            Reactivate Policy
          </Button>
        );
      case "rejected":
        return (
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
            Create New Policy
          </Button>
        );
      case "expired":
        return (
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
            Renew Policy
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-4 justify-end mt-6">
      <Button variant="secondary">
        Edit Policy
      </Button>
      <Button variant="secondary">
        Print Policy
      </Button>
      {getActionButtons()}
    </div>
  );
};

export default ActionButtons; 