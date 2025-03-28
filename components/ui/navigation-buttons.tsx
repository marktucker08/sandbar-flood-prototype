import * as React from "react"
import { Button } from "./button"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface NavigationButtonsProps {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onBack,
  onNext,
  nextLabel = "Next",
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
      >
        <span>{nextLabel}</span>
        {nextLabel === "Next" && (
          <ArrowRight className="icon-md" />
        )}
      </Button>
    </div>
  );
};

export default NavigationButtons; 