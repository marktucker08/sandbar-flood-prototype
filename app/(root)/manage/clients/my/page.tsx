"use client";
import React from "react";
import { ManagePageContent } from "@/components/common/layout";

const MyClientsPage: React.FC = () => {
  const dashboardSections = [
    { title: "Active Clients" },
    { title: "Recent Clients" },
    { title: "Pending Applications" }
  ];

  return (
    <ManagePageContent
      title="Manage your clients"
      searchPlaceholder="Search clients..."
      dashboardSections={dashboardSections}
    />
  );
};

export default MyClientsPage; 