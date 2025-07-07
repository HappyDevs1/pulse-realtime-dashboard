"use client";

import { useRouter } from "next/navigation";
import React from "react";
import CheckMarkIcon from "./CheckMarkIcon";

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
      <CheckMarkIcon />
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
