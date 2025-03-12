import React from "react";

interface StatusBadgeProps {
  status: "pending" | "approved" | "rejected" | "expired";
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case "approved":
        return "bg-green-600 text-white";
      case "rejected":
        return "bg-red-600 text-white";
      case "expired":
        return "bg-orange-500 text-white";
      case "pending":
      default:
        return "bg-sky-900 text-white";
    }
  };

  const getStatusLabel = () => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div
      className={`inline-flex justify-center items-center px-2 py-0.5 text-xs font-bold ${getStatusStyles()} rounded-[99px] w-20`}
      role="status"
    >
      {getStatusLabel()}
    </div>
  );
};
