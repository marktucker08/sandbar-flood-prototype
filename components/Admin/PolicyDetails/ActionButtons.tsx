import React from "react";
import { DetailedPolicy } from "@/types/admin";
import { ActionButtons } from "@/components/ui/action-buttons";
import { Edit, Printer } from "lucide-react";

interface ActionButtonsProps {
  data: DetailedPolicy;
  onStatusAction?: (actionLabel: string) => void;
}

const PolicyActionButtons: React.FC<ActionButtonsProps> = ({ data, onStatusAction }) => {
  const commonActions = [
    {
      label: "Edit Policy",
      icon: Edit,
      variant: "secondary" as const,
    },
    {
      label: "Print Policy",
      icon: Printer,
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

export default PolicyActionButtons; 