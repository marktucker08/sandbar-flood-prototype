import React from "react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface QuickActionButtonProps {
  icon: LucideIcon;
  label: string;
  link: string;
}

export default function QuickActionButton({
  icon: Icon,
  label,
  link,
}: QuickActionButtonProps) {
  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-[200px]">
      <Link 
        href={link} 
        className="flex flex-col items-center gap-2 w-full transition-transform duration-300 hover:scale-105"
      >
        <div className="flex justify-center items-center w-14 h-14 bg-amber-200 border border-solid border-zinc-400 rounded-full">
          <Icon className="w-6 h-6 text-gray-900" />
        </div>
        <span className="text-center text-sm font-medium text-gray-900">
          {label}
        </span>
      </Link>
    </div>
  );
}
