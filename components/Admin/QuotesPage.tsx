"use client";
import React from "react";
import { PageHeader } from "./PageHeader";
import { StatusBadge } from "./StatusBadge";
import { DataTable } from "./DataTable";
import { Column, Quote, Status } from "@/types/admin";

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
    <main className="flex flex-col flex-1 gap-4 p-5">
      <PageHeader 
        title="Quotes" 
        actionButton={{
          icon: "ti ti-plus",
          label: "New Quote",
          onClick: () => console.log("New Quote clicked")
        }}
      />
      <section className="p-6 bg-white rounded-xl border border-solid">
        <header className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-gray-500">All Quotes</h2>
          <div className="flex gap-2">
            <button className="px-2.5 py-1.5 rounded-md border border-solid">
              <i className="ti ti-filter" />
            </button>
            <button className="px-2.5 py-1.5 rounded-md border border-solid">
              <i className="ti ti-download" />
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
