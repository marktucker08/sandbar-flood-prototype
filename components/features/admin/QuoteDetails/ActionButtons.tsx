import React from "react";
import { DetailedQuote } from "@/types/admin";
import { ActionButtons } from "@/components/common/ui/action-buttons";
import { Edit, Printer } from "lucide-react";

interface ActionButtonsProps {
  data: DetailedQuote;
  onStatusAction?: (actionLabel: string) => void;
}

const QuoteActionButtons: React.FC<ActionButtonsProps> = ({ data, onStatusAction }) => {
  const commonActions = [
    {
      label: "Edit Quote",
      icon: Edit,
      variant: "secondary" as const,
    },
    {
      label: "Print Quote",
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

export default QuoteActionButtons;
