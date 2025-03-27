import React from "react";
import FormField from "./FormField";

interface RadioOption {
  value: string;
  label: string;
}

interface FormRadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
  description?: string;
  gridCols?: number;
  layout?: "horizontal" | "grid";
}

const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  error,
  required,
  className,
  description,
  gridCols = 2,
  layout = "grid",
}) => {
  return (
    <div className={className}>
      <FormField
        label={label}
        error={error}
        required={required}
      >
        <div className={layout === "horizontal" ? "flex gap-3" : `grid grid-cols-${gridCols} md:grid-cols-${gridCols * 2} gap-3`}>
          {options.map(({ value: optionValue, label: optionLabel }) => (
            <label
              key={optionValue}
              className={`relative flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                value === optionValue
                  ? "border-amber-300 bg-amber-50"
                  : "border-gray-200 hover:border-amber-200"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={optionValue}
                checked={value === optionValue}
                onChange={(e) => onChange(e.target.value)}
                className="sr-only"
              />
              <span className="text-sm font-medium text-gray-900">
                {optionLabel}
              </span>
              {value === optionValue && (
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-amber-300" />
              )}
            </label>
          ))}
        </div>
      </FormField>
      {description && (
        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
};

export default FormRadioGroup; 