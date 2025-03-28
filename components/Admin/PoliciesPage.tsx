"use client";
import React from "react";
import { PageHeader } from "./PageHeader";
import { StatusBadge } from "./StatusBadge";
import { DataTable } from "./DataTable";
import { Column, Policy, Status } from "@/types/admin";
import { Plus, Filter, Download } from "lucide-react";

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
    <main className="admin-page-main">
      <PageHeader 
        title="Policies" 
        actionButton={{
          icon: Plus,
          label: "Add Policy",
          onClick: () => console.log("Add Policy clicked")
        }}
      />
      <section className="admin-content-section">
        <header className="admin-section-header">
          <h2 className="admin-section-title">All Policies</h2>
          <div className="admin-action-buttons">
            <button className="admin-action-button">
              <Filter className="icon-sm" />
            </button>
            <button className="admin-action-button">
              <Download className="icon-sm" />
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