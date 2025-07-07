"use client";

const CheckMarkIcon = () => {
  return (
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
  )
}

export default CheckMarkIcon;