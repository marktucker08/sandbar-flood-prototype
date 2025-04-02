"use client";
import * as React from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/features/admin/Admin/PageHeader";
import DetailPageLayout from "@/components/features/admin/Admin/layouts/DetailPageLayout";
import { DetailedClient } from "@/types/admin";
import PersonalDetails from "@/components/features/admin/Admin/ClientDetails/PersonalDetails";
import ContactInformation from "@/components/features/admin/Admin/ClientDetails/ContactInformation";
import ClientStatus from "@/components/features/admin/Admin/ClientDetails/ClientStatus";
import AssociatedRecords from "@/components/features/admin/Admin/ClientDetails/AssociatedRecords";
import ActionButtons from "@/components/features/admin/Admin/ClientDetails/ActionButtons";

// This would typically come from an API call
const mockClientData: DetailedClient = {
  id: "CLT-001",
  name: "John Smith",
  type: "Individual",
  status: "active",
  email: "john.smith@email.com",
  phone: "(555) 123-4567",
  lastContact: "2024-03-15",
  // Additional client details
  dateOfBirth: "1980-05-15",
  ssn: "***-**-1234",
  address: "123 Main St",
  city: "Miami",
  state: "FL",
  zipCode: "33139",
  // Associated records
  policies: [
    {
      id: "POL-001",
      clientName: "John Smith",
      type: "Residential",
      status: "active",
      premium: "$1,250.00",
      effectiveDate: "2024-01-01",
      expiryDate: "2025-01-01",
    },
    {
      id: "POL-002",
      clientName: "John Smith",
      type: "Commercial",
      status: "active",
      premium: "$2,500.00",
      effectiveDate: "2024-02-01",
      expiryDate: "2025-02-01",
    },
  ],
  quotes: [
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
      clientName: "John Smith",
      property: "456 Oak Ave",
      status: "approved",
      premium: "$2,100.00",
      createdDate: "2024-03-10",
      expiryDate: "2024-04-10",
    },
  ],
  inspections: [
    {
      id: "INS-001",
      client: "John Smith",
      property: "123 Main St",
      status: "completed",
      inspector: "Jane Doe",
      date: "2024-03-01",
      time: "10:00 AM",
    },
    {
      id: "INS-002",
      client: "John Smith",
      property: "456 Oak Ave",
      status: "pending",
      inspector: "Mike Johnson",
      date: "2024-03-20",
      time: "2:00 PM",
    },
  ],
};

const ClientDetailsPage: React.FC = () => {
  const params = useParams();
  const clientId = params.clientId as string;
  
  // In a real application, you would fetch the client data based on the ID
  // For now, we'll use the mock data
  const clientData = mockClientData;

  const leftColumn = (
    <>
      <PersonalDetails data={clientData} />
      <ContactInformation data={clientData} />
    </>
  );

  const rightColumn = (
    <>
      <ClientStatus data={clientData} />
      <AssociatedRecords data={clientData} />
    </>
  );

  return (
    <main className="admin-page-main">
      <PageHeader title="Client Details" />
      <DetailPageLayout
        title="Client Details"
        id={clientId}
        backLink="/admin/dashboard/clients"
        leftColumn={leftColumn}
        rightColumn={rightColumn}
        actionButtons={<ActionButtons data={clientData} />}
      />
    </main>
  );
};

export default ClientDetailsPage; 