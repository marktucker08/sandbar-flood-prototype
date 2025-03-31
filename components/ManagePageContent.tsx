import React from "react";
import QuickActionsSection from "@/components/QuickActionsSection";
import DashboardSection from "@/components/DashboardSection";
import SearchBar from "@/components/SearchBar";

interface ManagePageContentProps {
  title: string;
  searchPlaceholder: string;
  dashboardSections: {
    title: string;
    className?: string;
  }[];
  onSearch?: (searchTerm: string) => void;
}

const ManagePageContent: React.FC<ManagePageContentProps> = ({
  title,
  searchPlaceholder,
  dashboardSections,
  onSearch = (searchTerm: string) => {
    console.log('Searching for:', searchTerm);
  }
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200">
      <section className="container mx-auto px-6 py-8 max-w-[1920px]">
        <p className="text-2xl text-center mb-10 text-white font-semibold drop-shadow-sm">
          {title}
        </p>

        <SearchBar 
          placeholder={searchPlaceholder}
          onSearch={onSearch}
          className="mx-auto mb-8"
        />

        <QuickActionsSection />
        <div className="mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {dashboardSections.map((section) => (
              <div key={section.title} className="w-full">
                <DashboardSection
                  title={section.title}
                  className={section.className || "h-full"}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagePageContent; 