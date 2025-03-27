import React from "react";
import { cn } from "@/lib/utils";
import FormField from "./FormField";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightElement?: React.ReactNode;
  prefix?: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  rightElement,
  prefix,
  className = "",
  required,
  ...props
}) => {
  return (
    <FormField
      label={label}
      error={error}
      required={required}
      className={className}
    >
      <div className="relative">
        {prefix && (
          <div className="absolute left-3 top-2/4 -translate-y-2/4 text-gray-500">
            {prefix}
          </div>
        )}
        <input
          className={cn(
            "w-full px-4 py-2.5 text-gray-900 bg-white/50 border border-gray-200 rounded-lg",
            "focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-transparent",
            "transition-all duration-300",
            error && "border-red-500",
            prefix && "pl-8",
            className
          )}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-4 top-2/4 -translate-y-2/4">
            {rightElement}
          </div>
        )}
      </div>
    </FormField>
  );
};

export default FormInput; 