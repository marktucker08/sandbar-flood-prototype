import React from "react";
import { DetailedClient } from "@/types/admin";
import { ActionButtons } from "@/components/common/ui/action-buttons";
import { Edit, History } from "lucide-react";

interface ActionButtonsProps {
  data: DetailedClient;
  onStatusAction?: (actionLabel: string) => void;
}

const ClientActionButtons: React.FC<ActionButtonsProps> = ({ data, onStatusAction }) => {
  const commonActions = [
    {
      label: "Edit Client",
      icon: Edit,
      variant: "secondary" as const,
    },
    {
      label: "View History",
      icon: History,
      variant: "secondary" as const,
    },
  ];

  return (
    <ActionButtons
      status={data.status}
      commonActions={commonActions}
      onStatusAction={onStatusAction}
    />
  );
};

export default ClientActionButtons; 