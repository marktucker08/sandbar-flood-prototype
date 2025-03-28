'use client';

import React from "react";
import QuickActionsSection from "@/components/QuickActionsSection";
import DashboardSection from "@/components/DashboardSection";
import SearchBar from "@/components/SearchBar";

export default function HomePage() {
  const handleSearch = (searchTerm: string) => {
    // Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="background-gradient min-h-screen">
      <section className="container mx-auto px-6 py-8 max-w-[1920px]">
        <p className="sub-heading text-white drop-shadow-sm">
          Welcome to your one stop solution for all things flood insurance.
        </p>

        <SearchBar 
          placeholder="Search quotes, policies, or clients..." 
          onSearch={handleSearch}
          className="mx-auto mb-8"
        />

        <QuickActionsSection />
        <div className="mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="w-full">
              <DashboardSection
                title="Quotes Pending Approval"
                className="h-full"
              />
            </div>
            <div className="w-full flex flex-col gap-8">
              <DashboardSection
                title="Approved Quotes"
                className="h-full"
              />
              <DashboardSection
                title="Recent Unquoted Indications"
                className="h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}