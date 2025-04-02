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
  clientId: 1,
  firstName: "John",
  lastName: "Smith",
  email: "john.smith@email.com",
  phoneNumber: "(555) 123-4567",
  insuredType: "individual",
  address: "123 Main St",
  city: "Miami",
  state: "FL",
  zipCode: "33139",
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: 1,
  status: "active",
  policies: [],
  quotes: [],
  inspections: [],
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