import type { Status } from "@/lib/constants/status";

export interface Quote {
  id: string;
  clientName: string;
  property: string;
  status: Status;
  premium: string;
  createdDate: string;
  expiryDate: string;
}

export interface DetailedQuote extends Quote {
  // Personal Details
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  ssn: string;
  
  // Contact Information
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Policy Information
  propertyType: "Single Family" | "Multi Family" | "Commercial";
  floodZone: string;
  elevation: string;
  squareFootage: number;
  yearBuilt: number;
  
  // Customer History
  previousClaims: number;
  lastClaimDate: string | null;
  lastClaimAmount: string | null;
  
  // Quote Breakdown
  baseRate: string;
  floodZoneFactor: string;
  elevationFactor: string;
  deductibleFactor: string;
  totalPremium: string;
  
  // Documents
  documents: {
    id: string;
    name: string;
    type: string;
    uploadedDate: string;
  }[];
}

export interface Client {
  id: string;
  name: string;
  type: "Individual" | "Business";
  status: Status;
  email: string;
  phone: string;
  lastContact: string;
}

export interface Policy {
  id: string;
  clientName: string;
  type: "Residential" | "Commercial";
  status: Status;
  premium: string;
  effectiveDate: string;
  expiryDate: string;
}

export interface DetailedPolicy extends Policy {
  // Personal Details
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  ssn: string;
  
  // Contact Information
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Policy Information
  propertyType: "Single Family" | "Multi Family" | "Commercial";
  floodZone: string;
  elevation: string;
  squareFootage: number;
  yearBuilt: number;
  
  // Coverage Details
  coverageAmount: string;
  deductible: string;
  contentsCoverage: string;
  buildingCoverage: string;
  
  // Payment Information
  paymentFrequency: "Monthly" | "Quarterly" | "Annually";
  nextPaymentDate: string;
  lastPaymentDate: string;
  lastPaymentAmount: string;
  
  // Documents
  documents: {
    id: string;
    name: string;
    type: string;
    uploadedDate: string;
  }[];
}

export interface DetailedClient {
  clientId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  insuredType: 'individual' | 'business';
  businessName?: string;
  entityType?: 'corporation' | 'partnership' | 'llc' | 'limited_partnership' | 'unlimited_llc' | 'unlimited_partnership' | 'other';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  status: Status;
  policies: Policy[];
  quotes: Quote[];
}

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (value: T[keyof T] | string, row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  editLink?: string;
  viewLink?: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
} 