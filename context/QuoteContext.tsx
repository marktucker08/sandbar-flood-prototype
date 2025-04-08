'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface QuoteDetails {
  quoteId: string;
  propertyAddress: string;
  coverageAmount: number;
  premium: number;
  deductible: number;
  effectiveDate: string;
  expirationDate: string;
  status: string;
  riskFactor: number;
  buildingCoverage: number;
  contentsCoverage: number;
  lossOfUseCoverage: number;
  buildingReplacementCost: number;
  contentsReplacementCost: number;
  yearBuilt: string;
  squareFootage: string;
  numberOfStories: string;
  numberOfFamilies: string;
  occupancyType: string;
  foundationType: string;
  constructionType: string;
  floodZone: string;
}

interface QuoteContextType {
  quoteData: QuoteDetails | null;
  setQuoteData: (data: QuoteDetails | null) => void;
  clearQuoteData: () => void;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [quoteData, setQuoteData] = useState<QuoteDetails | null>(null);

  const clearQuoteData = () => {
    setQuoteData(null);
  };

  return (
    <QuoteContext.Provider value={{ quoteData, setQuoteData, clearQuoteData }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
} 