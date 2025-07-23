import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Dashboard Header
        </h1>
        <div className="text-gray-500 dark:text-gray-400 text-sm">
          Welcome, User!
        </div>
      </div>
    </header>
  );
};

export default Header;
