"use client";
import React from "react";
import { PageHeader } from "./PageHeader";
import { StatusBadge } from "@/components/ui/status-badge";
import { DataTable } from "./DataTable";
import { Column, Quote, Status } from "@/types/admin";
import { Plus, Filter, Download } from "lucide-react";

export const QuotesPage = () => {
  const columns = [
    { key: "id", label: "Quote ID" },
    { key: "clientName", label: "Client Name" },
    { key: "property", label: "Property" },
    {
      key: "status",
      label: "Status",
      render: (value: Status) => <StatusBadge status={value} />,
    },
    { key: "premium", label: "Premium" },
    { key: "createdDate", label: "Created Date" },
    { key: "expiryDate", label: "Expiry Date" },
  ];

  const data: Quote[] = [
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
      clientName: "Sarah Johnson",
      property: "456 Oak Ave",
      status: "approved",
      premium: "$2,100.00",
      createdDate: "2024-03-14",
      expiryDate: "2024-04-14",
    },
    {
      id: "QOT-003",
      clientName: "Michael Brown",
      property: "789 Pine Rd",
      status: "rejected",
      premium: "$1,800.00",
      createdDate: "2024-03-13",
      expiryDate: "2024-04-13",
    },
    {
      id: "QOT-004",
      clientName: "Emily Davis",
      property: "321 Elm St",
      status: "expired",
      premium: "$1,500.00",
      createdDate: "2024-02-15",
      expiryDate: "2024-03-15",
    },
  ];

  return (
    <main className="admin-page-main">
      <PageHeader 
        title="Quotes" 
        actionButton={{
          icon: Plus,
          label: "New Quote",
          onClick: () => console.log("New Quote clicked")
        }}
      />
      <section className="admin-content-section">
        <header className="admin-section-header">
          <h2 className="admin-section-title">All Quotes</h2>
          <div className="admin-action-buttons">
            <button className="admin-action-button">
              <Filter className="icon-sm" />
            </button>
            <button className="admin-action-button">
              <Download className="icon-sm" />
            </button>
          </div>
        </header>
        <DataTable<Quote>
          columns={columns as Column<Quote>[]}
          data={data}
          editLink="/admin/dashboard/quotes/details"
          viewLink="/admin/dashboard/quotes/details"
          currentPage={1}
          totalPages={5}
          onPageChange={(page) => console.log("Page changed:", page)}
        />
      </section>
    </main>
  );
};
