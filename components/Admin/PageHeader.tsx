import React from "react";
import Image from "next/image";
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
    <header className="flex justify-between items-start max-sm:flex-col max-sm:gap-4">
      <div className="flex flex-col gap-0.5">
        <h1 className="text-5xl font-bold tracking-tighter text-sky-950 max-sm:text-3xl">
          {title}
        </h1>
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center text-base text-gray-500">
            <li>Sandbar Flood</li>
            <li className="mx-1">&gt;</li>
            <li aria-current="page">{title}</li>
          </ol>
        </nav>
      </div>

      <div className="flex gap-4 items-center">
        {actionButton && (
          <Button 
            onClick={actionButton.onClick}
            variant="default"
            className="gap-2"
          >
            <actionButton.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{actionButton.label}</span>
          </Button>
        )}
        <div className="flex items-center gap-3 px-4 py-2 rounded-lg border border-solid cursor-pointer hover:bg-gray-50 transition-colors">
          <Image
            src="https://ui-avatars.com/api/?name=Bruce+Banner"
            alt="Profile"
            className="w-8 h-8 rounded-full"
            width={32}
            height={32}
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-sky-950">Bruce Banner</span>
            <span className="text-xs text-gray-500">Administrator</span>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
    </header>
  );
}; 