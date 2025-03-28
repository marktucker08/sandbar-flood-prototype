import React from "react";
import QuoteTable from './QuoteTable';
import type { Quote } from './QuoteTable';
import { Status } from '@/types/admin';
import { Button } from "@/components/ui/button";

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
      status: 'pending' as Status,
    },
    {
      id: '2',
      insuredName: 'Jane Doe',
      propertyAddress: '456 Oak Ave, Somewhere, USA',
      dateSubmitted: '2024-03-14',
      premium: '2,100',
      status: 'pending' as Status,
    },
    {
      id: '3',
      insuredName: 'Jacob Smith',
      propertyAddress: '124 Main St, Anytown, USA',
      dateSubmitted: '2024-03-16',
      premium: '1,100',
      status: 'approved' as Status,
    },
  ];

  const handleQuoteClick = (quote: Quote) => {
    console.log('Quote clicked:', quote);
    // Handle quote click - e.g., navigate to quote details page
  };

  return (
    <div className={`card backdrop-blur-sm ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="card-header">{title}</h2>
        {title === "Quotes Pending Approval" && (
          <Button className="btn-secondary">
            View All
          </Button>
        )}
      </div>
      <div className="overflow-x-auto">
        <QuoteTable quotes={sampleQuotes} onQuoteClick={handleQuoteClick} />
      </div>
    </div>
  );
};

export default DashboardSection;
