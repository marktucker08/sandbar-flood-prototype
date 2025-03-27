import { Clock, CheckCircle2, XCircle, Calendar, CircleDot, CheckCircle } from "lucide-react";

export const STATUS_STYLES = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  expired: "bg-gray-100 text-gray-800",
  active: "bg-blue-100 text-blue-800",
  completed: "bg-purple-100 text-purple-800",
} as const;

export const STATUS_ICONS = {
  pending: Clock,
  approved: CheckCircle2,
  rejected: XCircle,
  expired: Calendar,
  active: CircleDot,
  completed: CheckCircle,
} as const;

export type Status = keyof typeof STATUS_STYLES; 