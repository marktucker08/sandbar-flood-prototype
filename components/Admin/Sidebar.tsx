"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationItem } from "./NavigationItem";
import Image from "next/image";

export const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { icon: "ti ti-home", label: "Dashboard", href: "/admin/dashboard" },
    { icon: "ti ti-file", label: "Quotes", href: "/admin/dashboard/quotes" },
    { icon: "ti ti-folder", label: "Policies", href: "/admin/dashboard/policies" },
    { icon: "ti ti-user", label: "Clients", href: "/admin/dashboard/clients" },
    { icon: "ti ti-shield", label: "Inspections", href: "/admin/dashboard/inspections" },
    { icon: "ti ti-id-badge", label: "Manage Users", href: "/admin/dashboard/settings/users" },
    { icon: "ti ti-settings", label: "System Settings", href: "/admin/dashboard/settings" },
  ];

  return (
    <aside className="flex flex-col gap-3 p-4 border-r border-solid w-[220px] max-md:w-full max-md:border-b max-md:border-solid max-md:border-r-[none] bg-white">
      <div className="flex flex-col gap-3">
        <Image
          src="/SandBar.png"
          alt="Logo"
          className="mb-3 w-36 h-14"
          width={144}
          height={56}
        />
        <hr className="mx-0 my-3 h-px bg-gray-200" />
        <div className="flex gap-2 items-center p-4 rounded-lg border border-solid">
          <i className="ti ti-search" />
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
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-sky-50 text-sky-950"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <i className={item.icon} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <hr className="mx-0 my-3 h-px bg-gray-200" />
      <div className="mt-auto">
        <Link href="/">
          <NavigationItem icon="ti ti-home" label="Sandbar Homepage" />
        </Link>
        <hr className="mx-0 my-3 h-px bg-gray-200" />
      </div>
    </aside>
  );
};
