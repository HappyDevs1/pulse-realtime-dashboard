"use client";

import React, { useState, DragEvent, FormEvent } from "react";
import { uploadFile } from "../services/upload";

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setFileName(droppedFile.name);
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
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      const orgId = 1; // Will replace this with the actual organisation ID later
      const response = await uploadFile(file, orgId.toString());
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center min-h-[50vh] gap-4 bg-black px-4"
    >
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
              <span className="text-green-400 font-medium">Selected:</span> {fileName}
            </>
          ) : (
            "Drag & drop your file here or click to choose one"
          )}
        </p>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept=".csv"
          onChange={handleFileInput}
        />
      </label>

      <button
        type="submit"
        disabled={!file}
        className={`mt-2 bg-blue-600 text-white font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300 ${
          !file ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
      >
        Submit File
      </button>
    </form>
  );
}
