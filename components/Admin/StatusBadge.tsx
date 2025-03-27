import React from "react";
import { STATUS_STYLES, STATUS_ICONS, Status } from "@/lib/constants";
import { IconWrapper } from "@/components/ui/IconWrapper";

interface StatusBadgeProps {
  status: Status;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const Icon = STATUS_ICONS[status];

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${STATUS_STYLES[status]}`}>
      <IconWrapper icon={Icon} size="sm" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
