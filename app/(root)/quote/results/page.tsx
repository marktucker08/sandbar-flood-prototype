'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface QuoteData {
  quote: {
    id: string;
    status: string;
    coverageAmount: number;
    premium: number;
    effectiveDate: string;
    expirationDate: string;
    userFriendlyQuoteId?: string;
  };
  property: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  } | null;
  coverage: {
    deductible: number;
  } | null;
}

const QuoteResultsPage = () => {
  const searchParams = useSearchParams();
  const quoteId = searchParams.get('quoteId');
  const [data, setData] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!quoteId) {
      setLoading(false);
      setError('No quote ID provided.');
      return;
    }
    const abortController = new AbortController();
    setLoading(true);
    fetch(`/api/quotes/${quoteId}`, {
      signal: abortController.signal,
      headers: {
        'Content-Type': 'application/json',
        // Add authentication headers if needed
      }
    })
      .then(async res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        } else {
          setData(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to fetch quote.');
          setLoading(false);
        }
      });
    return () => abortController.abort();
  }, [quoteId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">{error || 'No Quote Found'}</h1>
          <p className="text-gray-600">Please start a new quote request</p>
          <Link
            href="/quote/new"
            className="mt-4 inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
          >
            Start New Quote
          </Link>
        </div>
      </div>
    );
  }
  const { quote, property, coverage } = data;
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Quote Generated Successfully
            </h1>
            <p className="text-gray-600">
              Your flood insurance quotes are ready for review
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Quote Number</h3>
                <p className="text-lg font-semibold text-gray-900">{quote.userFriendlyQuoteId || quote.id}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                <p className="text-lg font-semibold text-gray-900">{quote.status}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Property Address</h3>
              <p className="text-lg font-semibold text-gray-900">{property?.address}, {property?.city}, {property?.state} {property?.zipCode}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Coverage Amount</h3>
                <p className="text-lg font-semibold text-gray-900">${quote.coverageAmount ? Number(quote.coverageAmount).toLocaleString() : 'N/A'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Premium</h3>
                <p className="text-lg font-semibold text-gray-900">${quote.premium ? Number(quote.premium).toLocaleString() : 'N/A'}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Deductible</h3>
                <p className="text-lg font-semibold text-gray-900">${coverage?.deductible ? Number(coverage.deductible).toLocaleString() : 'N/A'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Effective Date</h3>
                <p className="text-lg font-semibold text-gray-900">
                  {quote.effectiveDate ? new Date(quote.effectiveDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Expiration Date</h3>
                <p className="text-lg font-semibold text-gray-900">
                  {quote.expirationDate ? new Date(quote.expirationDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href={`/quote/${quote.id}`}
                className="flex-1 bg-amber-600 text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-amber-700 transition-colors"
              >
                View Full Quote Details
              </Link>
              <Link
                href="/"
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-green-700 transition-colors"
              >
                Submit for Approval
              </Link>
              <Link
                href="/"
                className="flex-1 bg-blue-400 text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-blue-500 transition-colors"
              >
                Request to Bind Quote
              </Link>
              <Link
                href="/"
                className="flex-1 bg-white text-gray-700 px-6 py-3 rounded-lg text-center font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Return to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteResultsPage; 