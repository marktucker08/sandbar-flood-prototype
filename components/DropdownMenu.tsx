'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



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
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className='text-sm transition-transform duration-200' />
      </button>

      <div
        className={`absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 transform transition-all duration-200 origin-top ${
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