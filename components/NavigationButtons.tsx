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
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.4754 3.71209C13.8415 4.0782 13.8415 4.6718 13.4754 5.03791L8.51333 10L13.4754 14.9621C13.8415 15.3282 13.8415 15.9218 13.4754 16.2879C13.1093 16.654 12.5157 16.654 12.1496 16.2879L6.52459 10.6629C6.15847 10.2968 6.15847 9.7032 6.52459 9.33709L12.1496 3.71209C12.5157 3.34597 13.1093 3.34597 13.4754 3.71209Z"
            fill="currentColor"
          />
        </svg>
        Back
      </button>
      <button
        onClick={onNext}
        className="flex gap-2 items-center px-6 py-2.5 text-sm font-medium bg-amber-200 rounded-lg transition-all duration-300 hover:bg-amber-300 text-gray-900 min-w-[120px] justify-center"
      >
        <span>{nextLabel}</span>
        {nextLabel === "Next" && (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"  
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.52459 3.71209C6.8907 3.34597 7.4843 3.34597 7.85041 3.71209L13.4754 9.33709C13.8415 9.7032 13.8415 10.2968 13.4754 10.6629L7.85041 16.2879C7.4843 16.654 6.8907 16.654 6.52459 16.2879C6.15847 15.9218 6.15847 15.3282 6.52459 14.9621L11.4867 10L6.52459 5.03791C6.15847 4.6718 6.15847 4.0782 6.52459 3.71209Z"
            fill="currentColor"
          />
        </svg>)}
      </button>
    </div>
  );
};

export default NavigationButtons;

