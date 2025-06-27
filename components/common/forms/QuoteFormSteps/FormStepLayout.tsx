import React from 'react';
import {ProgressBar} from "@/components/features/quotes/ProgressBar";  
import NavigationButtons from "@/components/common/ui/navigation-buttons";

interface FormStepLayoutProps {
  children: React.ReactNode;
  title: string;
  progressSteps: Array<{
    label: string;
    sublabel: string;
    isActive: boolean;
  }>;
  onNext: () => void;
  onBack: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (index: number) => void;
}

const FormStepLayout: React.FC<FormStepLayoutProps> = ({
  children,
  title,
  progressSteps,
  onNext,
  onBack,
  nextLabel,
  nextDisabled,
  currentStep,
  completedSteps,
  onStepClick,
}) => {
  return (
    <div className="flex flex-col gap-6">
      {/* {title !== "Review Quote Details" && ( */}
        <ProgressBar 
          steps={progressSteps} 
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={onStepClick}
        />
      {/* )} */}
      
      <div className="card">
        <div className="max-w-2xl mx-auto">
          <h1 className="card-header text-center">
            {title}
          </h1>
          
          <div className="space-y-6">
            {children}
          </div>

          <NavigationButtons 
            onBack={onBack} 
            onNext={onNext}
            nextLabel={nextLabel}
            nextDisabled={nextDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default FormStepLayout; 