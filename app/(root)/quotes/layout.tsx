"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const QuotesLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const isMyQuotes = pathname === "/quotes/my";
  const isAgencyQuotes = pathname === "/quotes/agency";

  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex gap-6">
            <Link
              href="/quotes/my"
              className={`text-sm font-medium ${
                isMyQuotes
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              My Quotes
            </Link>
            <Link
              href="/quotes/agency"
              className={`text-sm font-medium ${
                isAgencyQuotes
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Agency Quotes
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default QuotesLayout; 