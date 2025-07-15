"use client";

import React, { useState } from "react";
import { CalendarDays } from "lucide-react";

const ranges = ["Last 7 Days", "Last 30 Days", "Custom Range"];

export default function DateRangeSelector({
  selected,
  onChange,
}: {
  selected: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        <CalendarDays className="w-4 h-4 text-indigo-500" />
        {selected}
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          viewBox="0 0 20 20"
          stroke="currentColor"
        >
          <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <ul className="py-1 text-sm text-gray-700">
            {ranges.map((range) => (
              <li
                key={range}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                  selected === range ? "font-semibold text-indigo-600" : ""
                }`}
                onClick={() => {
                  onChange(range);
                  setOpen(false);
                }}
              >
                {range}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
