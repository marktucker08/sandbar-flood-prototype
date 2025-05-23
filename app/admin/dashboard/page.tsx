'use client';

import React from 'react';
import { PageHeader } from '@/components/features/admin/PageHeader';
import StatsCard, { sampleStats } from '@/components/features/admin/StatsCard';
import ActivityFeed from '@/components/features/admin/ActivityFeed';
import { useSupabaseSessionContext } from '@/context/SupabaseSessionContext';

export default function AdminDashboard() {
  const { user, loading } = useSupabaseSessionContext();
  return (
    <div>
      <main className="admin-page-main">
        <PageHeader title="Admin Dashboard" />
        <div className="mb-4 text-right text-sm text-gray-500">
          {loading
            ? "Loading user..."
            : user
              ? <>Logged in as: <span className="font-semibold">{user.email}</span></>
              : "Not logged in"}
        </div>
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