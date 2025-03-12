import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        className={`w-full px-4 py-2.5 text-gray-900 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-transparent transition-all duration-300 ${
          error ? "border-red-500" : ""
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;

