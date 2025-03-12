import React from "react";
import QuoteTable from './QuoteTable';
import type { Quote } from './QuoteTable';

interface DashboardSectionProps {
  title: string;
  className?: string;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ title, className = '' }) => {
  // This would typically come from an API or database
  const sampleQuotes = [
    {
      id: '1',
      insuredName: 'John Smith',
      propertyAddress: '123 Main St, Anytown, USA',
      dateSubmitted: '2024-03-15',
      premium: '1,250',
      status: 'pending' as const,
    },
    {
      id: '2',
      insuredName: 'Jane Doe',
      propertyAddress: '456 Oak Ave, Somewhere, USA',
      dateSubmitted: '2024-03-14',
      premium: '2,100',
      status: 'pending' as const,
    },
  ];

  const handleQuoteClick = (quote: Quote) => {
    console.log('Quote clicked:', quote);
    // Handle quote click - e.g., navigate to quote details page
  };

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {title === "Quotes Pending Approval" && (
          <button className="px-4 py-2 bg-amber-200 text-gray-900 rounded-lg hover:bg-amber-300 transition-colors font-medium">
            View All
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <QuoteTable quotes={sampleQuotes} onQuoteClick={handleQuoteClick} />
      </div>
    </div>
  );
};

export default DashboardSection;
