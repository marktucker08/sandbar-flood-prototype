"use client";
import * as React from "react";
import { useParams } from "next/navigation";
import PersonalDetails from "./QuoteDetails/PersonalDetails";
import ContactInformation from "./QuoteDetails/ContactInformation";
import PolicyInformation from "./QuoteDetails/PolicyInformation";
import CustomerHistory from "./QuoteDetails/CustomerHistory";
import QuoteStatus from "./QuoteDetails/QuoteStatus";
import QuoteBreakdown from "./QuoteDetails/QuoteBreakdown";
import DatesSection from "./QuoteDetails/DatesSection";
import DocumentsSection from "./QuoteDetails/DocumentsSection";
import ActionButtons from "./QuoteDetails/ActionButtons";
import { PageHeader } from "./PageHeader";
import Link from "next/link";
import { DetailedQuote } from "@/types/admin";
import { ArrowLeft, Copy } from "lucide-react";

// This would typically come from an API call
const mockQuoteData: DetailedQuote = {
  id: "#QOT-001",
  clientName: "John Smith",
  property: "123 Main St",
  status: "pending",
  premium: "$1,250.00",
  createdDate: "2024-03-15",
  expiryDate: "2024-04-15",
  // Personal Details
  firstName: "John",
  lastName: "Smith",
  dateOfBirth: "1980-05-15",
  ssn: "***-**-1234",
  // Contact Information
  email: "john.smith@email.com",
  phone: "(555) 123-4567",
  address: "123 Main St",
  city: "Miami",
  state: "FL",
  zipCode: "33139",
  // Policy Information
  propertyType: "Single Family",
  floodZone: "AE",
  elevation: "8.5 ft",
  squareFootage: 2500,
  yearBuilt: 2015,
  // Customer History
  previousClaims: 1,
  lastClaimDate: "2022-08-15",
  lastClaimAmount: "$15,000",
  // Quote Breakdown
  baseRate: "$1,000.00",
  floodZoneFactor: "$150.00",
  elevationFactor: "$50.00",
  deductibleFactor: "$50.00",
  totalPremium: "$1,250.00",
  // Documents
  documents: [
    {
      id: "doc-001",
      name: "Property Survey",
      type: "PDF",
      uploadedDate: "2024-03-15",
    },
    {
      id: "doc-002",
      name: "Elevation Certificate",
      type: "PDF",
      uploadedDate: "2024-03-15",
    },
  ],
};

const QuoteDetailsPage: React.FC = () => {
  const params = useParams();
  const quoteId = params.quoteId as string;
  
  // In a real application, you would fetch the quote data based on the ID
  // For now, we'll use the mock data
  const quoteData = mockQuoteData;

  return (
    <main className="admin-page-main">
      <PageHeader title="Quote Details" />
      <section className="admin-content-section">
        <div className="flex gap-2 items-center mb-6">
          <Link href="/admin/dashboard/quotes">
            <button className="admin-back-button">
              <ArrowLeft className="icon-md" />
              <span className="text-sm">Back</span>
            </button>
          </Link>
        </div>

        <div className="admin-quote-header">
          <h2 className="admin-quote-title">
            Quote Details - {quoteId}
          </h2>
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <Copy className="icon-md" />
          </button>
        </div>

        <div className="admin-quote-grid">
          <div className="admin-quote-column">
            <PersonalDetails data={quoteData} />
            <ContactInformation data={quoteData} />
            <PolicyInformation data={quoteData} />
            <CustomerHistory data={quoteData} />
          </div>
          <div className="admin-quote-column">
            <QuoteStatus data={quoteData} />
            <QuoteBreakdown data={quoteData} />
            <DatesSection data={quoteData} />
            <DocumentsSection data={quoteData} />
          </div>
        </div>
        <ActionButtons data={quoteData} />
      </section>
    </main>
  );
};

export default QuoteDetailsPage;
