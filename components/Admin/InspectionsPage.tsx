"use client";
import React from "react";
import { DashboardLayout } from "./DashboardLayout";
import { PageHeader } from "./PageHeader";
import { StatusBadge } from "./StatusBadge";
import Link from "next/link";

export const InspectionsPage = () => {
  return (
    <DashboardLayout>
      <main className="flex flex-col flex-1 gap-4 p-5">
        <PageHeader 
          title="Inspections" 
          actionButton={{
            icon: "ti ti-calendar-plus",
            label: "Schedule Inspection",
            onClick: () => console.log("Schedule Inspection clicked")
          }}
        />
        <section className="p-6 bg-white rounded-xl border border-solid">
          <header className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold text-gray-500">All Inspections</h2>
            <div className="flex gap-2">
              <button className="px-2.5 py-1.5 rounded-md border border-solid">
                <i className="ti ti-filter" />
              </button>
              <button className="px-2.5 py-1.5 rounded-md border border-solid">
                <i className="ti ti-calendar" />
              </button>
            </div>
          </header>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="bg-gray-200 rounded-lg">
                  <th className="p-4 text-sm text-left text-sky-950">Inspection ID</th>
                  <th className="p-4 text-sm text-left text-sky-950">Property</th>
                  <th className="p-4 text-sm text-left text-sky-950">Client</th>
                  <th className="p-4 text-sm text-left text-sky-950">Status</th>
                  <th className="p-4 text-sm text-left text-sky-950">Inspector</th>
                  <th className="p-4 text-sm text-left text-sky-950">Date</th>
                  <th className="p-4 text-sm text-left text-sky-950">Time</th>
                  <th className="p-4 text-sm text-left text-sky-950">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 text-sm text-gray-500">#INS-001</td>
                  <td className="p-4 text-sm text-gray-500">123 Main St</td>
                  <td className="p-4 text-sm text-gray-500">John Smith</td>
                  <td className="p-4">
                    <StatusBadge status="pending" />
                  </td>
                  <td className="p-4 text-sm text-gray-500">Jane Doe</td>
                  <td className="p-4 text-sm text-gray-500">2024-03-20</td>
                  <td className="p-4 text-sm text-gray-500">10:00 AM</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link href="/admin/dashboard/inspections/1">
                        <button className="px-2.5 py-1.5 rounded-md border border-solid">
                          <i className="ti ti-pencil" />
                        </button>
                      </Link>
                      <button className="px-2.5 py-1.5 rounded-md border border-solid">
                        <i className="ti ti-eye" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 text-sm text-gray-500">#INS-002</td>
                  <td className="p-4 text-sm text-gray-500">456 Oak Ave</td>
                  <td className="p-4 text-sm text-gray-500">Sarah Johnson</td>
                  <td className="p-4">
                    <StatusBadge status="approved" />
                  </td>
                  <td className="p-4 text-sm text-gray-500">Mike Wilson</td>
                  <td className="p-4 text-sm text-gray-500">2024-03-21</td>
                  <td className="p-4 text-sm text-gray-500">2:30 PM</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link href="/admin/dashboard/inspections/2">
                        <button className="px-2.5 py-1.5 rounded-md border border-solid">
                          <i className="ti ti-pencil" />
                        </button>
                      </Link>
                      <button className="px-2.5 py-1.5 rounded-md border border-solid">
                        <i className="ti ti-eye" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 text-sm text-gray-500">#INS-003</td>
                  <td className="p-4 text-sm text-gray-500">789 Pine Rd</td>
                  <td className="p-4 text-sm text-gray-500">Michael Brown</td>
                  <td className="p-4">
                    <StatusBadge status="rejected" />
                  </td>
                  <td className="p-4 text-sm text-gray-500">Jane Doe</td>
                  <td className="p-4 text-sm text-gray-500">2024-03-22</td>
                  <td className="p-4 text-sm text-gray-500">9:15 AM</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link href="/admin/dashboard/inspections/3">
                        <button className="px-2.5 py-1.5 rounded-md border border-solid">
                          <i className="ti ti-pencil" />
                        </button>
                      </Link>
                      <button className="px-2.5 py-1.5 rounded-md border border-solid">
                        <i className="ti ti-eye" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 text-sm text-gray-500">#INS-004</td>
                  <td className="p-4 text-sm text-gray-500">321 Elm St</td>
                  <td className="p-4 text-sm text-gray-500">Emily Davis</td>
                  <td className="p-4">
                    <StatusBadge status="approved" />
                  </td>
                  <td className="p-4 text-sm text-gray-500">Mike Wilson</td>
                  <td className="p-4 text-sm text-gray-500">2024-03-23</td>
                  <td className="p-4 text-sm text-gray-500">1:00 PM</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link href="/admin/dashboard/inspections/4">
                        <button className="px-2.5 py-1.5 rounded-md border border-solid">
                          <i className="ti ti-pencil" />
                        </button>
                      </Link>
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