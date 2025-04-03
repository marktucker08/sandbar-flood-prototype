"use client";
import * as React from "react";
import { PageHeader } from "@/components/features/admin/PageHeader";
import DetailPageLayout from "@/components/features/admin/layouts/DetailPageLayout";
import { DetailedClient } from "@/types/admin";
import PersonalDetails from "@/components/features/admin/ClientDetails/PersonalDetails";
import ContactInformation from "@/components/features/admin/ClientDetails/ContactInformation";
import ClientStatus from "@/components/features/admin/ClientDetails/ClientStatus";
import AssociatedRecords from "@/components/features/admin/ClientDetails/AssociatedRecords";
import ActionButtons from "@/components/features/admin/ClientDetails/ActionButtons";

interface ClientDetailsPageProps {
  clientId: string;
  clientData: DetailedClient;
}

const ClientDetailsPage: React.FC<ClientDetailsPageProps> = ({ clientId, clientData }) => {
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