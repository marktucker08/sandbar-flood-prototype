import * as React from "react";

interface ProgressStep {
  label: string;
  sublabel: string;
  isActive: boolean;
}

interface ProgressBarProps {
  steps: ProgressStep[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ steps }) => {
  return (
    <section className="flex gap-4 items-start p-6 w-full bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col flex-1 gap-3 relative">
          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className="absolute top-[22px] left-[calc(50%+16px)] w-[calc(100%-32px)] h-[2px] bg-gray-200">
              <div 
                className={`h-full bg-amber-300 transition-all duration-300 ${
                  step.isActive ? 'w-full' : '0'
                }`}
              />
            </div>
          )}
          
          {/* Step Content */}
          <div className="flex flex-col items-center gap-2 relative z-10">
            {/* Circle Indicator */}
            <div 
              className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                step.isActive 
                  ? 'bg-amber-200 border-amber-300' 
                  : 'bg-gray-100 border-gray-200'
              }`}
            >
              <div 
                className={`text-sm font-semibold ${
                  step.isActive ? 'text-gray-800' : 'text-gray-400'
                }`}
              >
                {index + 1}
              </div>
            </div>
            
            {/* Labels */}
            <div className="text-center">
              <p
                className={`text-sm font-semibold mb-0.5 transition-colors duration-300 ${
                  step.isActive ? 'text-gray-800' : 'text-gray-400'
                }`}
              >
                {step.label}
              </p>
              <p
                className={`text-xs transition-colors duration-300 ${
                  step.isActive ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                {step.sublabel}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
