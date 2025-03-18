"use client";
import React from "react";
import { PageHeader } from "./PageHeader";
import { StatusBadge } from "./StatusBadge";
import { DataTable } from "./DataTable";
import { Column, Policy, Status } from "@/types/admin";

export const PoliciesPage = () => {
  const columns = [
    { key: "id", label: "Policy ID" },
    { key: "clientName", label: "Client Name" },
    { key: "type", label: "Type" },
    {
      key: "status",
      label: "Status",
      render: (value: Status) => <StatusBadge status={value} />,
    },
    { key: "premium", label: "Premium" },
    { key: "effectiveDate", label: "Effective Date" },
    { key: "expiryDate", label: "Expiry Date" },
  ];

  const data: Policy[] = [
    {
      id: "POL-001",
      clientName: "John Smith",
      type: "Residential",
      status: "active",
      premium: "$2,400.00",
      effectiveDate: "2024-01-01",
      expiryDate: "2024-12-31",
    },
    {
      id: "POL-002",
      clientName: "Sarah Johnson",
      type: "Residential",
      status: "active",
      premium: "$1,800.00",
      effectiveDate: "2024-02-01",
      expiryDate: "2025-01-31",
    },
    {
      id: "POL-003",
      clientName: "Coastal Properties LLC",
      type: "Commercial",
      status: "pending",
      premium: "$5,200.00",
      effectiveDate: "2024-03-01",
      expiryDate: "2025-02-28",
    },
    {
      id: "POL-004",
      clientName: "Beachfront Rentals Inc",
      type: "Commercial",
      status: "expired",
      premium: "$4,800.00",
      effectiveDate: "2023-03-01",
      expiryDate: "2024-02-29",
    },
  ];

  return (
    <main className="flex flex-col flex-1 gap-4 p-5">
      <PageHeader 
        title="Policies" 
        actionButton={{
          icon: "ti ti-plus",
          label: "Add Policy",
          onClick: () => console.log("Add Policy clicked")
        }}
      />
      <section className="p-6 bg-white rounded-xl border border-solid">
        <header className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-gray-500">All Policies</h2>
          <div className="flex gap-2">
            <button className="px-2.5 py-1.5 rounded-md border border-solid">
              <i className="ti ti-filter" />
            </button>
            <button className="px-2.5 py-1.5 rounded-md border border-solid">
              <i className="ti ti-download" />
            </button>
          </div>
        </header>
        <DataTable<Policy>
          columns={columns as Column<Policy>[]}
          data={data}
          editLink="/admin/dashboard/policies/details"
          viewLink="/admin/dashboard/policies/details"
          currentPage={1}
          totalPages={5}
          onPageChange={(page) => console.log("Page changed:", page)}
        />
      </section>
    </main>
  );
}; 