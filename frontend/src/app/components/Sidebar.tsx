"use client";

import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const [dataSource, setDataSource] = useState("");
  const [chartType, setChartType] = useState("Card");

  const handleSubmit = () => {
    console.log("Adding widget:", { dataSource, chartType });
    setShowModal(false);
    setDataSource("");
    setChartType("Card");
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 relative">
      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        MyDashboard
      </div>

      <nav className="flex flex-col space-y-3">
        <Link href="/dashboard">
          <span className="block px-4 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer transition">
            Dashboard
          </span>
        </Link>

        <button
          onClick={() => setShowModal(true)}
          className="text-left block px-4 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer transition"
        >
          Add Widget
        </button>

        <Link href="/settings">
          <span className="block px-4 py-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 cursor-pointer transition">
            Settings
          </span>
        </Link>
      </nav>

      <div className="mt-auto">
        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Logout
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg w-full max-w-md p-6 space-y-6 relative">
            <h2 className="text-xl font-semibold">Add New Widget</h2>

            <div className="flex flex-col space-y-1">
              <label className="text-sm">Data Source</label>
              <input
                type="text"
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded px-3 py-2 text-gray-900 dark:text-gray-100"
                value={dataSource}
                onChange={(e) => setDataSource(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-sm">Chart Type</label>
              <select
                className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded px-3 py-2 text-gray-900 dark:text-gray-100"
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
              >
                <option>Card</option>
                <option>Line Chart</option>
                <option>Bar Chart</option>
                <option>Pie Chart</option>
                <option>Doughnut Chart</option>
              </select>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Add Widget
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
