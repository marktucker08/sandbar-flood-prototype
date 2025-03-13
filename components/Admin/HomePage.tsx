"use client";
import React from "react";
import { DashboardLayout } from "./DashboardLayout";
import { PageHeader } from "./PageHeader";
import { StatsCard } from "./StatsCard";

export const HomePage = () => {
  const statsData = [
    {
      title: "Total Policies",
      value: "156",
      trend: 12.5,
      trendType: "positive" as const,
      chartColor: "green",
    },
    {
      title: "Active Clients",
      value: "89",
      trend: 8.2,
      trendType: "positive" as const,
      chartColor: "blue",
    },
    {
      title: "Pending Inspections",
      value: "23",
      trend: -3.1,
      trendType: "negative" as const,
      chartColor: "orange",
    },
    {
      title: "Revenue",
      value: "$45.2K",
      trend: 15.7,
      trendType: "positive" as const,
      chartColor: "purple",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardLayout>
        <main className="flex flex-col flex-1 gap-4 p-5">
          <PageHeader title="Dashboard" />
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsData.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                trend={stat.trend}
                trendType={stat.trendType}
                chartColor={stat.chartColor}
              />
            ))}
          </section>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              {/* Add activity feed component here */}
            </div>
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Inspections</h2>
              {/* Add upcoming inspections component here */}
            </div>
          </section>
        </main>
      </DashboardLayout>
    </div>
  );
}; 