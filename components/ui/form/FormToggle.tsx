import React from "react";
import FormField from "./FormField";

interface ToggleOption {
  value: string;
  label: string;
}

interface FormToggleProps {
  label: string;
  options: ToggleOption[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
  description?: string;
}

const FormToggle: React.FC<FormToggleProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  required,
  className,
  description,
}) => {
  return (
    <FormField
      label={label}
      error={error}
      required={required}
      className={className}
    >
      <div className="flex gap-4">
        {options.map(({ value: optionValue, label: optionLabel }) => (
          <button
            key={optionValue}
            type="button"
            className={`flex-1 p-4 border rounded-lg transition-colors duration-200 ${
              value === optionValue
                ? "border-amber-300 bg-amber-50 text-amber-900"
                : "border-gray-200 hover:border-amber-200 text-gray-700"
            }`}
            onClick={() => onChange(optionValue)}
          >
            {optionLabel}
          </button>
        ))}
      </div>
      {description && (
        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      )}
    </FormField>
  );
};

export default FormToggle; 