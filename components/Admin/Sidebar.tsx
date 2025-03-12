import React from "react";
import { NavigationItem } from "./NavigationItem";
import Image from "next/image";

export const Sidebar = () => {
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
        <NavigationItem icon="ti ti-home" label="Home" />
        <NavigationItem icon="ti ti-file" label="Quotes" isActive />
        <NavigationItem icon="ti ti-file-check" label="Policies" />
        <NavigationItem icon="ti ti-users" label="Clients" />
        <NavigationItem icon="ti ti-user-circle" label="Manage Users" />
        <NavigationItem icon="ti ti-building" label="Inspections" />
        <NavigationItem icon="ti ti-settings" label="System Settings" />
      </nav>
      <hr className="mx-0 my-3 h-px bg-gray-200" />
      <div className="mt-auto">
        <hr className="mx-0 my-3 h-px bg-gray-200" />
      </div>
    </aside>
  );
};
