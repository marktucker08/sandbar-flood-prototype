import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import { LucideIcon, ChevronDown } from "lucide-react";

interface PageHeaderProps {
  title: string;
  actionButton?: {
    icon: LucideIcon;
    label: string;
    onClick: () => void;
  };
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, actionButton }) => {
  return (
    <header className="admin-header">
      <div className="flex flex-col gap-0.5">
        <h1 className="admin-header-title">
          {title}
        </h1>
        <nav aria-label="Breadcrumb">
          <ol className="admin-breadcrumb">
            <li>Sandbar Flood</li>
            <li className="admin-breadcrumb-separator">&gt;</li>
            <li aria-current="page">{title}</li>
          </ol>
        </nav>
      </div>

      <div className="admin-header-actions">
        {actionButton && (
          <Button 
            onClick={actionButton.onClick}
            variant="default"
            className="gap-2"
          >
            <actionButton.icon className="icon-sm" />
            <span className="text-sm font-medium">{actionButton.label}</span>
          </Button>
        )}
        <Link href="/admin/dashboard/profile" className="admin-profile-button">
          <Image
            src="https://ui-avatars.com/api/?name=Bruce+Banner"
            alt="Profile"
            className="admin-profile-image"
            width={32}
            height={32}
          />
          <div className="flex flex-col">
            <span className="admin-profile-name">Bruce Banner</span>
            <span className="admin-profile-role">Administrator</span>
          </div>
          <ChevronDown className="icon-sm text-gray-500" />
        </Link>
      </div>
    </header>
  );
}; 