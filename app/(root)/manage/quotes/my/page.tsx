"use client";
import React from "react";
import ManagePageContent from "@/components/common/layout/ManagePageContent";

const MyQuotesPage: React.FC = () => {
  const dashboardSections = [
    { title: "Active Quotes" },
    { title: "Recent Quotes" },
    { title: "Pending Approval" }
  ];

  return (
    <ManagePageContent
      title="Manage your quotes"
      searchPlaceholder="Search quotes..."
      dashboardSections={dashboardSections}
    />
  );
};

export default MyQuotesPage; 