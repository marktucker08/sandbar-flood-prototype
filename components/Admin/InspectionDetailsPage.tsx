"use client";
import * as React from "react";
import { useParams } from "next/navigation";
import PropertyDetails from "./InspectionDetails/PropertyDetails";
import InspectionDetails from "./InspectionDetails/InspectionDetails";
import ContactInformation from "./InspectionDetails/ContactInformation";
import InspectionStatus from "./InspectionDetails/InspectionStatus";
import FindingsSection from "./InspectionDetails/FindingsSection";
import DocumentsSection from "./InspectionDetails/DocumentsSection";
import ActionButtons from "./InspectionDetails/ActionButtons";
import { PageHeader } from "./PageHeader";
import Link from "next/link";
import { DetailedInspection } from "@/types/admin";
import { ArrowLeft, Copy } from "lucide-react";

// This would typically come from an API call
const mockInspectionData: DetailedInspection = {
  id: "#INS-001",
  property: "123 Main St",
  client: "John Smith",
  status: "pending",
  inspector: "Jane Doe",
  date: "2024-03-20",
  time: "10:00 AM",
  // Property Details
  propertyType: "Single Family",
  floodZone: "AE",
  elevation: "8.5 ft",
  squareFootage: 2500,
  yearBuilt: 2015,
  // Inspection Details
  inspectionType: "Initial",
  notes: "Property appears to be in good condition overall. Some minor issues noted in the findings.",
  findings: [
    {
      id: "find-001",
      category: "Foundation",
      description: "Minor cracks in foundation wall",
      severity: "Low",
    },
    {
      id: "find-002",
      category: "Roof",
      description: "Missing shingles in corner",
      severity: "Medium",
    },
  ],
  // Contact Information
  clientEmail: "john.smith@email.com",
  clientPhone: "(555) 123-4567",
  propertyAddress: "123 Main St, Miami, FL 33139",
  // Documents
  documents: [
    {
      id: "doc-001",
      name: "Inspection Report",
      type: "PDF",
      uploadedDate: "2024-03-20",
    },
    {
      id: "doc-002",
      name: "Property Photos",
      type: "ZIP",
      uploadedDate: "2024-03-20",
    },
  ],
};

const InspectionDetailsPage: React.FC = () => {
  const params = useParams();
  const inspectionId = params.inspectionId as string;
  
  // In a real application, you would fetch the inspection data based on the ID
  // For now, we'll use the mock data
  const inspectionData = mockInspectionData;

  return (
    <main className="admin-page-main">
      <PageHeader title="Inspection Details" />
      <section className="admin-content-section">
        <div className="flex gap-2 items-center mb-6">
          <Link href="/admin/dashboard/inspections">
            <button className="admin-back-button">
              <ArrowLeft className="icon-md" />
              <span className="text-sm">Back</span>
            </button>
          </Link>
        </div>

        <div className="admin-quote-header">
          <h2 className="admin-quote-title">
            Inspection Details - {inspectionId}
          </h2>
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <Copy className="icon-md" />
          </button>
        </div>

        <div className="admin-quote-grid">
          <div className="admin-quote-column">
            <PropertyDetails data={inspectionData} />
            <ContactInformation data={inspectionData} />
            <InspectionDetails data={inspectionData} />
            <FindingsSection data={inspectionData} />
          </div>
          <div className="admin-quote-column">
            <InspectionStatus data={inspectionData} />
            <DocumentsSection data={inspectionData} />
          </div>
        </div>
        <ActionButtons data={inspectionData} />
      </section>
    </main>
  );
};

export default InspectionDetailsPage; 