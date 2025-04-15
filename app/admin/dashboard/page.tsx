'use client';

import React from 'react';
import { PageHeader } from '@/components/features/admin/PageHeader';
import StatsCard, { sampleStats } from '@/components/features/admin/StatsCard';
import ActivityFeed from '@/components/features/admin/ActivityFeed';

export default function AdminDashboard() {
  return (
    <div>
      <main className="admin-page-main">
        <PageHeader title="Admin Dashboard" />
        <div className="admin-content">
          <div className="admin-stats-grid">
          {sampleStats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
        <div className="admin-section">
          <h2 className="admin-section-header mt-4">Recent Activity</h2>
            <ActivityFeed />
          </div>
        </div>
      </main> 
    </div>
  );
} 