'use client';

import React from 'react';
import Image from 'next/image';

interface Inspection {
  id: string;
  propertyAddress: string;
  date: string;
  time: string;
  inspector: {
    name: string;
    avatar: string;
  };
  client: string;
  status: 'scheduled' | 'in-progress' | 'completed';
}

const sampleInspections: Inspection[] = [
  {
    id: 'INS-001',
    propertyAddress: '123 Main St, Austin, TX 78701',
    date: '2024-03-25',
    time: '10:00 AM',
    inspector: {
      name: 'Mike Wilson',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Wilson',
    },
    client: 'John Doe',
    status: 'scheduled',
  },
  {
    id: 'INS-002',
    propertyAddress: '456 Oak Ave, Austin, TX 78702',
    date: '2024-03-26',
    time: '2:30 PM',
    inspector: {
      name: 'Sarah Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson',
    },
    client: 'Jane Smith',
    status: 'scheduled',
  },
  {
    id: 'INS-003',
    propertyAddress: '789 Pine Rd, Austin, TX 78703',
    date: '2024-03-27',
    time: '11:15 AM',
    inspector: {
      name: 'Mike Wilson',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Wilson',
    },
    client: 'Acme Corp',
    status: 'scheduled',
  },
];

const getStatusColor = (status: Inspection['status']) => {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-50 text-blue-700';
    case 'in-progress':
      return 'bg-yellow-50 text-yellow-700';
    case 'completed':
      return 'bg-green-50 text-green-700';
    default:
      return 'bg-gray-50 text-gray-700';
  }
};

const UpcomingInspections: React.FC = () => {
  return (
    <div className="space-y-4">
      {sampleInspections.map((inspection) => (
        <div key={inspection.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="flex-shrink-0">
            <Image
              src={inspection.inspector.avatar}
              alt={inspection.inspector.name}
              className="w-10 h-10 rounded-full"
              width={40}
              height={40}
            />
          </div>
          <div className="flex-grow min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">{inspection.propertyAddress}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(inspection.status)}`}>
                {inspection.status}
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <i className="ti ti-calendar text-gray-400" />
                <span>{new Date(inspection.date).toLocaleDateString()}</span>
                <i className="ti ti-clock text-gray-400 ml-2" />
                <span>{inspection.time}</span>
              </div>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-sm text-gray-500">Inspector:</span>
              <span className="text-sm font-medium text-gray-900">{inspection.inspector.name}</span>
              <span className="text-sm text-gray-500 ml-2">Client:</span>
              <span className="text-sm font-medium text-gray-900">{inspection.client}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingInspections; 