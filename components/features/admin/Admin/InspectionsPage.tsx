"use client";
import React from "react";
import { PageHeader } from "./PageHeader";
import { StatusBadge } from "@/components/common/ui/status-badge";
import { DataTable } from "./DataTable";
import { Column, Inspection, Status } from "@/types/admin";
import { Calendar, Filter } from "lucide-react";

export const InspectionsPage = () => {
  const columns = [
    { key: "id", label: "Inspection ID" },
    { key: "property", label: "Property" },
    { key: "client", label: "Client" },
    {
      key: "status",
      label: "Status",
      render: (value: Status) => <StatusBadge status={value} />,
    },
    { key: "inspector", label: "Inspector" },
    { key: "date", label: "Date" },
    { key: "time", label: "Time" },
  ];

  const data: Inspection[] = [
    {
      id: "INS-001",
      property: "123 Main St",
      client: "John Smith",
      status: "pending",
      inspector: "Jane Doe",
      date: "2024-03-20",
      time: "10:00 AM",
    },
    {
      id: "INS-002",
      property: "456 Oak Ave",
      client: "Sarah Johnson",
      status: "approved",
      inspector: "Mike Wilson",
      date: "2024-03-21",
      time: "2:30 PM",
    },
    {
      id: "INS-003",
      property: "789 Pine Rd",
      client: "Michael Brown",
      status: "rejected",
      inspector: "Jane Doe",
      date: "2024-03-22",
      time: "9:15 AM",
    },
    {
      id: "INS-004",
      property: "321 Elm St",
      client: "Emily Davis",
      status: "approved",
      inspector: "Mike Wilson",
      date: "2024-03-23",
      time: "1:00 PM",
    },
  ];

  return (
    <main className="admin-page-main">
      <PageHeader 
        title="Inspections" 
        actionButton={{
          icon: Calendar,
          label: "Schedule Inspection",
          onClick: () => console.log("Schedule Inspection clicked")
        }}
      />
      <section className="admin-content-section">
        <header className="admin-section-header">
          <h2 className="admin-section-title">All Inspections</h2>
          <div className="admin-action-buttons">
            <button className="admin-action-button">
              <Filter className="icon-sm" />
            </button>
            <button className="admin-action-button">
              <Calendar className="icon-sm" />
            </button>
          </div>
        </header>
        <DataTable<Inspection> 
          columns={columns as Column<Inspection>[]}
          data={data}
          editLink="/admin/dashboard/inspections/details"
          viewLink="/admin/dashboard/inspections/details"
          currentPage={1}
          totalPages={5}
          onPageChange={(page) => console.log("Page changed:", page)}
        />
      </section>
    </main>
  );
}; 