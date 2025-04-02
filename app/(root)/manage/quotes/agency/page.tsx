"use client";
import React from "react";
import { ManagePageContent } from "@/components/common/layout";



const AgencyQuotesPage: React.FC = () => {

  const dashboardSections = [
    { title: "All Agency Quotes" },
    { title: "Pending Review" },
    { title: "Recently Approved" }
  ];

  return (
    <ManagePageContent
      title="Agency Quotes Overview"
      searchPlaceholder="Search agency quotes..."
      dashboardSections={dashboardSections}
    />
  );

};

export default AgencyQuotesPage; 