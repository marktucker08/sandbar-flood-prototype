"use client";
import * as React from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/Admin/PageHeader";
import Link from "next/link";
import { DetailedClient } from "@/types/admin";
import PersonalDetails from "@/components/Admin/ClientDetails/PersonalDetails";
import ContactInformation from "@/components/Admin/ClientDetails/ContactInformation";
import ClientStatus from "@/components/Admin/ClientDetails/ClientStatus";
import AssociatedRecords from "@/components/Admin/ClientDetails/AssociatedRecords";
import ActionButtons from "@/components/Admin/ClientDetails/ActionButtons";

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

  return (
    <main className="flex flex-col flex-1 gap-4 p-5">
      <PageHeader title="Client Details" />
      <section className="p-6 bg-white rounded-xl border border-solid">
        <div className="flex gap-2 items-center mb-6">
          <Link href="/admin/dashboard/clients">
            <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors">
              <i className="ti ti-arrow-left text-xl" />
              <span className="text-sm">Back</span>
            </button>
          </Link>
        </div>

        <div className="flex gap-3 items-center mb-8">
          <h2 className="text-xl font-bold text-gray-500">
            Client Details - {clientId}
          </h2>
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <i className="ti ti-copy text-xl" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8 max-sm:grid-cols-1">
          <div className="flex flex-col gap-6">
            <PersonalDetails data={clientData} />
            <ContactInformation data={clientData} />
          </div>
          <div className="flex flex-col gap-6">
            <ClientStatus data={clientData} />
            <AssociatedRecords data={clientData} />
          </div>
        </div>
        <ActionButtons data={clientData} />
      </section>
    </main>
  );
};

export default ClientDetailsPage; 