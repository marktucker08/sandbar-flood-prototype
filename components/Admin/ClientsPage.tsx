"use client";
import React from "react";
import { PageHeader } from "./PageHeader";
import { StatusBadge } from "@/components/ui/status-badge";
import { DataTable } from "./DataTable";
import { Client, Column, Status } from "@/types/admin";
import { Plus, Filter, Download } from "lucide-react";

const columns: Column<Client>[] = [
  { key: "id", label: "Client ID" },
  { key: "name", label: "Name" },
  { key: "type", label: "Type" },
  {
    key: "status",
    label: "Status",
    render: (value: string) => <StatusBadge status={value as Status} />,
  },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "lastContact", label: "Last Contact" },
];

const mockData: Client[] = [
  {
    id: "CLT-001",
    name: "John Smith",
    type: "Individual",
    status: "active",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    lastContact: "2024-03-15",
  },
  {
    id: "CLT-002",
    name: "Sarah Johnson",
    type: "Individual",
    status: "active",
    email: "sarah.j@email.com",
    phone: "(555) 234-5678",
    lastContact: "2024-03-14",
  },
  {
    id: "CLT-003",
    name: "Coastal Properties LLC",
    type: "Business",
    status: "pending",
    email: "info@coastalprops.com",
    phone: "(555) 345-6789",
    lastContact: "2024-03-13",
  },
  {
    id: "CLT-004",
    name: "Beachfront Rentals Inc",
    type: "Business",
    status: "active",
    email: "contact@beachfrontrentals.com",
    phone: "(555) 456-7890",
    lastContact: "2024-03-12",
  },
];

export const ClientsPage = () => {
  return (
    <main className="admin-page-main">
      <PageHeader 
        title="Clients" 
        actionButton={{
          icon: Plus,
          label: "Add Client",
          onClick: () => console.log("Add Client clicked")
        }}
      />
      <section className="admin-content-section">
        <header className="admin-section-header">
          <h2 className="admin-section-title">All Clients</h2>
          <div className="admin-action-buttons">
            <button className="admin-action-button">
              <Filter className="icon-sm" />
            </button>
            <button className="admin-action-button">
              <Download className="icon-sm" />
            </button>
          </div>
        </header>
        <DataTable<Client>
          columns={columns}
          data={mockData}
          editLink="/admin/dashboard/clients"
          viewLink="/admin/dashboard/clients"
          currentPage={1}
          totalPages={5}
          onPageChange={(page) => console.log("Page changed:", page)}
        />
      </section>
    </main>
  );
}; 