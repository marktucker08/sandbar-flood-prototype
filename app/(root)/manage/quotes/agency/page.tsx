"use client";
import React from "react";
import QuickActionsSection from "@/components/QuickActionsSection";
import DashboardSection from "@/components/DashboardSection";
import SearchBar from "@/components/SearchBar";

const AgencyQuotesPage: React.FC = () => {
  const handleSearch = (searchTerm: string) => {
    // Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200">
      <section className="container mx-auto px-6 py-8 max-w-[1920px]">
        <p className="text-2xl text-center mb-10 text-white font-semibold drop-shadow-sm">
          Agency Quotes Overview
        </p>

        <SearchBar 
          placeholder="Search agency quotes..." 
          onSearch={handleSearch}
          className="mx-auto mb-8"
        />

        <QuickActionsSection />
        <div className="mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="w-full">
              <DashboardSection
                title="All Agency Quotes"
                className="h-full"
              />
            </div>
            <div className="w-full flex flex-col gap-8">
              <DashboardSection
                title="Pending Review"
                className="h-full"
              />
              <DashboardSection
                title="Recently Approved"
                className="h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AgencyQuotesPage; 