"use client";
import React from "react";
import { StatusBadge } from "./StatusBadge";

export const QuotesTable = () => {
  return (
    <section className="p-6 bg-white rounded-xl border border-solid">
      <header className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-500">Quotes</h2>
        <button className="px-2.5 py-1.5 rounded-md border border-solid">
          <i className="ti ti-filter" />
        </button>
      </header>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="bg-gray-200 rounded-lg">
              <th className="p-4 text-sm text-left text-sky-950">Quote ID</th>
              <th className="p-4 text-sm text-left text-sky-950">
                Client Name
              </th>
              <th className="p-4 text-sm text-left text-sky-950">Type</th>
              <th className="p-4 text-sm text-left text-sky-950">Status</th>
              <th className="p-4 text-sm text-left text-sky-950">
                Premium Amount
              </th>
              <th className="p-4 text-sm text-left text-sky-950">
                Expire Date
              </th>
              <th className="p-4 text-sm text-left text-sky-950">
                Last Updated
              </th>
              <th className="p-4 text-sm text-left text-sky-950">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4 text-sm text-gray-500">#09876</td>
              <td className="p-4 text-sm text-gray-500">Theresa Heidenreich</td>
              <td className="p-4">
                <div className="flex gap-1 items-center px-2 py-0.5 bg-sky-100 rounded-[99px] w-fit">
                  <i className="ti ti-home text-sky-500" />
                  <span className="text-xs font-bold text-sky-500">Home</span>
                </div>
              </td>
              <td className="p-4">
                <StatusBadge status="pending" />
              </td>
              <td className="p-4 text-sm text-gray-500">$ 489.00</td>
              <td className="p-4 text-sm text-gray-500">28.12.2030</td>
              <td className="p-4 text-sm text-gray-500">23.10.2024</td>
              <td className="p-4">
                <div className="flex gap-2">
                  <button className="px-2.5 py-1.5 rounded-md border border-solid">
                    <i className="ti ti-edit" />
                  </button>
                  <button className="px-2.5 py-1.5 rounded-md border border-solid">
                    <i className="ti ti-eye" />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-4 text-sm text-gray-500">#09875</td>
              <td className="p-4 text-sm text-gray-500">
                Elijah Block-Schaden
              </td>
              <td className="p-4">
                <div className="flex gap-1 items-center px-2 py-0.5 bg-sky-100 rounded-[99px] w-fit">
                  <i className="ti ti-building text-sky-500" />
                  <span className="text-xs font-bold text-sky-500">
                    Business
                  </span>
                </div>
              </td>
              <td className="p-4">
                <StatusBadge status="pending" />
              </td>
              <td className="p-4 text-sm text-gray-500">$ 3249.00</td>
              <td className="p-4 text-sm text-gray-500">31.12.2024</td>
              <td className="p-4 text-sm text-gray-500">22.10.2024</td>
              <td className="p-4">
                <div className="flex gap-2">
                  <button className="px-2.5 py-1.5 rounded-md border border-solid">
                    <i className="ti ti-edit" />
                  </button>
                  <button className="px-2.5 py-1.5 rounded-md border border-solid">
                    <i className="ti ti-eye" />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-4 text-sm text-gray-500">#09874</td>
              <td className="p-4 text-sm text-gray-500">Raul Padberg</td>
              <td className="p-4">
                <div className="flex gap-1 items-center px-2 py-0.5 bg-sky-100 rounded-[99px] w-fit">
                  <i className="ti ti-home text-sky-500" />
                  <span className="text-xs font-bold text-sky-500">Home</span>
                </div>
              </td>
              <td className="p-4">
                <StatusBadge status="approved" />
              </td>
              <td className="p-4 text-sm text-gray-500">$ 234.00</td>
              <td className="p-4 text-sm text-gray-500">31.12.2029</td>
              <td className="p-4 text-sm text-gray-500">23.10.2024</td>
              <td className="p-4">
                <div className="flex gap-2">
                  <button className="px-2.5 py-1.5 rounded-md border border-solid">
                    <i className="ti ti-edit" />
                  </button>
                  <button className="px-2.5 py-1.5 rounded-md border border-solid">
                    <i className="ti ti-eye" />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-4 text-sm text-gray-500">#09873</td>
              <td className="p-4 text-sm text-gray-500">Olive Grant</td>
              <td className="p-4">
                <div className="flex gap-1 items-center px-2 py-0.5 bg-sky-100 rounded-[99px] w-fit">
                  <i className="ti ti-home text-sky-500" />
                  <span className="text-xs font-bold text-sky-500">Home</span>
                </div>
              </td>
              <td className="p-4">
                <StatusBadge status="expired" />
              </td>
              <td className="p-4 text-sm text-gray-500">$ 80.00</td>
              <td className="p-4 text-sm text-gray-500">21.09.2024</td>
              <td className="p-4 text-sm text-gray-500">12.06.2024</td>
              <td className="p-4">
                <div className="flex gap-2">
                  <button className="px-2.5 py-1.5 rounded-md border border-solid">
                    <i className="ti ti-edit" />
                  </button>
                  <button className="px-2.5 py-1.5 rounded-md border border-solid">
                    <i className="ti ti-eye" />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-4 text-sm text-gray-500">#09872</td>
              <td className="p-4 text-sm text-gray-500">Jerome Mueller</td>
              <td className="p-4">
                <div className="flex gap-1 items-center px-2 py-0.5 bg-sky-100 rounded-[99px] w-fit">
                  <i className="ti ti-home text-sky-500" />
                  <span className="text-xs font-bold text-sky-500">Home</span>
                </div>
              </td>
              <td className="p-4">
                <StatusBadge status="approved" />
              </td>
              <td className="p-4 text-sm text-gray-500">$ 89.00</td>
              <td className="p-4 text-sm text-gray-500">23.10.2025</td>
              <td className="p-4 text-sm text-gray-500">23.10.2024</td>
              <td className="p-4">
                <div className="flex gap-2">
                  <button className="px-2.5 py-1.5 rounded-md border border-solid">
                    <i className="ti ti-edit" />
                  </button>
                  <button className="px-2.5 py-1.5 rounded-md border border-solid">
                    <i className="ti ti-eye" />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-4 text-sm text-gray-500">#09871</td>
              <td className="p-4 text-sm text-gray-500">Michelle Gerlach</td>
              <td className="p-4">
                <div className="flex gap-1 items-center px-2 py-0.5 bg-sky-100 rounded-[99px] w-fit">
                  <i className="ti ti-home text-sky-500" />
                  <span className="text-xs font-bold text-sky-500">Home</span>
                </div>
              </td>
              <td className="p-4">
                <StatusBadge status="pending" />
              </td>
              <td className="p-4 text-sm text-gray-500">$ 489.00</td>
              <td className="p-4 text-sm text-gray-500">28.12.2030</td>
              <td className="p-4 text-sm text-gray-500">23.10.2024</td>
              <td className="p-4">
                <div className="flex gap-2">
                  <button className="px-2.5 py-1.5 rounded-md border border-solid">
                    <i className="ti ti-edit" />
                  </button>
                  <button className="px-2.5 py-1.5 rounded-md border border-solid">
                    <i className="ti ti-eye" />
                  </button>
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-4 text-sm text-gray-500">#09870</td>
              <td className="p-4 text-sm text-gray-500">Randolph Gleichner</td>
              <td className="p-4">
                <div className="flex gap-1 items-center px-2 py-0.5 bg-sky-100 rounded-[99px] w-fit">
                  <i className="ti ti-home text-sky-500" />
                  <span className="text-xs font-bold text-sky-500">Home</span>
                </div>
              </td>
              <td className="p-4">
                <StatusBadge status="rejected" />
              </td>
              <td className="p-4 text-sm text-gray-500">$ 489.00</td>
              <td className="p-4 text-sm text-gray-500">28.12.2030</td>
              <td className="p-4 text-sm text-gray-500">23.10.2024</td>
              <td className="p-4">
                <div className="flex gap-2">
                  <button className="px-2.5 py-1.5 rounded-md border border-solid">
                    <i className="ti ti-edit" />
                  </button>
                  <button className="px-2.5 py-1.5 rounded-md border border-solid">
                    <i className="ti ti-eye" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <nav className="flex gap-1 justify-center mt-4">
          <button className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded">
            <i className="ti ti-chevron-left" />
          </button>
          {[6, 7, 8, 9, 10].map((page) => (
            <button
              key={page}
              className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded"
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded">
            <i className="ti ti-chevron-right" />
          </button>
        </nav>
      </div>
    </section>
  );
};
