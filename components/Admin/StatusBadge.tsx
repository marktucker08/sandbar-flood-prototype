import React from "react";
import { Status } from "@/types/admin";
import { Clock, CheckCircle2, XCircle, Calendar, CheckCircle, CircleDot } from "lucide-react";

interface StatusBadgeProps {
  status: Status;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    expired: "bg-gray-100 text-gray-800",
    active: "bg-blue-100 text-blue-800",
    completed: "bg-purple-100 text-purple-800",
  };

  const statusIcons = {
    pending: Clock,
    approved: CheckCircle2,
    rejected: XCircle,
    expired: Calendar,
    active: CircleDot,
    completed: CheckCircle,
  };

  const Icon = statusIcons[status];

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${statusStyles[status]}`}>
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
