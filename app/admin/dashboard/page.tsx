'use client';

import React from 'react';
import StatsCard, { sampleStats } from '@/components/features/admin/StatsCard';
import ActivityFeed from '@/components/features/admin/ActivityFeed';
import UpcomingInspections from '@/components/features/admin/UpcomingInspections';
import { PageHeader } from '@/components/features/admin/PageHeader';
import { Download } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="admin-page-container">
      <PageHeader 
        title="Admin Dashboard"
        actionButton={{
          icon: Download,
          label: "Generate Report", 
          onClick: () => console.log("Generate Report clicked")
        }}
      />

      <div className="admin-stats-grid">
        {sampleStats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="admin-content-grid">
        <div className="admin-card">
          <h2 className="admin-section-header">Recent Activity</h2>
          <ActivityFeed />
        </div>
        <div className="admin-card">
          <h2 className="admin-section-header">Upcoming Inspections</h2>
          <UpcomingInspections />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 