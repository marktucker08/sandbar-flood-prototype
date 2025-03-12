import Image from "next/image";
import React from "react";
import Link from "next/link";

interface QuickActionButtonProps {
  icon: string;
  label: string;
  link: string;
}

export default function QuickActionButton({
  icon,
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
          <Image
            src={icon}
            className="w-6 h-6 object-contain"
            alt={label}
            width={24}
            height={24}
          />
        </div>
        <span className="text-center text-sm font-medium text-gray-900">
          {label}
        </span>
      </Link>
    </div>
  );
}
