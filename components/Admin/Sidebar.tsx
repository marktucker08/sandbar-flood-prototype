"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationItem } from "./NavigationItem";
import Image from "next/image";
import { 
  Home, 
  FileText, 
  FolderOpen, 
  Users, 
  Shield, 
  BadgeCheck, 
  Settings, 
  Search 
} from "lucide-react";

export const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
    { icon: FileText, label: "Quotes", href: "/admin/dashboard/quotes" },
    { icon: FolderOpen, label: "Policies", href: "/admin/dashboard/policies" },
    { icon: Users, label: "Clients", href: "/admin/dashboard/clients" },
    { icon: Shield, label: "Inspections", href: "/admin/dashboard/inspections" },
    { icon: BadgeCheck, label: "Manage Users", href: "/admin/dashboard/settings/users" },
    { icon: Settings, label: "System Settings", href: "/admin/dashboard/settings" },
  ];

  return (
    <aside className="flex flex-col gap-3 p-4 border-r border-solid w-[220px] max-md:w-full max-md:border-b max-md:border-solid max-md:border-r-[none] bg-white">
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
        <hr className="mx-0 my-3 h-px bg-gray-200" />
        <div className="flex gap-2 items-center p-4 rounded-lg border border-solid">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full text-xs text-gray-400 border-none focus:outline-none bg-transparent"
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
              className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-sky-50 text-sky-950"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <hr className="mx-0 my-3 h-px bg-gray-200" />
      <div className="mt-auto">
        <Link href="/" className="block">
          <NavigationItem icon={Home} label="Sandbar Homepage" />
        </Link>
        <hr className="mx-0 my-3 h-px bg-gray-200" />
      </div>
    </aside>
  );
};
