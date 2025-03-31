"use client";
import React from "react";
import ManagePageContent from "@/components/ManagePageContent";

const MyPoliciesPage: React.FC = () => {
  const dashboardSections = [
    { title: "Active Policies" },
    { title: "Expiring Soon" },
    { title: "Recently Renewed" }
  ];

  return (
    <ManagePageContent
      title="Manage your policies"
      searchPlaceholder="Search policies..."
      dashboardSections={dashboardSections}
    />
  );
};

export default MyPoliciesPage; 