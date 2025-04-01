import { Clock, CheckCircle2, XCircle, Calendar, CircleDot, CheckCircle, Power, PauseCircle } from "lucide-react";
import { LucideIcon } from "lucide-react";

export type Status = 
  | "pending" 
  | "approved" 
  | "rejected" 
  | "expired" 
  | "active" 
  | "completed"
  | "scheduled"
  | "in-progress";

export interface StatusConfig {
  label: string;
  icon: LucideIcon;
  styles: {
    badge: string;
    button: string;
  };
  actions?: {
    label: string;
    icon: LucideIcon;
    className: string;
  }[];
}

export const STATUS_CONFIG: Record<Status, StatusConfig> = {
  pending: {
    label: "Pending",
    icon: Clock,
    styles: {
      badge: "bg-yellow-100 text-yellow-800",
      button: "bg-yellow-600 hover:bg-yellow-700 text-white"
    }
  },
  approved: {
    label: "Approved",
    icon: CheckCircle2,
    styles: {
      badge: "bg-green-100 text-green-800",
      button: "bg-green-600 hover:bg-green-700 text-white"
    }
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    styles: {
      badge: "bg-red-100 text-red-800",
      button: "bg-red-600 hover:bg-red-700 text-white"
    }
  },
  expired: {
    label: "Expired",
    icon: Calendar,
    styles: {
      badge: "bg-amber-200 text-amber-800",
      button: "bg-amber-600 hover:bg-amber-700 text-white"
    }
  },
  active: {
    label: "Active",
    icon: CircleDot,
    styles: {
      badge: "bg-blue-100 text-blue-800",
      button: "bg-blue-600 hover:bg-blue-700 text-white"
    },
    actions: [
      {
        label: "Deactivate",
        icon: Power,
        className: "bg-red-600 hover:bg-red-700 text-white"
      },
      {
        label: "Suspend",
        icon: PauseCircle,
        className: "bg-yellow-600 hover:bg-yellow-700 text-white"
      }
    ]
  },
  completed: {
    label: "Completed",
    icon: CheckCircle,
    styles: {
      badge: "bg-purple-100 text-purple-800",
      button: "bg-purple-600 hover:bg-purple-700 text-white"
    }
  },
  scheduled: {
    label: "Scheduled",
    icon: Calendar,
    styles: {
      badge: "bg-blue-50 text-blue-700",
      button: "bg-blue-600 hover:bg-blue-700 text-white"
    }
  },
  "in-progress": {
    label: "In Progress",
    icon: Clock,
    styles: {
      badge: "bg-yellow-50 text-yellow-700",
      button: "bg-yellow-600 hover:bg-yellow-700 text-white"
    }
  }
}; 