"use client";
import React from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/Admin/PageHeader";
import DetailPageLayout from "@/components/Admin/layouts/DetailPageLayout";
import PolicyActionButtons from "@/components/Admin/PolicyDetails/ActionButtons";
import PersonalDetails from "@/components/Admin/PolicyDetails/PersonalDetails";
import ContactInformation from "@/components/Admin/PolicyDetails/ContactInformation";
import PolicyInformation from "@/components/Admin/PolicyDetails/PolicyInformation";
import CoverageDetails from "@/components/Admin/PolicyDetails/CoverageDetails";
import PolicyStatus from "@/components/Admin/PolicyDetails/PolicyStatus";
import PaymentInformation from "@/components/Admin/PolicyDetails/PaymentInformation";
import DatesSection from "@/components/Admin/PolicyDetails/DatesSection";
import DocumentsSection from "@/components/Admin/PolicyDetails/DocumentsSection";
import { DetailedPolicy } from "@/types/admin";

// This would typically come from an API call
const mockPolicyData: DetailedPolicy = {
  id: "#POL-001",
  clientName: "John Smith",
  type: "Residential",
  status: "active",
  premium: "$1,250.00",
  effectiveDate: "2024-03-15",
  expiryDate: "2025-03-15",
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
  // Coverage Details
  coverageAmount: "$250,000",
  buildingCoverage: "$150,000",
  contentsCoverage: "$100,000",
  deductible: "$1,000",
  // Payment Information
  paymentFrequency: "Monthly",
  nextPaymentDate: "2024-04-15",
  lastPaymentDate: "2024-03-15",
  lastPaymentAmount: "$1,250.00",
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

const PolicyDetailsPage: React.FC = () => {
  const params = useParams();
  const policyId = params.policyId as string;
  
  // In a real application, you would fetch the policy data based on the ID
  // For now, we'll use the mock data
  const policyData = mockPolicyData;

  const handleStatusAction = (actionLabel: string) => {
    // Handle status-specific actions
    switch (actionLabel) {
      case "Cancel Policy":
        console.log("Cancelling policy:", policyId);
        break;
      case "Renew Policy":
        console.log("Renewing policy:", policyId);
        break;
      case "Update Coverage":
        console.log("Updating coverage for policy:", policyId);
        break;
      default:
        console.log("Unknown action:", actionLabel);
    }
  };

  const leftColumn = (
    <>
      <PersonalDetails data={policyData} />
      <ContactInformation data={policyData} />
      <PolicyInformation data={policyData} />
      <CoverageDetails data={policyData} />
    </>
  );

  const rightColumn = (
    <>
      <PolicyStatus data={policyData} onStatusAction={handleStatusAction} />
      <PaymentInformation data={policyData} />
      <DatesSection data={policyData} />
      <DocumentsSection data={policyData} />
    </>
  );

  return (
    <main className="admin-page-main">
      <PageHeader title="Policy Details" />
      <DetailPageLayout
        title="Policy Details"
        id={policyId}
        backLink="/admin/dashboard/policies"
        leftColumn={leftColumn}
        rightColumn={rightColumn}
        actionButtons={<PolicyActionButtons data={policyData} onStatusAction={handleStatusAction} />}
      />
    </main>
  );
};

export default PolicyDetailsPage; 