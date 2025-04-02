import React, { useState } from "react";
import { Button } from "@/components/common/ui/button";
import { StatusActions } from "@/components/common/ui/status-actions";
import { ConfirmationDialog } from "@/components/common/ui/confirmation-dialog";
import { LucideIcon } from "lucide-react";
import { Status } from "@/lib/constants/status";

interface CommonAction {
  label: string;
  icon: LucideIcon;
  variant?: "default" | "secondary";
  className?: string;
  onClick?: () => void;
  requiresConfirmation?: boolean;
  confirmationConfig?: {
    title: string;
    description: string;
    variant?: "default" | "destructive";
  };
}

interface ActionButtonsProps {
  status: Status;
  commonActions: CommonAction[];
  onStatusAction?: (actionLabel: string) => void;
  className?: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  status,
  commonActions,
  onStatusAction,
  className = "",
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState<{
    title: string;
    description: string;
    onConfirm: () => void;
    variant?: "default" | "destructive";
  } | null>(null);

  const handleActionClick = (action: CommonAction) => {
    if (action.requiresConfirmation && action.confirmationConfig) {
      setDialogConfig({
        ...action.confirmationConfig,
        onConfirm: () => {
          action.onClick?.();
          setDialogOpen(false);
        },
      });
      setDialogOpen(true);
    } else {
      action.onClick?.();
    }
  };

  return (
    <>
      <div className={`admin-action-buttons mt-6 ${className}`}>
        {commonActions.map((action) => {
          const Icon = action.icon;
          return (
            <Button
              key={action.label}
              variant={action.variant || "secondary"}
              className={action.className}
              onClick={() => handleActionClick(action)}
            >
              <Icon className="icon-sm mr-2" />
              {action.label}
            </Button>
          );
        })}
        <StatusActions 
          status={status} 
          onActionClick={onStatusAction}
        />
      </div>

      {dialogConfig && (
        <ConfirmationDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title={dialogConfig.title}
          description={dialogConfig.description}
          onConfirm={dialogConfig.onConfirm}
          variant={dialogConfig.variant || "default"}
        />
      )}
    </>
  );
}; 