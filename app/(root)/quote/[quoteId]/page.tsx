'use client';

import React from 'react';
import Link from 'next/link';
import { useQuote } from '@/context/QuoteContext';

const QuoteDetailsPage = () => {
  const { quoteData } = useQuote();

  if (!quoteData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Quote Not Found</h1>
          <p className="text-gray-600">The requested quote could not be found</p>
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
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Quote Details</h1>
              <p className="text-gray-600">Quote ID: {quoteData.quoteId}</p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/quote/results"
                className="bg-white text-gray-700 px-4 py-2 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Back to Results
              </Link>
              <button
                className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                onClick={() => window.print()}
              >
                Print Quote
              </button>
            </div>
          </div>

          <div className="space-y-8">
            {/* Property Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Property Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Property Address</h3>
                  <p className="text-gray-900">{quoteData.propertyAddress}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Flood Zone</h3>
                  <p className="text-gray-900">{quoteData.floodZone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Year Built</h3>
                  <p className="text-gray-900">{quoteData.yearBuilt}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Square Footage</h3>
                  <p className="text-gray-900">{quoteData.squareFootage} sq ft</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Number of Stories</h3>
                  <p className="text-gray-900">{quoteData.numberOfStories}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Number of Families</h3>
                  <p className="text-gray-900">{quoteData.numberOfFamilies}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Occupancy Type</h3>
                  <p className="text-gray-900">{quoteData.occupancyType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Foundation Type</h3>
                  <p className="text-gray-900">{quoteData.foundationType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Construction Type</h3>
                  <p className="text-gray-900">{quoteData.constructionType}</p>
                </div>
              </div>
            </div>

            {/* Coverage Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Coverage Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Building Coverage</h3>
                  <p className="text-gray-900">${(quoteData.buildingCoverage || 0).toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Contents Coverage</h3>
                  <p className="text-gray-900">${(quoteData.contentsCoverage || 0).toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Loss of Use Coverage</h3>
                  <p className="text-gray-900">${(quoteData.lossOfUseCoverage || 0).toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Deductible</h3>
                  <p className="text-gray-900">${(quoteData.deductible || 0).toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Building Replacement Cost</h3>
                  <p className="text-gray-900">${(quoteData.buildingReplacementCost || 0).toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Contents Replacement Cost</h3>
                  <p className="text-gray-900">${(quoteData.contentsReplacementCost || 0).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Policy Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Policy Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Annual Premium</h3>
                  <p className="text-gray-900">${(quoteData.premium || 0).toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Risk Factor</h3>
                  <p className="text-gray-900">{(quoteData.riskFactor || 0).toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Effective Date</h3>
                  <p className="text-gray-900">{new Date(quoteData.effectiveDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Expiration Date</h3>
                  <p className="text-gray-900">{new Date(quoteData.expirationDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                  <p className="text-gray-900">{quoteData.status}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
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

export default QuoteDetailsPage;