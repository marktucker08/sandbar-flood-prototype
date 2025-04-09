import React from "react";
import FormField from "./FormField";

interface IconRadioOption {
  value: string;
  label: string;
  description?: string;
  icon: React.FC<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  isPopular?: boolean;
}

interface FormIconRadioGroupProps {
  label: string;
  name: string;
  options: IconRadioOption[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  className?: string;
  description?: string;
  gridCols?: number;
}

const FormIconRadioGroup: React.FC<FormIconRadioGroupProps> = ({
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
}) => {
  return (
    <div className={className}>
      <FormField
        label={label}
        error={error}
        required={required}
      >
        <div className={`grid grid-cols-1 md:grid-cols-${gridCols} gap-4`}>
          {options.map((option) => (
            <label
              key={option.value}
              className={`relative flex p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                value === option.value
                  ? "border-amber-300 bg-amber-50"
                  : "border-gray-200 hover:border-amber-200"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="sr-only"
              />
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {React.createElement(option.icon, {
                    className: `h-6 w-6 ${value === option.value ? 'text-amber-500' : 'text-gray-400'}`,
                    "aria-hidden": "true",
                  })}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium text-gray-900">{option.label}</span>
                    {option.isPopular && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                        Most Popular
                      </span>
                    )}
                  </div>
                  {option.description && (
                    <p className="mt-1 text-sm text-gray-500">{option.description}</p>
                  )}
                </div>
              </div>
              {value === option.value && (
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

export default FormIconRadioGroup; 