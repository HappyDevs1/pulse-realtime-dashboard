"use client";

import { useRouter } from "next/navigation";
import React from "react";

interface SuccessPageProps {
  message: string;
  buttonText: string;
  redirectPath: string;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ message, buttonText, redirectPath }) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(redirectPath);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4 text-center">
      {/* Green checkmark */}
      <div className="bg-green-600 rounded-full p-4 mb-6 shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 111.414-1.414L8.414 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Message */}
      <h2 className="text-2xl font-semibold mb-4 text-green-400">{message}</h2>

      {/* Redirect button */}
      <button
        onClick={handleRedirect}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default SuccessPage;
