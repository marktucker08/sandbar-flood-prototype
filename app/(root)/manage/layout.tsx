"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const QuotesLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isMyQuotes = pathname === "/manage/quotes/my";
  const isAgencyQuotes = pathname === "/manage/quotes/agency";
  const isMyClients = pathname === "/manage/clients/my";
  const isMyPolicies = pathname === "/manage/policies/my";
  
  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex gap-6">
            <Link
              href="/manage/quotes/my"
              className={`text-sm font-medium ${
                isMyQuotes
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              My Quotes
            </Link>
            <Link
              href="/manage/quotes/agency"
              className={`text-sm font-medium ${
                isAgencyQuotes
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Agency Quotes
            </Link>
            <Link
              href="/manage/clients/my"
              className={`text-sm font-medium ${
                isMyClients
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              My Clients
            </Link>
            <Link
              href="/manage/policies/my"
              className={`text-sm font-medium ${
                isMyPolicies
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              My Policies
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default QuotesLayout; 