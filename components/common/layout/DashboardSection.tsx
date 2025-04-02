import React from "react";
import QuoteTable from '@/components/features/quotes/QuoteTable';
import type { Quote } from '@/types/admin';
import { Button } from "@/components/common/ui/button";
import Link from "next/link";

interface DashboardSectionProps {
  title: string;
  className?: string;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ title, className = '' }) => {
  // This would typically come from an API or database
  const sampleQuotes: Quote[] = [
    {
      id: "QOT-001",
      clientName: "John Smith",
      property: "123 Main St",
      status: "pending",
      premium: "$1,250.00",
      createdDate: "2024-03-15",
      expiryDate: "2024-04-15",
    },
    {
      id: "QOT-002",
      clientName: "Jane Doe",
      property: "456 Oak Ave",
      status: "pending",
      premium: "$2,100.00",
      createdDate: "2024-03-14",
      expiryDate: "2024-04-14",
    },
    {
      id: "QOT-003",
      clientName: "Jacob Smith",
      property: "124 Main St",
      status: "approved",
      premium: "$1,100.00",
      createdDate: "2024-03-16",
      expiryDate: "2024-04-16",
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
          <Link href="/admin/dashboard/quotes">
            <Button className="btn-secondary">
              View All
            </Button>
          </Link>
        )}
      </div>
      <div className="overflow-x-auto">
        <QuoteTable quotes={sampleQuotes} onQuoteClick={handleQuoteClick} />
      </div>
    </div>
  );
};

export default DashboardSection;
