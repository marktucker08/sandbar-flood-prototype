"use client";
import React from "react";
import Link from "next/link"; 
import { ArrowLeft, ArrowRight, Pencil, Eye } from "lucide-react";
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
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr className="admin-table-header">
            {columns.map((column) => (
              <th key={column.key.toString()} className="admin-table-header-cell">
                {column.label}
              </th>
            ))}
            <th className="admin-table-header-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="admin-table-row">
              {columns.map((column) => (
                <td key={column.key.toString()} className="admin-table-cell">
                  {column.render
                    ? column.render(row[column.key as keyof T], row)
                    : String(row[column.key as keyof T])}
                </td>
              ))}
              <td className="admin-table-cell">
                <div className="admin-table-actions">
                  {editLink && (
                    <Link href={`${editLink}/${row.id}`}>
                      <button className="admin-table-action-button">
                        <Pencil className="icon-sm" />
                      </button>
                    </Link>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row.id)}
                      className="admin-table-action-button"
                    >
                      <Pencil className="icon-sm" />
                    </button>
                  )}
                  {viewLink && (
                    <Link href={`${viewLink}/${row.id}`}>
                      <button className="admin-table-action-button">
                        <Eye className="icon-sm" />
                      </button>
                    </Link>
                  )}
                  {onView && (
                    <button
                      onClick={() => onView(row.id)}
                      className="admin-table-action-button"
                    >
                      <Eye className="icon-sm" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="admin-table-pagination">
        <button
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={currentPage === 1}
          className="admin-table-pagination-button"
        >
          <ArrowLeft className="icon-sm" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange?.(page)}
            className={`admin-table-pagination-button ${
              currentPage === page ? "admin-table-pagination-button-active" : ""
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="admin-table-pagination-button"
        >
          <ArrowRight className="icon-sm" />
        </button>
      </nav>
    </div>
  );
}; 