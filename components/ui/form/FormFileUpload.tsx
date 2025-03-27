import React from "react";
import { cn } from "@/lib/utils";
import FormField from "./FormField";

interface FormFileUploadProps {
  label?: string;
  error?: string;
  required?: boolean;
  name: string;
  accept?: string;
  onChange: (file: File | null) => void;
  className?: string;
  description?: string;
  maxSize?: number; // in MB
}

const FormFileUpload: React.FC<FormFileUploadProps> = ({
  label,
  error,
  required,
  name,
  accept = "*",
  onChange,
  className = "",
  description,
  maxSize = 10,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size must be less than ${maxSize}MB`);
        return;
      }
      onChange(file);
    } else {
      onChange(null);
    }
  };

  return (
    <FormField
      label={label}
      error={error}
      required={required}
      className={cn("bg-blue-50 p-6 rounded-lg", className)}
    >
      {description && (
        <p className="text-sm text-blue-700 mb-4">
          {description}
        </p>
      )}
      <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-amber-200 focus:outline-none">
        <span className="flex items-center space-x-2">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
        </span>
        <input
          type="file"
          name={name}
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
        />
      </label>
    </FormField>
  );
};

export default FormFileUpload; 