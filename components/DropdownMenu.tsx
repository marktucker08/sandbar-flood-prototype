'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


interface DropdownMenuProps {
  label: string;
  items: {
    label: string;
    href: string;
  }[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = items.some(item => pathname.startsWith(item.href));

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`text-gray-700 hover:text-gray-900 flex items-center gap-1 py-2 ${
          isActive ? 'text-blue-600 font-medium' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 transform transition-all duration-200 origin-top z-50 ${
          isOpen 
            ? 'opacity-100 translate-y-0 visible' 
            : 'opacity-0 -translate-y-2 invisible'
        }`}
        role="menu"
      >
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`block px-4 py-2 text-sm transition-colors duration-150 ${
              pathname === item.href
                ? 'text-blue-600 bg-blue-50 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            role="menuitem"
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu; 