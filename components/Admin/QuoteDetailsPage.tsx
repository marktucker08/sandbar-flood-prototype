"use client";
import * as React from "react";
import PersonalDetails from "./QuoteDetails/PersonalDetails";
import ContactInformation from "./QuoteDetails/ContactInformation";
import PolicyInformation from "./QuoteDetails/PolicyInformation";
import CustomerHistory from "./QuoteDetails/CustomerHistory";
import QuoteStatus from "./QuoteDetails/QuoteStatus";
import QuoteBreakdown from "./QuoteDetails/QuoteBreakdown";
import DatesSection from "./QuoteDetails/DatesSection";
import DocumentsSection from "./QuoteDetails/DocumentsSection";
import ActionButtons from "./QuoteDetails/ActionButtons";
import { DashboardLayout } from "./DashboardLayout";
import { PageHeader } from "./PageHeader";
import Link from "next/link";   

const QuoteDetailsPage: React.FC = () => {
  return (
    <DashboardLayout>
      <main className="flex flex-col flex-1 gap-4 p-5">
        <PageHeader title="Quote Details" />
        <section className="p-6 bg-white rounded-xl border border-solid">
          <div className="flex gap-2 items-center mb-6">
            <Link href="/admin/dashboard/quotes">
              <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors">
                <i className="ti ti-arrow-left text-xl" />
                <span className="text-sm">Back</span>
              </button>
            </Link>
          </div>

          <div className="flex gap-3 items-center mb-8">
            <h2 className="text-xl font-bold text-gray-500">
              Quote Details - #09876
            </h2>
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              <i className="ti ti-copy text-xl" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-8 max-sm:grid-cols-1">
            <div className="flex flex-col gap-6">
              <PersonalDetails />
              <ContactInformation />
              <PolicyInformation />
              <CustomerHistory />
            </div>
            <div className="flex flex-col gap-6">
              <QuoteStatus />
              <QuoteBreakdown />
              <DatesSection />
              <DocumentsSection />
            </div>
          </div>
          <ActionButtons />
        </section>
      </main>
    </DashboardLayout>
  );
};

export default QuoteDetailsPage;
