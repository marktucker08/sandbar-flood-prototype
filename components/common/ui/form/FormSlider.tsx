"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

interface FormSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  error?: string;
  required?: boolean;
  prefix?: string;
  suffix?: string;
}

const FormSlider = React.forwardRef<HTMLDivElement, FormSliderProps>(
  ({ label, value, onChange, min = 0, max = 1000000, step = 10000, error, required, prefix = "$", suffix = "" }, ref) => {
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <span className="text-sm text-gray-500">
            {prefix}
            {value.toLocaleString()}
            {suffix}
          </span>
        </div>
        <SliderPrimitive.Root
          className={cn(
            "relative flex w-full touch-none select-none items-center",
            "h-5"
          )}
          value={[value]}
          onValueChange={([newValue]) => onChange(newValue)}
          max={max}
          min={min}
          step={step}
        >
          <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-200">
            <SliderPrimitive.Range className="absolute h-full bg-amber-200" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            className={cn(
              "block h-4 w-4 rounded-full border border-gray-200 bg-white shadow transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2",
              "disabled:pointer-events-none disabled:opacity-50"
            )}
          />
        </SliderPrimitive.Root>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

FormSlider.displayName = "FormSlider";

export { FormSlider }; 