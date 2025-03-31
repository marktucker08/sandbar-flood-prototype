import React from "react";
import { DetailedInspection } from "@/types/admin";
import { ActionButtons } from "@/components/ui/action-buttons";
import { Edit, Printer } from "lucide-react";

interface ActionButtonsProps {
  data: DetailedInspection;
  onStatusAction?: (actionLabel: string) => void;
}

const InspectionActionButtons: React.FC<ActionButtonsProps> = ({ data, onStatusAction }) => {
  const commonActions = [
    {
      label: "Edit Inspection",
      icon: Edit,
      variant: "secondary" as const,
    },
    {
      label: "Print Report",
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

export default InspectionActionButtons; 