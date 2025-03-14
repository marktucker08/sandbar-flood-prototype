import * as React from "react";

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
      <button
        onClick={onBack}
        className="flex gap-2 items-center px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-gray-100 border border-gray-200 text-gray-700"
      >
        <i className="ti ti-arrow-left" />
        Back
      </button>
      <button
        onClick={onNext}
        className= "flex gap-2 items-center px-6 py-2.5 text-sm font-medium bg-amber-200 rounded-lg transition-all duration-300 hover:bg-amber-300 text-gray-900 min-w-[120px] justify-center"
      >
        <span>{nextLabel}</span>
        {nextLabel === "Next" && (
          <i className="ti ti-arrow-right" />
        )}
      </button>
    </div>
  );
};

export default NavigationButtons;

