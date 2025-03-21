import React from 'react';
import { ProgressBar } from '../ProgressBar';
import NavigationButtons from '../NavigationButtons';

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
      
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
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