"use client";
import React from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/features/admin/PageHeader";
import DetailPageLayout from "@/components/features/admin/layouts/DetailPageLayout";
import QuoteActionButtons from "@/components/features/admin/QuoteDetails/ActionButtons";
import PersonalDetails from "@/components/features/admin/QuoteDetails/PersonalDetails";
import ContactInformation from "@/components/features/admin/QuoteDetails/ContactInformation";
import PolicyInformation from "@/components/features/admin/QuoteDetails/PolicyInformation";
import CustomerHistory from "@/components/features/admin/QuoteDetails/CustomerHistory";
import QuoteStatus from "@/components/features/admin/QuoteDetails/QuoteStatus";
import QuoteBreakdown from "@/components/features/admin/QuoteDetails/QuoteBreakdown";
import DatesSection from "@/components/features/admin/QuoteDetails/DatesSection";
import DocumentsSection from "@/components/features/admin/QuoteDetails/DocumentsSection";
import { DetailedQuote } from "@/types/admin";

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
  propertyType: "Single Family" as const,
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

  const handleStatusAction = (actionLabel: string) => {
    // Handle status-specific actions
    switch (actionLabel) {
      case "Approve Quote":
        console.log("Approving quote:", quoteId);
        break;
      case "Reject Quote":
        console.log("Rejecting quote:", quoteId);
        break;
      case "Request Changes":
        console.log("Requesting changes for quote:", quoteId);
        break;
      default:
        console.log("Unknown action:", actionLabel);
    }
  };

  const leftColumn = (
    <>
      <PersonalDetails data={quoteData} />
      <ContactInformation data={quoteData} />
      <PolicyInformation data={quoteData} />
      <CustomerHistory data={quoteData} />
    </>
  );

  const rightColumn = (
    <>
      <QuoteStatus data={quoteData} onStatusAction={handleStatusAction} />
      <QuoteBreakdown data={quoteData} />
      <DatesSection data={quoteData} />
      <DocumentsSection data={quoteData} />
    </>
  );

  return (
    <main className="admin-page-main">
      <PageHeader title="Quote Details" />
      <DetailPageLayout
        title="Quote Details"
        id={quoteId}
        backLink="/admin/dashboard/quotes"
        leftColumn={leftColumn}
        rightColumn={rightColumn}
        actionButtons={<QuoteActionButtons data={quoteData} onStatusAction={handleStatusAction} />}
      />
    </main>
  );
};

export default QuoteDetailsPage;
