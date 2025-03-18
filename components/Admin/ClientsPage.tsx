"use client";
import React from "react";
import { PageHeader } from "./PageHeader";
import { StatusBadge } from "./StatusBadge";
import { DataTable } from "./DataTable";
import { Client, Column, Status } from "@/types/admin";

export const ClientsPage = () => {
  const columns = [
    { key: "id", label: "Client ID" },
    { key: "name", label: "Name" },
    { key: "type", label: "Type" },
    {
      key: "status",
      label: "Status",
      render: (value: Status) => <StatusBadge status={value} />,
    },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "lastContact", label: "Last Contact" },
  ];

  const data: Client[] = [
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

  return (
    <main className="flex flex-col flex-1 gap-4 p-5">
      <PageHeader 
        title="Clients" 
        actionButton={{
          icon: "ti ti-user-plus",
          label: "Add Client",
          onClick: () => console.log("Add Client clicked")
        }}
      />
      <section className="p-6 bg-white rounded-xl border border-solid">
        <header className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-gray-500">All Clients</h2>
          <div className="flex gap-2">
            <button className="px-2.5 py-1.5 rounded-md border border-solid">
              <i className="ti ti-filter" />
            </button>
            <button className="px-2.5 py-1.5 rounded-md border border-solid">
              <i className="ti ti-download" />
            </button>
          </div>
        </header>
        <DataTable<Client>
          columns={columns as Column<Client>[]}
          data={data}
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