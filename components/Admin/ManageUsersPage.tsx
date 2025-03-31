"use client";
import React from "react";
import { PageHeader } from "./PageHeader";
import { StatusBadge } from "@/components/ui/status-badge";
import { Plus, Download, Filter, User, Pencil, Trash } from "lucide-react";

const ManageUsersPage: React.FC = () => {
  return (
    <main className="admin-page-main">
      <PageHeader 
        title="Manage Users" 
        actionButton={{
          icon: Plus,
          label: "Add User",
          onClick: () => console.log("Add User clicked")
        }}
      />
      
      <div className="admin-content-grid">
        {/* Active Users Section */}
        <section className="admin-content-section lg:col-span-2">
          <header className="admin-section-header">
            <div>
              <h2 className="admin-section-title">Active Users</h2>
              <p className="text-sm text-gray-500 mt-1">Manage system users and their permissions</p>
            </div>
            <div className="flex gap-2">
              <button className="admin-action-button">
                <Filter className="icon-sm" />
              </button>
              <button className="admin-action-button">
                <Download className="icon-sm" />
              </button>
            </div>
          </header>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr className="admin-table-header">
                  <th className="admin-table-header-cell">Name</th>
                  <th className="admin-table-header-cell">Email</th>
                  <th className="admin-table-header-cell">Role</th>
                  <th className="admin-table-header-cell">Agency</th>
                  <th className="admin-table-header-cell">Status</th>
                  <th className="admin-table-header-cell">Last Active</th>
                  <th className="admin-table-header-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="admin-table-row">
                  <td className="admin-table-cell">John Smith</td>
                  <td className="admin-table-cell">john.smith@agency.com</td>
                  <td className="admin-table-cell">
                    <div className="flex gap-1 items-center px-2 py-0.5 bg-sky-100 rounded-[99px] w-fit">
                      <User className="icon-sm text-sky-500" />
                      <span className="text-xs font-bold text-sky-500">Agent</span>
                    </div>
                  </td>
                  <td className="admin-table-cell">ABC Insurance</td>
                  <td className="admin-table-cell">
                    <StatusBadge status="active" />
                  </td>
                  <td className="admin-table-cell">2 hours ago</td>
                  <td className="admin-table-cell">
                    <div className="admin-table-actions">
                      <button className="admin-table-action-button">
                        <Pencil className="icon-sm" />
                      </button>
                      <button className="admin-table-action-button text-red-500 hover:bg-red-50">
                        <Trash className="icon-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Agencies Section */}
        <section className="admin-content-section">
          <header className="admin-section-header">
            <div>
              <h2 className="admin-section-title">Agencies</h2>
              <p className="text-sm text-gray-500 mt-1">Manage partner agencies</p>
            </div>
            <button className="admin-action-button">
              <Plus className="icon-sm" /> <span className="text-sm font-medium">Add Agency</span>
            </button>
          </header>
          <div className="space-y-4">
            <div className="admin-card p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">ABC Insurance</h3>
                  <p className="text-xs text-gray-500">12 active users</p>
                </div>
                <StatusBadge status="active" />
              </div>
              <div className="flex gap-2 mt-4">
                <button className="admin-action-button">
                  View Details
                </button>
                <button className="admin-action-button">
                  Edit
                </button>
              </div>
            </div>
            <div className="admin-card p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">XYZ Agency</h3>
                  <p className="text-xs text-gray-500">8 active users</p>
                </div>
                <StatusBadge status="active" />
              </div>
              <div className="flex gap-2 mt-4">
                <button className="admin-action-button">
                  View Details
                </button>
                <button className="admin-action-button">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Role Management Section */}
        <section className="admin-content-section">
          <header className="admin-section-header">
            <div>
              <h2 className="admin-section-title">Role Management</h2>
              <p className="text-sm text-gray-500 mt-1">Configure role permissions</p>
            </div>
            <button className="admin-action-button">
              Edit Roles
            </button>
          </header>
          <div className="space-y-4">
            <div className="admin-card p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Sandbar Admin</h3>
              <p className="text-xs text-gray-500 mb-3">Full system access and configuration</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 bg-sky-100 rounded-[99px] text-xs text-sky-500">User Management</span>
                <span className="px-2 py-0.5 bg-sky-100 rounded-[99px] text-xs text-sky-500">System Settings</span>
                <span className="px-2 py-0.5 bg-sky-100 rounded-[99px] text-xs text-sky-500">Agency Management</span>
              </div>
            </div>
            <div className="admin-card p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Agency Admin</h3>
              <p className="text-xs text-gray-500 mb-3">Agency-level management and reporting</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 bg-sky-100 rounded-[99px] text-xs text-sky-500">Agent Management</span>
                <span className="px-2 py-0.5 bg-sky-100 rounded-[99px] text-xs text-sky-500">Quote Management</span>
                <span className="px-2 py-0.5 bg-sky-100 rounded-[99px] text-xs text-sky-500">Agency Reports</span>
              </div>
            </div>
            <div className="admin-card p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Agent</h3>
              <p className="text-xs text-gray-500 mb-3">Basic quote and policy management</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 bg-sky-100 rounded-[99px] text-xs text-sky-500">Create Quotes</span>
                <span className="px-2 py-0.5 bg-sky-100 rounded-[99px] text-xs text-sky-500">View Policies</span>
                <span className="px-2 py-0.5 bg-sky-100 rounded-[99px] text-xs text-sky-500">Client Management</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ManageUsersPage; 