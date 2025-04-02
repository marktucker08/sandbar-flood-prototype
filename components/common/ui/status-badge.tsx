import React from "react";
import { Status, STATUS_CONFIG } from "@/lib/constants/status";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = "" }) => {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <span 
      className={`inline-flex items-center justify-center px-2 py-0.5 text-xs w-24 font-medium rounded-full gap-1 ${config.styles.badge} ${className}`}
    >
      <Icon className="icon-sm" />
      {config.label}
    </span>
  );
}; 