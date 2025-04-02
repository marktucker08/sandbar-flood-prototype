import React from "react";
import FormField from "./FormField";

interface FormRadioProps {
  label?: string;
  error?: string;
  required?: boolean;
  name: string;
  value?: boolean | null;
  onChange: (value: boolean) => void;
  className?: string;
  description?: string;
}

const FormRadio: React.FC<FormRadioProps> = ({
  label,
  error,
  required,
  name,
  value,
  onChange,
  className = "",
  description,
}) => {
  return (
    <FormField
      label={label}
      error={error}
      required={required}
      className={className}
    >
      {description && (
        <p className="text-sm text-gray-600 mb-3">
          {description}
        </p>
      )}
      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            checked={value === true}
            onChange={() => onChange(true)}
            className="w-4 h-4 text-amber-200 focus:ring-amber-200 border-gray-300"
          />
          <span className="text-sm text-gray-900">Yes</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            checked={value === false}
            onChange={() => onChange(false)}
            className="w-4 h-4 text-amber-200 focus:ring-amber-200 border-gray-300"
          />
          <span className="text-sm text-gray-900">No</span>
        </label>
      </div>
    </FormField>
  );
};

export default FormRadio; 