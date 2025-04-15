'use client';

import Image from 'next/image';
import React from 'react';
import { FileText, ClipboardCheck, UserPlus, Activity } from 'lucide-react';

interface Activity {
  id: string;
  type: 'quote' | 'policy' | 'client';
  action: string;
  description: string;
  timestamp: string;
  user: {
    name: string;
    avatar: string;
  };
}

const sampleActivities: Activity[] = [
  {
    id: '1',
    type: 'quote',
    action: 'Created Quote',
    description: 'New flood insurance quote for 123 Main St.',
    timestamp: '2 hours ago',
    user: {
      name: 'John Smith',
      avatar: 'https://ui-avatars.com/api/?name=John+Smith',
    },
  },
  {
    id: '2',
    type: 'policy',
    action: 'Updated Policy',
    description: 'Modified coverage amounts for policy #POL-2024-001',
    timestamp: '3 hours ago',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson',
    },
  },
  {
    id: '4',
    type: 'client',
    action: 'Added Client',
    description: 'New client profile created for Acme Corp',
    timestamp: '1 day ago',
    user: {
      name: 'Emily Davis',
      avatar: 'https://ui-avatars.com/api/?name=Emily+Davis',
    },
  },
  {
    id: '5',
    type: 'quote',
    action: 'Approved Quote',
    description: 'Quote #Q-2024-089 approved for processing',
    timestamp: '1 day ago',
    user: {
      name: 'John Smith',
      avatar: 'https://ui-avatars.com/api/?name=John+Smith',
    },
  },
];

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'quote':
      return FileText;
    case 'policy':
      return ClipboardCheck;
    case 'client':
      return UserPlus;
    default:
      return Activity;
  }
};

const ActivityFeed: React.FC = () => {
  return (
    <div className="admin-card">
      <h3 className="admin-section-header">Activity Feed</h3>
      <div className="space-y-4">
        {sampleActivities.map((activity) => {
          const Icon = getActivityIcon(activity.type);
          return (
            <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-neutral-100 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-neutral-50 flex items-center justify-center"> 
                  <Icon className="icon-sm text-neutral-600" />
                </div>
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2">
                  <Image
                    src={activity.user.avatar}
                    alt={activity.user.name}
                    className="w-6 h-6 rounded-full"
                    width={24}
                    height={24}
                  />
                  <span className="form-value font-medium">{activity.user.name}</span>
                  <span className="form-value text-neutral-500">{activity.action}</span>
                </div>
                <p className="form-value text-neutral-600 mt-1">{activity.description}</p>
                <span className="text-xs text-neutral-400 mt-1 block">{activity.timestamp}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeed; 