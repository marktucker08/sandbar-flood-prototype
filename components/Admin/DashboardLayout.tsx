"use client";
import React from "react";
import { Sidebar } from "./Sidebar";
import { StatsCard } from "./StatsCard";
import { QuotesTable } from "./QuotesTable";
import { Header } from "./Header";

interface StatsData {
  title: string;
  value: string;
  trend: number;
  trendType: "positive" | "negative" | "neutral";
  chartColor: string;
}

export const DashboardLayout = () => {
  const statsData: StatsData[] = [
    {
      title: "Approved Quotes",
      value: "12",
      trend: 10.24,
      trendType: "positive",
      chartColor: "green",
    },
    {
      title: "Expired Quotes",
      value: "08",
      trend: 9.43,
      trendType: "negative",
      chartColor: "orange",
    },
    {
      title: "Rejected Quotes",
      value: "04",
      trend: 5.23,
      trendType: "negative",
      chartColor: "red",
    },
    {
      title: "Pending Quotes",
      value: "21",
      trend: 5.23,
      trendType: "neutral",
      chartColor: "blue",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex flex-col flex-1 gap-4 p-5">
        <Header />
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
        <section className="flex-1">
          <QuotesTable />
        </section>
      </main>
    </div>
  );
};
