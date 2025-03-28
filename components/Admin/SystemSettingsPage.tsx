"use client";
import React from "react";
import { PageHeader } from "./PageHeader";
import Link from "next/link";

const SystemSettingsPage: React.FC = () => {
  return (
    <main className="admin-page-main">
      <PageHeader title="System Settings" />
      
      <div className="admin-content-grid">
        {/* Rating Information Section */}
        <section className="admin-content-section">
          <header className="admin-section-header">
            <h2 className="admin-section-title">Rating Information</h2>
            <button className="admin-action-button">
              Edit
            </button>
          </header>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="form-label">Base Rate</span>
              <span className="form-value">$1,250.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="form-label">Flood Zone Factor</span>
              <span className="form-value">1.5x</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="form-label">Elevation Factor</span>
              <span className="form-value">0.8x</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="form-label">Deductible Factor</span>
              <span className="form-value">0.9x</span>
            </div>
          </div>
        </section>

        {/* Binding Authorities Section */}
        <section className="admin-content-section">
          <header className="admin-section-header">
            <h2 className="admin-section-title">Binding Authorities</h2>
            <button className="admin-action-button">
              Edit
            </button>
          </header>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="form-label">Max Coverage Amount</span>
              <span className="form-value">$500,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="form-label">Min Coverage Amount</span>
              <span className="form-value">$100,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="form-label">Max Deductible</span>
              <span className="form-value">$10,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="form-label">Min Deductible</span>
              <span className="form-value">$1,000</span>
            </div>
          </div>
        </section>

        {/* Users & Groups Section */}
        <section className="admin-content-section">
          <header className="admin-section-header">
            <h2 className="admin-section-title">Users & Groups</h2>
            <Link href="/admin/dashboard/settings/users">
              <button className="admin-action-button">
                Manage
              </button>
            </Link>
          </header>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="form-label">Total Users</span>
              <span className="form-value">24</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="form-label">Active Users</span>
              <span className="form-value">18</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="form-label">User Groups</span>
              <span className="form-value">4</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="form-label">Last User Added</span>
              <span className="form-value">2 days ago</span>
            </div>
          </div>
        </section>

        {/* Misc Settings Section */}
        <section className="admin-content-section">
          <header className="admin-section-header">
            <h2 className="admin-section-title">Misc Settings</h2>
            <button className="admin-action-button">
              Edit
            </button>
          </header>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="form-label">Quote Expiry (Days)</span>
              <span className="form-value">30</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="form-label">Default Timezone</span>
              <span className="form-value">EST</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="form-label">Email Notifications</span>
              <span className="form-value">Enabled</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="form-label">System Status</span>
              <span className="form-value text-green-600">Active</span>
            </div>
          </div>
        </section>

        {/* SLA Settings Section */}
        <section className="admin-content-section">
          <header className="admin-section-header">
            <h2 className="admin-section-title">SLA Settings</h2>
            <button className="admin-action-button">
              Edit
            </button>
          </header>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="form-label">SLA Current Year</span>
              <span className="form-value">2025</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="form-label">Add SLA Year</span>
              <span className="form-value">+</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="form-label">SLA Next Year</span>
              <span className="form-value">2026</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default SystemSettingsPage; 