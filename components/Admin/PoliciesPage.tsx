"use client";
import React from "react";
import { DashboardLayout } from "./DashboardLayout";
import { PageHeader } from "./PageHeader";
import { StatusBadge } from "./StatusBadge";

export const PoliciesPage = () => {
  return (
    <DashboardLayout>
      <main className="flex flex-col flex-1 gap-4 p-5">
        <PageHeader 
          title="Policies" 
          actionButton={{
            icon: "ti ti-plus",
            label: "New Policy",
            onClick: () => console.log("New Policy clicked")
          }}
        />
        <section className="p-6 bg-white rounded-xl border border-solid">
          <header className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold text-gray-500">All Policies</h2>
            <button className="px-2.5 py-1.5 rounded-md border border-solid">
              <i className="ti ti-filter" />
            </button>
          </header>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-gray-200 rounded-lg">
                  <th className="p-4 text-sm text-left text-sky-950">Policy ID</th>
                  <th className="p-4 text-sm text-left text-sky-950">Client Name</th>
                  <th className="p-4 text-sm text-left text-sky-950">Type</th>
                  <th className="p-4 text-sm text-left text-sky-950">Status</th>
                  <th className="p-4 text-sm text-left text-sky-950">Premium</th>
                  <th className="p-4 text-sm text-left text-sky-950">Effective Date</th>
                  <th className="p-4 text-sm text-left text-sky-950">Expiry Date</th>
                  <th className="p-4 text-sm text-left text-sky-950">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 text-sm text-gray-500">#POL-001</td>
                  <td className="p-4 text-sm text-gray-500">John Smith</td>
                  <td className="p-4">
                    <div className="flex gap-1 items-center px-2 py-0.5 bg-sky-100 rounded-[99px] w-fit">
                      <i className="ti ti-home text-sky-500" />
                      <span className="text-xs font-bold text-sky-500">Home</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <StatusBadge status="active" />
                  </td>
                  <td className="p-4 text-sm text-gray-500">$1,250.00</td>
                  <td className="p-4 text-sm text-gray-500">01/01/2024</td>
                  <td className="p-4 text-sm text-gray-500">01/01/2025</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="px-2.5 py-1.5 rounded-md border border-solid">
                        <i className="ti ti-pencil" />
                      </button>
                      <button className="px-2.5 py-1.5 rounded-md border border-solid">
                        <i className="ti ti-eye" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <nav className="flex gap-1 justify-center mt-4">
              <button className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded">
                <i className="ti ti-arrow-left" />
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded"
                >
                  {page}
                </button>
              ))}
              <button className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded">
                <i className="ti ti-arrow-right" />
              </button>
            </nav>
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
}; 