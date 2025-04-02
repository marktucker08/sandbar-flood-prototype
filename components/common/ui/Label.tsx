import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { IconWrapper } from "./IconWrapper";

interface LabelProps {
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  icon,
  children,
  className,
  required,
}) => {
  return (
    <label className={cn(
      "text-sm font-medium text-gray-500 flex items-center gap-1",
      className
    )}>
      {icon && <IconWrapper icon={icon} size="sm" />}
      {children}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
}; 