"use client";

import { useState } from "react";
import { useProtectPage } from "../hooks/useProtectPage";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  useProtectPage();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden flex items-center justify-between bg-white dark:bg-gray-900 shadow p-4">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <button
          className="text-gray-600 dark:text-gray-300"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {/* Menu icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`w-full md:w-64 shadow-md z-10 transform ${
          sidebarOpen ? "block" : "hidden"
        } md:block bg-white dark:bg-gray-900`}
      >
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="hidden md:block shadow p-4 bg-white dark:bg-gray-900">
          <Header />
        </header>

        {/* Dashboard Content */}
        <div className="p-4 space-y-10">
          {/* Cards Section */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Card 1", "Card 2", "Card 3", "Card 4"].map((title, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 shadow rounded-lg p-6 text-center"
              >
                {title}
              </div>
            ))}
          </section>

          {/* Graph Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 shadow rounded-lg h-72 p-4 text-center">
              Line Chart
            </div>
            <div className="bg-white dark:bg-gray-900 shadow rounded-lg h-72 p-4 text-center">
              Bar Graph
            </div>
          </section>

          {/* Pie Charts */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 shadow rounded-lg h-64 p-4 text-center">
              Pie Chart
            </div>
            <div className="bg-white dark:bg-gray-900 shadow rounded-lg h-64 p-4 text-center">
              Doughnut Chart
            </div>
          </section>

          {/* Subscribers List */}
          <section className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-900 shadow rounded-lg h-80 p-4 text-center overflow-auto">
              Subscribers List
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
