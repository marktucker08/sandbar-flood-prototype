'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  const tabs = [
    { label: 'My Clients', href: '/manage/clients/my' },
    { label: 'My Quotes', href: '/manage/quotes/my' },
    { label: 'My Policies', href: '/manage/policies/my' },
    { label: 'Agency Quotes', href: '/manage/quotes/agency' },
  ];

  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-3">
          <div className="flex gap-6">
            {tabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`text-sm font-medium py-2 ${
                  pathname === tab.href
                    ? "text-amber-600 border-b-2 border-amber-600"
                    : "text-gray-700 hover:text-amber-600"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
} 