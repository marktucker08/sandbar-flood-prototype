'use client';

import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { FileText, ShieldCheck, DollarSign, ClipboardCheck, TrendingUp, TrendingDown } from 'lucide-react';

interface HistoricalData {
  date: string;
  value: number;
}

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  type: 'quotes' | 'policies' | 'revenue' | 'inspections';
  historicalData?: HistoricalData[];
}

const getIcon = (type: StatsCardProps['type']) => {
  switch (type) {
    case 'quotes':
      return FileText;
    case 'policies':
      return ShieldCheck;
    case 'revenue':
      return DollarSign;
    case 'inspections':
      return ClipboardCheck;
    default:
      return FileText;
  }
};

const getIconColor = (type: StatsCardProps['type']) => {
  switch (type) {
    case 'quotes':
      return 'text-blue-600 bg-blue-100';
    case 'policies':
      return 'text-green-600 bg-green-100';
    case 'revenue':
      return 'text-purple-600 bg-purple-100';
    case 'inspections':
      return 'text-orange-600 bg-orange-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

const getChartColor = (type: StatsCardProps['type']) => {
  switch (type) {
    case 'quotes':
      return '#2563eb';
    case 'policies':
      return '#16a34a';
    case 'revenue':
      return '#9333ea';
    case 'inspections':
      return '#ea580c';
    default:
      return '#6b7280';
  }
};

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, type, historicalData }) => {
  const Icon = getIcon(type);
  
  return (
    <div className="admin-stats-card">
      <div className="admin-stats-header">
        <div>
          <p className="admin-stats-title">{title}</p>
          <p className="admin-stats-value">
            {typeof value === 'number' && type === 'revenue' ? `$${value.toLocaleString()}` : value}
          </p>
        </div>
        <div className={`admin-stats-icon-container ${getIconColor(type)}`}>
          <Icon className="admin-stats-icon" />
        </div>
      </div>

      {historicalData && (
        <div className="admin-stats-chart">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={historicalData}>
              <defs>
                <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={getChartColor(type)} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={getChartColor(type)} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={getChartColor(type)}
                fill={`url(#gradient-${type})`}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {change && (
        <div className={`admin-stats-change ${change.type === 'increase' ? 'admin-stats-change-positive' : 'admin-stats-change-negative'}`}>
          {change.type === 'increase' ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span>{Math.abs(change.value)}% from last month</span>
        </div>
      )}
    </div>
  );
};

// Sample historical data for the last 7 days
const generateHistoricalData = (baseValue: number, variance: number): HistoricalData[] => {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      date: date.toISOString().split('T')[0],
      value: baseValue + Math.random() * variance - variance / 2,
    };
  });
};

export const sampleStats = [
  {
    title: 'Total Quotes',
    value: 256,
    change: {
      value: 12,
      type: 'increase' as const,
    },
    type: 'quotes' as const,
    historicalData: generateHistoricalData(250, 20),
  },
  {
    title: 'Active Policies',
    value: 189,
    change: {
      value: 8,
      type: 'increase' as const,
    },
    type: 'policies' as const,
    historicalData: generateHistoricalData(185, 10),
  },
  {
    title: 'Monthly Revenue',
    value: 85600,
    change: {
      value: 5,
      type: 'increase' as const,
    },
    type: 'revenue' as const,
    historicalData: generateHistoricalData(83000, 5000),
  },
  {
    title: 'Pending Inspections',
    value: 24,
    change: {
      value: 3,
      type: 'decrease' as const,
    },
    type: 'inspections' as const,
    historicalData: generateHistoricalData(25, 5),
  },
];

export default StatsCard;
