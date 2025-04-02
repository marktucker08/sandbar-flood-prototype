import React from "react";
import { cn } from "@/lib/utils/utils";
import FormField from "./FormField";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  error?: string;
  required?: boolean;
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  error,
  required,
  options,
  value,
  onChange,
  className = "",
  placeholder,
  ...props
}) => {
  return (
    <FormField
      label={label}
      error={error}
      required={required}
      className={className}
    >
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full px-4 py-2.5 text-gray-900 bg-white/50 border border-gray-200 rounded-lg",
          "focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-transparent",
          "transition-all duration-300",
          error && "border-red-500",
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(({ value: optionValue, label: optionLabel }) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </FormField>
  );
};

export default FormSelect; 