'use client';

import Image from 'next/image';
import React from 'react';

interface Activity {
  id: string;
  type: 'quote' | 'policy' | 'inspection' | 'client';
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
    id: '3',
    type: 'inspection',
    action: 'Scheduled Inspection',
    description: 'Property inspection scheduled for 456 Oak Ave',
    timestamp: '5 hours ago',
    user: {
      name: 'Mike Wilson',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Wilson',
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
      return 'ti ti-file-dollar';
    case 'policy':
      return 'ti ti-clipboard-check';
    case 'inspection':
      return 'ti ti-clipboard-list';
    case 'client':
      return 'ti ti-user-plus';
    default:
      return 'ti ti-activity';
  }
};

const ActivityFeed: React.FC = () => {
  return (
    <div className="space-y-4">
      {sampleActivities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center">
              <i className={`${getActivityIcon(activity.type)} text-sky-600`} />
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
              <span className="text-sm font-medium text-gray-900">{activity.user.name}</span>
              <span className="text-sm text-gray-500">{activity.action}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
            <span className="text-xs text-gray-400 mt-1 block">{activity.timestamp}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed; 