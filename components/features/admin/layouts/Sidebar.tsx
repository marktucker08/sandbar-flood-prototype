"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationItem } from "@/components/features/admin/NavigationItem";
import Image from "next/image";
import { 
  Home, 
  FileText, 
  FileCheck, 
  Users, 
  Settings, 
  Search,
  ShieldUser, 
} from "lucide-react";

export const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
    { icon: FileText, label: "Quotes", href: "/admin/dashboard/quotes" },
    { icon: FileCheck, label: "Policies", href: "/admin/dashboard/policies" },
    { icon: Users, label: "Clients", href: "/admin/dashboard/clients" },
    { icon: ShieldUser, label: "Manage Users", href: "/admin/dashboard/settings/users" },
    { icon: Settings, label: "System Settings", href: "/admin/dashboard/settings" },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="flex flex-col gap-3">
        <Link href="/" className="flex items-center">
          <Image
            src="/SandBar.png"
            alt="Logo"
            className="mb-3 w-36"
            width={144}
            height={56}
          />
        </Link>
        <hr className="admin-divider" />
        <div className="admin-search-container">
          <Search className="icon-sm text-neutral-600" />
          <input
            type="text"
            placeholder="Search"
            className="admin-search-input text-neutral-800"
          />
        </div>
      </div>
      <nav className="flex flex-col gap-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-link ${isActive ? 'admin-nav-link-active' : ''}`}
            >
              <item.icon className="icon-sm" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <hr className="admin-divider" />
      <div className="mt-auto">
        <Link href="/" className="block">
          <NavigationItem icon={Home} label="Sandbar Homepage" />
        </Link>
        <hr className="admin-divider" />
      </div>
    </aside>
  );
};
