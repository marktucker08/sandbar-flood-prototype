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
  const [quoteData, setQuoteData] = useState<QuoteDetails | null>({
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
  });
  
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