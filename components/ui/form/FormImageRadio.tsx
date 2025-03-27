import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import FormField from "./FormField";

interface ImageRadioOption {
  value: string;
  label: string;
  image: string;
}

interface FormImageRadioProps {
  label?: string;
  error?: string;
  required?: boolean;
  name: string;
  options: ImageRadioOption[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  columns?: number;
}

const FormImageRadio: React.FC<FormImageRadioProps> = ({
  label,
  error,
  required,
  name,
  options,
  value,
  onChange,
  className = "",
  columns = 3,
}) => {
  return (
    <FormField
      label={label}
      error={error}
      required={required}
      className={className}
    >
      <div className={cn(
        "grid gap-6",
        `grid-cols-1 md:grid-cols-${columns}`
      )}>
        {options.map(({ value: optionValue, label: optionLabel, image }) => (
          <label
            key={optionValue}
            className={cn(
              "relative flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300",
              value === optionValue
                ? "border-amber-300 bg-amber-50"
                : "border-gray-200 hover:border-amber-200"
            )}
          >
            <input
              type="radio"
              name={name}
              value={optionValue}
              checked={value === optionValue}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
            />
            <div className="w-full aspect-square relative mb-4 rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={image}
                alt={optionLabel}
                fill
                className="object-contain p-2"
              />
            </div>
            <span className="text-sm font-medium text-center text-gray-900">
              {optionLabel}
            </span>
            {value === optionValue && (
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-amber-300" />
            )}
          </label>
        ))}
      </div>
    </FormField>
  );
};

export default FormImageRadio; 