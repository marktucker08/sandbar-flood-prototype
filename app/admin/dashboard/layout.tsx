// "use client";
import React from "react";
import { Sidebar } from "@/components/features/admin/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      <Sidebar />
      <div className="flex-1 w-full">
        {children}
      </div>
    </div>
  );
};
