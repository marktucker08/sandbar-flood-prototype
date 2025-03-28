"use client";
import * as React from "react";
import { useParams } from "next/navigation";
import PersonalDetails from "./PolicyDetails/PersonalDetails";
import ContactInformation from "./PolicyDetails/ContactInformation";
import PolicyInformation from "./PolicyDetails/PolicyInformation";
import CoverageDetails from "./PolicyDetails/CoverageDetails";
import PaymentInformation from "./PolicyDetails/PaymentInformation";
import PolicyStatus from "./PolicyDetails/PolicyStatus";
import DatesSection from "./PolicyDetails/DatesSection";
import DocumentsSection from "./PolicyDetails/DocumentsSection";
import ActionButtons from "./PolicyDetails/ActionButtons";
import { PageHeader } from "./PageHeader";
import Link from "next/link";
import { DetailedPolicy } from "@/types/admin";
import { ArrowLeft, Copy } from "lucide-react";

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
  propertyType: "Single Family",
  floodZone: "AE",
  elevation: "8.5 ft",
  squareFootage: 2500,
  yearBuilt: 2015,
  // Coverage Details
  coverageAmount: "$250,000",
  deductible: "$1,000",
  contentsCoverage: "$100,000",
  buildingCoverage: "$150,000",
  // Payment Information
  paymentFrequency: "Monthly",
  nextPaymentDate: "2024-04-15",
  lastPaymentDate: "2024-03-15",
  lastPaymentAmount: "$1,250.00",
  // Documents
  documents: [
    {
      id: "doc-001",
      name: "Policy Declaration",
      type: "PDF",
      uploadedDate: "2024-03-15",
    },
    {
      id: "doc-002",
      name: "Property Survey",
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

  return (
    <main className="admin-page-main">
      <PageHeader title="Policy Details" />
      <section className="admin-content-section">
        <div className="flex gap-2 items-center mb-6">
          <Link href="/admin/dashboard/policies">
            <button className="admin-back-button">
              <ArrowLeft className="icon-sm" />
              <span className="text-sm">Back</span>
            </button>
          </Link>
        </div>

        <div className="admin-quote-header">
          <h2 className="admin-quote-title">
            Policy Details - {policyId}
          </h2>
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <Copy className="icon-md" />
          </button>
        </div>

        <div className="admin-quote-grid">
          <div className="admin-quote-column">
            <PersonalDetails data={policyData} />
            <ContactInformation data={policyData} />
            <PolicyInformation data={policyData} />
            <CoverageDetails data={policyData} />
          </div>
          <div className="admin-quote-column">
            <PolicyStatus data={policyData} />
            <PaymentInformation data={policyData} />
            <DatesSection data={policyData} />
            <DocumentsSection data={policyData} />
          </div>
        </div>
        <ActionButtons data={policyData} />
      </section>
    </main>
  );
};

export default PolicyDetailsPage; 