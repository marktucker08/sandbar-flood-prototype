import React from "react";
import { DetailedClient } from "@/types/admin";
import { Button } from "@/components/ui";
import { Power, PauseCircle, CheckCircle2, UserPlus, RefreshCw, Edit, History } from "lucide-react";

interface ActionButtonsProps {
  data: DetailedClient;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ data }) => {
  const getActionButtons = () => {
    switch (data.status) {
      case "active":
        return (
          <>
            <Button variant="default" className="bg-red-600 hover:bg-red-700 text-white">
              <Power className="icon-sm mr-2" />
              Deactivate Client
            </Button>
            <Button variant="default" className="bg-yellow-600 hover:bg-yellow-700 text-white">
              <PauseCircle className="icon-sm mr-2" />
              Suspend Client
            </Button>
          </>
        );
      case "pending":
        return (
          <Button variant="default" className="bg-green-600 hover:bg-green-700">
            <CheckCircle2 className="icon-sm mr-2" />
            Activate Client
          </Button>
        );
      case "rejected":
        return (
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="icon-sm mr-2" />
            Create New Client
          </Button>
        );
      case "expired":
        return (
          <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="icon-sm mr-2" />
            Reactivate Client
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-action-buttons mt-6">
      <Button variant="secondary">
        <Edit className="icon-sm mr-2" />
        Edit Client
      </Button>
      <Button variant="secondary">
        <History className="icon-sm mr-2" />
        View History
      </Button>
      {getActionButtons()}
    </div>
  );
};

export default ActionButtons; 