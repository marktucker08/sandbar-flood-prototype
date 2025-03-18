"use client";
import React from "react";
import QuickActionsSection from "@/components/QuickActionsSection";
import DashboardSection from "@/components/DashboardSection";

const MyClientsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200">
      <section className="container mx-auto px-6 py-8 max-w-[1920px]">
        <p className="text-2xl text-center mb-10 text-white font-semibold drop-shadow-sm">
          Manage your clients
        </p>

        <QuickActionsSection />
        <div className="mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="w-full">
              <DashboardSection
                title="Active Clients"
                className="h-full"
              />
            </div>
            <div className="w-full flex flex-col gap-8">
              <DashboardSection
                title="Recent Clients"
                className="h-full"
              />
              <DashboardSection
                title="Pending Applications"
                className="h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyClientsPage; 