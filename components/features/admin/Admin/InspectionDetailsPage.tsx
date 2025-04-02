"use client";
import React from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/features/admin/Admin/PageHeader";
import DetailPageLayout from "@/components/features/admin/Admin/layouts/DetailPageLayout";
import InspectionActionButtons from "@/components/features/admin/Admin/InspectionDetails/ActionButtons";
import PropertyDetails from "@/components/features/admin/Admin/InspectionDetails/PropertyDetails";
import ContactInformation from "@/components/features/admin/Admin/InspectionDetails/ContactInformation";
import InspectionDetails from "@/components/features/admin/Admin/InspectionDetails/InspectionDetails";
import FindingsSection from "@/components/features/admin/Admin/InspectionDetails/FindingsSection";
import InspectionStatus from "@/components/features/admin/Admin/InspectionDetails/InspectionStatus";
import DocumentsSection from "@/components/features/admin/Admin/InspectionDetails/DocumentsSection";
import { DetailedInspection } from "@/types/admin";

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
  propertyType: "Single Family" as const,
  floodZone: "AE",
  elevation: "8.5 ft",
  squareFootage: 2500,
  yearBuilt: 2015,
  // Inspection Details
  inspectionType: "Initial",
  notes: "Please ensure all flood protection measures are in place.",
  // Findings
  findings: [
    {
      id: "find-001",
      category: "Flood Protection",
      description: "All flood vents are properly installed and functioning.",
      severity: "Low",
    },
    {
      id: "find-002",
      category: "Elevation",
      description: "Property meets minimum elevation requirements.",
      severity: "Low",
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

const InspectionDetailsPage: React.FC = () => {
  const params = useParams();
  const inspectionId = params.inspectionId as string;
  
  // In a real application, you would fetch the inspection data based on the ID
  // For now, we'll use the mock data
  const inspectionData = mockInspectionData;

  const handleStatusAction = (actionLabel: string) => {
    // Handle status-specific actions
    switch (actionLabel) {
      case "Approve Inspection":
        console.log("Approving inspection:", inspectionId);
        break;
      case "Reject Inspection":
        console.log("Rejecting inspection:", inspectionId);
        break;
      case "Schedule Follow-up":
        console.log("Scheduling follow-up for inspection:", inspectionId);
        break;
      case "Schedule New Inspection":
        console.log("Scheduling new inspection:", inspectionId);
        break;
      case "Reschedule Inspection":
        console.log("Rescheduling inspection:", inspectionId);
        break;
      default:
        console.log("Unknown action:", actionLabel);
    }
  };

  const leftColumn = (
    <>
      <PropertyDetails data={inspectionData} />
      <ContactInformation data={inspectionData} />
      <InspectionDetails data={inspectionData} />
      <FindingsSection data={inspectionData} />
    </>
  );

  const rightColumn = (
    <>
      <InspectionStatus data={inspectionData} onStatusAction={handleStatusAction} />
      <DocumentsSection data={inspectionData} />
    </>
  );

  return (
    <main className="admin-page-main">
      <PageHeader title="Inspection Details" />
      <DetailPageLayout
        title="Inspection Details"
        id={inspectionId}
        backLink="/admin/dashboard/inspections"
        leftColumn={leftColumn}
        rightColumn={rightColumn}
        actionButtons={<InspectionActionButtons data={inspectionData} onStatusAction={handleStatusAction} />}
      />
    </main>
  );
};

export default InspectionDetailsPage; 