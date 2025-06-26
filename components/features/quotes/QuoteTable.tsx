import React from 'react';
import { Quote } from '@/types/admin';
import { StatusBadge } from '@/components/common/ui/status-badge';

interface QuoteTableProps {
  quotes: Quote[];
  onQuoteClick?: (quote: Quote) => void;
}

const QuoteTable: React.FC<QuoteTableProps> = ({ quotes, onQuoteClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs truncate">
              Client Name
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-xs truncate">
              Property
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap hidden md:table-cell">
              Created Date
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
              Premium
            </th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {quotes.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-3 py-2 text-center text-gray-500 text-sm">
                No quotes found
              </td>
            </tr>
          ) : (
            quotes.map((quote) => (
              <tr
                key={quote.id}
                onClick={() => onQuoteClick?.(quote)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-3 py-2 text-sm font-medium text-gray-900 max-w-xs truncate">
                  {quote.clientName}
                </td>
                <td className="px-3 py-2 text-sm text-gray-900 max-w-xs truncate">
                  {quote.property}
                </td>
                <td className="px-3 py-2 text-xs text-gray-500 whitespace-nowrap hidden md:table-cell">
                  {quote.createdDate}
                </td>
                <td className="px-3 py-2 text-xs text-gray-900 whitespace-nowrap">
                  {quote.premium}
                </td>
                <td className="px-3 py-2">
                  <StatusBadge status={quote.status} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QuoteTable; 