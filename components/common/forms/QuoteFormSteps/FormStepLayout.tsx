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
}

const FormStepLayout: React.FC<FormStepLayoutProps> = ({
  children,
  title,
  progressSteps,
  onNext,
  onBack,
  nextLabel
}) => {
  return (
    <div className="flex flex-col gap-6">
      <ProgressBar steps={progressSteps} />
      
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
          />
        </div>
      </div>
    </div>
  );
};

export default FormStepLayout; 