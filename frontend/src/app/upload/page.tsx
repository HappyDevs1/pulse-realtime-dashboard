"use client";

import React, { useState, DragEvent } from "react";

export default function Upload () {

  const [fileName, setFileName] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      // I will handle logic to send to api here
    }
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        htmlFor="file-upload"
        className={`w-full max-w-md flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 cursor-pointer transition-colors ${
          dragActive ? "border-blue-400 bg-gray-800" : "border-gray-600 bg-black"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-gray-300 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M12 12V3m0 0L8.5 6.5M12 3l3.5 3.5"
          />
        </svg>
        <p className="text-gray-300 text-center">
          {fileName ? (
            <>
              <span className="text-green-400 font-medium">Uploaded:</span> {fileName}
            </>
          ) : (
            "Drag & drop your file here or click to upload"
          )}
        </p>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileInput}
        />
      </label>
    </div>
  )
}