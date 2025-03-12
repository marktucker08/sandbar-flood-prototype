"use client";
import React from "react";
// import Header from "./Header";
import QuickActionsSection from "./QuickActionsSection";
import DashboardSection from "./DashboardSection";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200">
      <section className="container mx-auto px-6 py-8 max-w-[1920px]">
        {/* <h1 className="heading">
          Welcome
        </h1> */}
        <p className="text-2xl text-center mb-10 text-white font-semibold drop-shadow-sm">
          Welcome to your one stop solution for all things flood insurance.
        </p>

        <QuickActionsSection />
        {/* <main className="overflow-hidden"> */}
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
        {/* </main> */}
      </section>
    </div>
  );
}

export default Home;
