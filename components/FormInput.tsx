import React from "react";

interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  error?: string;
  rightElement?: React.ReactNode;
  prefix?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  rightElement,
  prefix,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <div className="absolute left-3 top-2/4 -translate-y-2/4 text-gray-500">
            {prefix}
          </div>
        )}
        <input
          className={`w-full px-4 py-2.5 text-gray-900 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-transparent transition-all duration-300 ${
            error ? "border-red-500" : ""
          } ${prefix ? "pl-8" : ""} ${className}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-4 top-2/4 -translate-y-2/4">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;

