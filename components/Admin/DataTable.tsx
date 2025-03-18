"use client";
import React from "react";
import Link from "next/link";
import { DataTableProps } from "@/types/admin";

export const DataTable = <T extends { id: string }>({
  columns,
  data,
  onEdit,
  onView,
  editLink,
  viewLink,
  currentPage = 1,
  totalPages = 5,
  onPageChange,
}: DataTableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px]">
        <thead>
          <tr className="bg-gray-200 rounded-lg">
            {columns.map((column) => (
              <th key={column.key.toString()} className="p-4 text-sm text-left text-sky-950">
                {column.label}
              </th>
            ))}
            <th className="p-4 text-sm text-left text-sky-950">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b">
              {columns.map((column) => (
                <td key={column.key.toString()} className="p-4 text-sm text-gray-500">
                  {column.render
                    ? column.render(row[column.key as keyof T], row)
                    : String(row[column.key as keyof T])}
                </td>
              ))}
              <td className="p-4">
                <div className="flex gap-2">
                  {editLink && (
                    <Link href={`${editLink}/${row.id}`}>
                      <button className="px-2.5 py-1.5 rounded-md border border-solid">
                        <i className="ti ti-pencil" />
                      </button>
                    </Link>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row.id)}
                      className="px-2.5 py-1.5 rounded-md border border-solid"
                    >
                      <i className="ti ti-pencil" />
                    </button>
                  )}
                  {viewLink && (
                    <Link href={`${viewLink}/${row.id}`}>
                      <button className="px-2.5 py-1.5 rounded-md border border-solid">
                        <i className="ti ti-eye" />
                      </button>
                    </Link>
                  )}
                  {onView && (
                    <button
                      onClick={() => onView(row.id)}
                      className="px-2.5 py-1.5 rounded-md border border-solid"
                    >
                      <i className="ti ti-eye" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="flex gap-1 justify-center mt-4">
        <button
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded disabled:opacity-50"
        >
          <i className="ti ti-arrow-left" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange?.(page)}
            className={`px-3 py-2 text-gray-500 hover:bg-gray-100 rounded ${
              currentPage === page ? "bg-gray-100" : ""
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded disabled:opacity-50"
        >
          <i className="ti ti-arrow-right" />
        </button>
      </nav>
    </div>
  );
}; 