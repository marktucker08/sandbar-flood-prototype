import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  rightElement?: React.ReactNode;
}

const AuthFormInput: React.FC<FormInputProps> = ({
  label,
  rightElement,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full px-4 py-2.5 text-gray-900 bg-white/50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-transparent transition-all duration-300 ${className}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-4 top-2/4 -translate-y-2/4">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthFormInput;

