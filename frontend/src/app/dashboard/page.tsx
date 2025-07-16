"use client";

import { useProtectPage } from "../hooks/useProtectPage";

export default function Dashboard () {
  useProtectPage()

  return (
    <div className="grid grid-cols-1 gap-10 py-10 px-10">
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 justify-items-center">
        <div className="bg-gray-600 h-30 w-55 rounded-lg text-center">Card 1</div>
        <div className="bg-gray-600 h-30 w-55 rounded-lg text-center">Card 2</div>
        <div className="bg-gray-600 h-30 w-55 rounded-lg text-center">Card 3</div>
        <div className="bg-gray-600 h-30 w-55 rounded-lg text-center">Card 4</div>
      </div>
      {/* Graph Section */}
      <div className="grid grid-cols-1 justify-items-end gap-10 md:grid-cols-2 w-full">
        <div className="bg-gray-600 rounded-lg w-full md:w-[95%] h-120 text-center">Line Chart Card</div>
        <div className="bg-gray-600 rounded-lg w-full md:w-[75%] text-center h-120">Bar Graph Chart</div>
      </div>
      {/* PieChart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center w-full">
        <div className="bg-gray-600 rounded-lg w-full md:w-[80%] text-center h-70">Pie Chart</div>
        <div className="bg-gray-600 rounded-lg w-full md:w-[80%] text-center h-70">Doughnut Chart</div>
      </div>
      {/* Subsribers list */}
      <div className="">
        <div className="bg-gray-600 text-center rounded-lg w-full md:w-[60%] h-80">Subcribers List</div>
      </div>
    </div>
  )
}