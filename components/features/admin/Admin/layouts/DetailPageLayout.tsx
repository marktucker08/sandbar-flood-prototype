import React from "react";
import Link from "next/link";
import { ArrowLeft, Copy } from "lucide-react";

interface DetailPageLayoutProps {
  title: string;
  id: string;
  backLink: string;
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
  actionButtons: React.ReactNode;
}

const DetailPageLayout: React.FC<DetailPageLayoutProps> = ({
  title,
  id,
  backLink,
  leftColumn,
  rightColumn,
  actionButtons,
}) => {
  return (
    <section className="admin-content-section">
      <div className="flex gap-2 items-center mb-6">
        <Link href={backLink}>
          <button className="admin-back-button">
            <ArrowLeft className="icon-sm" />
            <span className="text-sm">Back</span>
          </button>
        </Link>
      </div>

      <div className="admin-quote-header">
        <h2 className="admin-quote-title">
          {title} - {id}
        </h2>
        <button className="text-gray-500 hover:text-gray-700 transition-colors">
          <Copy className="icon-md" />
        </button>
      </div>

      <div className="admin-quote-grid">
        <div className="admin-quote-column">
          {leftColumn}
        </div>
        <div className="admin-quote-column">
          {rightColumn}
        </div>
      </div>
      {actionButtons}
    </section>
  );
};

export default DetailPageLayout; 