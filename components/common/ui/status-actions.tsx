import React from "react";
import { Status, STATUS_CONFIG } from "@/lib/constants/status";
import { Button } from "@/components/common/ui/button";

interface StatusActionsProps {
  status: Status;
  onActionClick?: (actionLabel: string) => void;
  className?: string;
}

export const StatusActions: React.FC<StatusActionsProps> = ({ 
  status, 
  onActionClick,
  className = "" 
}) => {
  const config = STATUS_CONFIG[status];
  const actions = config.actions || [];

  if (actions.length === 0) return null;

  return (
    <div className={`flex gap-2 ${className}`}>
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Button
            key={action.label}
            variant="default"
            className={action.className}
            onClick={() => onActionClick?.(action.label)}
          >
            <Icon className="icon-sm mr-2" />
            {action.label}
          </Button>
        );
      })}
    </div>
  );
}; 