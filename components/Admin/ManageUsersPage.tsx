"use client";
import React from "react";
import { DashboardLayout } from "./DashboardLayout";
import { PageHeader } from "./PageHeader";
import { StatusBadge } from "./StatusBadge";

const ManageUsersPage: React.FC = () => {
  return (
    <DashboardLayout>
      <main className="flex flex-col flex-1 gap-4 p-5">
        <PageHeader 
          title="Manage Users" 
          actionButton={{
            icon: "ti ti-user-plus",
            label: "Add User",
            onClick: () => console.log("Add User clicked")
          }}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Active Users Section */}
          <section className="p-6 bg-white rounded-xl border border-solid lg:col-span-2">
            <header className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-500">Active Users</h2>
                <p className="text-sm text-gray-500 mt-1">Manage system users and their permissions</p>
              </div>
              <div className="flex gap-2">
                <button className="px-2.5 py-1.5 rounded-md border border-solid">
                  <i className="ti ti-filter" />
                </button>
                <button className="px-2.5 py-1.5 rounded-md border border-solid">
                  <i className="ti ti-download" />
                </button>
              </div>
            </header>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="bg-gray-200 rounded-lg">
                    <th className="p-4 text-sm text-left text-sky-950">Name</th>
                    <th className="p-4 text-sm text-left text-sky-950">Email</th>
                    <th className="p-4 text-sm text-left text-sky-950">Role</th>
                    <th className="p-4 text-sm text-left text-sky-950">Agency</th>
                    <th className="p-4 text-sm text-left text-sky-950">Status</th>
                    <th className="p-4 text-sm text-left text-sky-950">Last Active</th>
                    <th className="p-4 text-sm text-left text-sky-950">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 text-sm text-gray-500">John Smith</td>
                    <td className="p-4 text-sm text-gray-500">john.smith@agency.com</td>
                    <td className="p-4">
                      <div className="flex gap-1 items-center px-2 py-0.5 bg-sky-100 rounded-[99px] w-fit">
                        <i className="ti ti-user text-sky-500" />
                        <span className="text-xs font-bold text-sky-500">Agent</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-gray-500">ABC Insurance</td>
                    <td className="p-4">
                      <StatusBadge status="active" />
                    </td>
                    <td className="p-4 text-sm text-gray-500">2 hours ago</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button className="px-2.5 py-1.5 rounded-md border border-solid">
                          <i className="ti ti-pencil" />
                        </button>
                        <button className="px-2.5 py-1.5 rounded-md border border-solid text-red-500 hover:bg-red-50">
                          <i className="ti ti-trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Agencies Section */}
          <section className="p-6 bg-white rounded-xl border border-solid">
            <header className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-500">Agencies</h2>
                <p className="text-sm text-gray-500 mt-1">Manage partner agencies</p>
              </div>
              <button className="px-3 py-1.5 text-sm bg-sky-950 text-white rounded-lg hover:bg-sky-900 transition-colors">
                Add Agency
              </button>
            </header>
            <div className="space-y-4">
              <div className="p-4 border border-solid rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">ABC Insurance</h3>
                    <p className="text-xs text-gray-500">12 active users</p>
                  </div>
                  <StatusBadge status="active" />
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="px-2.5 py-1.5 text-xs text-sky-950 hover:bg-sky-50 rounded-lg transition-colors">
                    View Details
                  </button>
                  <button className="px-2.5 py-1.5 text-xs text-sky-950 hover:bg-sky-50 rounded-lg transition-colors">
                    Edit
                  </button>
                </div>
              </div>
              <div className="p-4 border border-solid rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">XYZ Agency</h3>
                    <p className="text-xs text-gray-500">8 active users</p>
                  </div>
                  <StatusBadge status="active" />
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="px-2.5 py-1.5 text-xs text-sky-950 hover:bg-sky-50 rounded-lg transition-colors">
                    View Details
                  </button>
                  <button className="px-2.5 py-1.5 text-xs text-sky-950 hover:bg-sky-50 rounded-lg transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Role Management Section */}
          <section className="p-6 bg-white rounded-xl border border-solid">
            <header className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-500">Role Management</h2>
                <p className="text-sm text-gray-500 mt-1">Configure role permissions</p>
              </div>
              <button className="px-3 py-1.5 text-sm text-sky-950 hover:bg-sky-50 rounded-lg transition-colors">
                Edit Roles
              </button>
            </header>
            <div className="space-y-4">
              <div className="p-4 border border-solid rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Sandbar Admin</h3>
                <p className="text-xs text-gray-500 mb-3">Full system access and configuration</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 bg-sky-100 rounded-[99px] text-xs text-sky-500">User Management</span>
                  <span className="px-2 py-0.5 bg-sky-100 rounded-[99px] text-xs text-sky-500">System Settings</span>
                  <span className="px-2 py-0.5 bg-sky-100 rounded-[99px] text-xs text-sky-500">Agency Management</span>
                </div>
              </div>
              <div className="p-4 border border-solid rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Agency Admin</h3>
                <p className="text-xs text-gray-500 mb-3">Agency-level management and reporting</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 bg-sky-100 rounded-[99px] text-xs text-sky-500">Agent Management</span>
                  <span className="px-2 py-0.5 bg-sky-100 rounded-[99px] text-xs text-sky-500">Quote Management</span>
                  <span className="px-2 py-0.5 bg-sky-100 rounded-[99px] text-xs text-sky-500">Agency Reports</span>
                </div>
              </div>
              <div className="p-4 border border-solid rounded-lg">
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
    </DashboardLayout>
  );
};

export default ManageUsersPage; 