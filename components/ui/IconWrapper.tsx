import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconWrapperProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

export const IconWrapper: React.FC<IconWrapperProps> = ({
  icon: Icon,
  size = "md",
  className,
}) => {
  return (
    <Icon className={cn(sizeMap[size], className)} />
  );
}; 