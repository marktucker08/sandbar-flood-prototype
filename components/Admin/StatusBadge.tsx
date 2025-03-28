import React from "react";
import { STATUS_STYLES, STATUS_ICONS, Status } from "@/lib/constants";


interface StatusBadgeProps {
  status: Status;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const Icon = STATUS_ICONS[status];

  return (
    <span className={`inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium rounded-full gap-1 w-25 ${STATUS_STYLES[status]}`}>
      <Icon className="icon-sm" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
