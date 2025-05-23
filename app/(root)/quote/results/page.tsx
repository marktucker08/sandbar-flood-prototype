'use client';

import React from 'react';
import Link from 'next/link';
// import { useQuote } from '@/context/QuoteContext';

const staticQuoteData = {
  quoteId: "QOT-001",
  propertyAddress: "123 Main St",
  coverageAmount: 250000,
  premium: 1200,
  deductible: 500,
  effectiveDate: "2024-06-01",
  expirationDate: "2025-06-01",
  status: "pending",
  riskFactor: 1,
  buildingCoverage: 200000,
  contentsCoverage: 50000,
  lossOfUseCoverage: 10000,
  buildingReplacementCost: 210000,
  contentsReplacementCost: 55000,
  yearBuilt: "1990",
  squareFootage: "2000",
  numberOfStories: "2",
  numberOfFamilies: "1",
  occupancyType: "Primary",
  foundationType: "Slab",
  constructionType: "Frame",
  floodZone: "AE"
};

const QuoteResultsPage = () => {
  // const { quoteData } = useQuote();
  const quoteData = staticQuoteData;

  if (!quoteData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">No Quote Found</h1>
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
                <h3 className="text-sm font-medium text-gray-500 mb-1">Quote ID</h3>
                <p className="text-lg font-semibold text-gray-900">{quoteData.quoteId}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                <p className="text-lg font-semibold text-gray-900">{quoteData.status}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Property Address</h3>
              <p className="text-lg font-semibold text-gray-900">{quoteData.propertyAddress}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Coverage Amount</h3>
                <p className="text-lg font-semibold text-gray-900">${quoteData.coverageAmount.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Premium</h3>
                <p className="text-lg font-semibold text-gray-900">${quoteData.premium.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Deductible</h3>
                <p className="text-lg font-semibold text-gray-900">${quoteData.deductible.toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Effective Date</h3>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(quoteData.effectiveDate).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Expiration Date</h3>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(quoteData.expirationDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href={`/quote/${quoteData.quoteId}`}
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