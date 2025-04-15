"use client";
import * as React from "react";
import { useParams } from "next/navigation";
import { DetailedClient } from "@/types/admin";
import ClientDetailsPage from "@/components/features/admin/ClientDetailsPage";

// This would typically come from an API call
const mockClientData: DetailedClient = {
  clientId: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phoneNumber: "(555) 123-4567",
  insuredType: "individual",
  address: "123 Main St",
  city: "Anytown",
  state: "CA",
  zipCode: "12345",
  createdAt: new Date(),
  updatedAt: new Date(),
  createdBy: 1,
  status: "active",
  policies: [],
  quotes: [],
};

const Page: React.FC = () => {
  const params = useParams();
  const clientId = params.clientId as string;
  
  // In a real application, you would fetch the client data based on the ID
  // For now, we'll use the mock data
  const clientData = mockClientData;

  return <ClientDetailsPage clientId={clientId} clientData={clientData} />;
};

export default Page; 