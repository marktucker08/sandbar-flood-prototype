import React from "react";

interface NavigationItemProps {
  icon: string;
  label: string;
  isActive?: boolean;
}

export const NavigationItem = ({
  icon,
  label,
  isActive = false,
}: NavigationItemProps) => {
  return (
    <button
      className={`flex gap-2 items-center p-4 text-xs rounded-lg cursor-pointer w-full text-left transition-colors duration-200
        ${
          isActive
            ? "bg-sky-950 text-white"
            : "text-gray-500 hover:bg-gray-100 hover:text-sky-950"
        }`}
    >
      <i className={`${icon} text-base`} />
      <span className="font-medium">{label}</span>
    </button>
  );
};
