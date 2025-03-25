'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const QuoteProcessingPage = () => {
  const router = useRouter();
  const [status, setStatus] = React.useState('processing');
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    // Simulate quote processing steps
    const steps = [
      { message: 'Validating property information...', duration: 2000 },
      { message: 'Calculating flood risk...', duration: 3000 },
      { message: 'Determining coverage options...', duration: 2000 },
      { message: 'Generating premium quotes...', duration: 2500 },
      { message: 'Preparing your quotes...', duration: 1500 },
    ];

    let currentStep = 0;

    const processStep = () => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        setStatus(step.message);
        setProgress((currentStep + 1) * (100 / steps.length));
        
        setTimeout(() => {
          currentStep++;
          processStep();
        }, step.duration);
      } else {
        // Redirect to quote results page after processing
        setTimeout(() => {
          router.push('/quote/results');
        }, 1000);
      }
    };

    processStep();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-300"></div>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Fetching Quotes
          </h1>
          <p className="text-gray-600">
            Please wait while we request your flood insurance quotes...
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-amber-600 bg-amber-100">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-amber-600">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-amber-100">
              <div
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-300 transition-all duration-500"
              ></div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 text-center">
              {status}
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              This process typically takes 30-60 seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteProcessingPage; 