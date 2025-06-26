import React from "react";
import QuoteTable from '@/components/features/quotes/QuoteTable';
import type { Quote } from '@/types/admin';
import { Button } from "@/components/common/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface DashboardSectionProps {
  title: string;
  className?: string;
  quotes?: Quote[];
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ title, className = '', quotes = [] }) => {
  const router = useRouter();
  const handleQuoteClick = (quote: Quote) => {
    if (quote.id) {
      router.push(`/quote/${quote.id}`);
    }
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
        <QuoteTable quotes={quotes} onQuoteClick={handleQuoteClick} />
      </div>
    </div>
  );
};

export default DashboardSection;