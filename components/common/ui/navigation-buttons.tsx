import * as React from "react"
import { Button } from "./button"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface NavigationButtonsProps {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onBack,
  onNext,
  nextLabel = "Next",
  nextDisabled = false,
}) => {
  return (
    <div className="flex gap-4 mt-8 justify-end max-sm:flex-col">
      <Button
        onClick={onBack}
        variant="ghost"
        className="gap-2"
      >
        <ArrowLeft className="icon-md" />
        Back
      </Button>
      <Button
        onClick={onNext}
        className="gap-2 min-w-[120px]"
        disabled={nextDisabled}
      >
        {nextDisabled && (
          <svg className="animate-spin h-5 w-5 text-gray-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        )}
        <span>{nextLabel}</span>
        {nextLabel === "Next" && (
          <ArrowRight className="icon-md" />
        )}
      </Button>
    </div>
  );
};

export default NavigationButtons; 