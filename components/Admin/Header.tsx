import Image from "next/image";
import React from "react";

export const Header = () => {
  return (
    <header className="flex justify-between items-center p-6">
      <div>
        <h1 className="text-2xl font-bold text-sky-950">Quotes</h1>
        <p className="text-sm text-gray-500">Manage your quotes</p>
      </div>
      <div className="flex gap-4 items-center">
        <button className="flex gap-2 items-center px-4 py-2 bg-sky-950 text-white rounded-lg">
          <i className="ti ti-plus" />
          <span className="text-sm font-medium">New Quote</span>
        </button>
        <div className="flex items-center gap-3 px-4 py-2 rounded-lg border border-solid cursor-pointer">
          <Image
            src="https://ui-avatars.com/api/?name=John+Doe"
            alt="Profile"
            className="w-8 h-8 rounded-full"
            width={32}
            height={32}
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-sky-950">John Doe</span>
            <span className="text-xs text-gray-500">Administrator</span>
          </div>
          <i className="ti ti-chevron-down text-gray-500" />
        </div>
      </div>
    </header>
  );
};
            