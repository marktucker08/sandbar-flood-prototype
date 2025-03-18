'use client';
import React, { useState } from 'react';
import Link from 'next/link';


interface DropdownMenuProps {
  label: string;
  items: {
    label: string;
    href: string;
  }[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="text-gray-700 hover:text-gray-900 flex items-center gap-1"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {label}
        <i className={`ti ti-chevron-down text-sm transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu; 