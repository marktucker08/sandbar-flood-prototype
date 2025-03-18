'use client';

import React from 'react';
import StatsCard, { sampleStats } from '@/components/Admin/StatsCard';
import ActivityFeed from '@/components/Admin/ActivityFeed';
import UpcomingInspections from '@/components/Admin/UpcomingInspections';
import { PageHeader } from '@/components/Admin/PageHeader';

const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <PageHeader 
        title="Admin Dashboard"
        actionButton={{
          icon: "ti ti-export",
          label: "Generate Report", 
          onClick: () => console.log("Generate Report clicked")
        }}
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {sampleStats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <ActivityFeed />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Inspections</h2>
          <UpcomingInspections />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 