import * as React from "react";
import { Combobox } from "@headlessui/react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import FormField from "./FormField";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  label?: string;
  error?: string;
  required?: boolean;
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  error,
  required,
  options,
  value,
  onChange,
  className = "",
  placeholder,
}) => {
  const [query, setQuery] = React.useState("");
  const selectedOption = options.find((o) => o.value === value) || null;
  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <FormField label={label} error={error} required={required} className={className}>
      <Combobox value={selectedOption} onChange={(opt) => onChange(opt.value)}>
        <div className="relative">
          <Combobox.Input
            className={cn(
              "w-full px-4 py-2.5 text-gray-900 bg-white/50 border border-gray-200 rounded-lg",
              "focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-transparent transition-all duration-300",
              error && "border-red-500"
            )}
            displayValue={(opt: unknown) => {
              if (!opt || typeof opt !== 'object' || !('label' in opt)) return "";
              return (opt as SelectOption).label;
            }}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder || "Select an option"}
            autoComplete="off"
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </Combobox.Button>
          <Combobox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
            {filteredOptions.length === 0 && query !== "" ? (
              <div className="px-4 py-2 text-gray-500">No options found</div>
            ) : (
              filteredOptions.map((option) => (
                <Combobox.Option
                  key={option.value}
                  value={option}
                  className={({ active, selected }) =>
                    cn(
                      "flex items-center px-4 py-2 cursor-pointer select-none text-gray-900",
                      active ? "bg-amber-50" : "",
                      selected ? "bg-amber-100" : ""
                    )
                  }
                >
                  <span className="flex-1">{option.label}</span>
                  {value === option.value && (
                    <Check className="w-4 h-4 text-amber-400 ml-2" />
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </div>
      </Combobox>
    </FormField>
  );
};

export default FormSelect; 