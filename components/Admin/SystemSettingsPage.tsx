"use client";
import React from "react";
import { PageHeader } from "./PageHeader";
import Link from "next/link";
const SystemSettingsPage: React.FC = () => {
  return (
   
      <main className="flex flex-col flex-1 gap-4 p-5">
        <PageHeader title="System Settings" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Rating Information Section */}
          <section className="p-6 bg-white rounded-xl border border-solid">
            <header className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-500">Rating Information</h2>
              <button className="px-3 py-1.5 text-sm text-sky-950 hover:bg-sky-50 rounded-lg transition-colors">
                Edit
              </button>
            </header>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Base Rate</span>
                <span className="text-sm font-medium text-gray-900">$1,250.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Flood Zone Factor</span>
                <span className="text-sm font-medium text-gray-900">1.5x</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Elevation Factor</span>
                <span className="text-sm font-medium text-gray-900">0.8x</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Deductible Factor</span>
                <span className="text-sm font-medium text-gray-900">0.9x</span>
              </div>
            </div>
          </section>

          {/* Binding Authorities Section */}
          <section className="p-6 bg-white rounded-xl border border-solid">
            <header className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-500">Binding Authorities</h2>
              <button className="px-3 py-1.5 text-sm text-sky-950 hover:bg-sky-50 rounded-lg transition-colors">
                Edit
              </button>
            </header>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Max Coverage Amount</span>
                <span className="text-sm font-medium text-gray-900">$500,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Min Coverage Amount</span>
                <span className="text-sm font-medium text-gray-900">$100,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Max Deductible</span>
                <span className="text-sm font-medium text-gray-900">$10,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Min Deductible</span>
                <span className="text-sm font-medium text-gray-900">$1,000</span>
              </div>
            </div>
          </section>

          {/* Users & Groups Section */}
          <section className="p-6 bg-white rounded-xl border border-solid">
            <header className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-500">Users & Groups</h2>
              <Link href="/admin/dashboard/settings/users">
                <button className="px-3 py-1.5 text-sm text-sky-950 hover:bg-sky-50 rounded-lg transition-colors">
                  Manage
                </button>
              </Link>
            </header>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Total Users</span>
                <span className="text-sm font-medium text-gray-900">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Active Users</span>
                <span className="text-sm font-medium text-gray-900">18</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">User Groups</span>
                <span className="text-sm font-medium text-gray-900">4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Last User Added</span>
                <span className="text-sm font-medium text-gray-900">2 days ago</span>
              </div>
            </div>
          </section>

          {/* Misc Settings Section */}
          <section className="p-6 bg-white rounded-xl border border-solid">
            <header className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-500">Misc Settings</h2>
              <button className="px-3 py-1.5 text-sm text-sky-950 hover:bg-sky-50 rounded-lg transition-colors">
                Edit
              </button>
            </header>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Quote Expiry (Days)</span>
                <span className="text-sm font-medium text-gray-900">30</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Default Timezone</span>
                <span className="text-sm font-medium text-gray-900">EST</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Email Notifications</span>
                <span className="text-sm font-medium text-gray-900">Enabled</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">System Status</span>
                <span className="text-sm font-medium text-green-600">Active</span>
              </div>
            </div>
          </section>
          <section className="p-6 bg-white rounded-xl border border-solid">
            <header className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-500">SLA Settings</h2>
              <button className="px-3 py-1.5 text-sm text-sky-950 hover:bg-sky-50 rounded-lg transition-colors">
                Edit
              </button>
            </header>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">SLA Current Year</span>
                <span className="text-sm font-medium text-gray-900">2025</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Add SLA Year</span>
                <span className="text-sm font-medium text-gray-900">+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">SLA Next Year</span>
                <span className="text-sm font-medium text-gray-900">2026</span>
              </div>
            </div>
          </section>
        </div>
      </main>
  );
};

export default SystemSettingsPage; 