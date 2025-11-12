"use client";

import { FC } from "react";
import { Search } from "lucide-react";

interface SearchFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  genderFilter: string;
  onGenderChange: (value: string) => void;
}

const SearchFilterBar: FC<SearchFilterBarProps> = ({
  searchTerm,
  onSearchChange,
  genderFilter,
  onGenderChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
      {/* Search Bar */}
      <div className="relative w-full sm:w-[60%]">
        <Search className="absolute left-4 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Jelajahi kos pilihanmu sekarang"
          className="w-full pl-10 pr-4 py-2 rounded-full shadow-md text-gray-700 text-sm outline-none"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3">
        <button
          className={`px-5 py-2 rounded-full text-sm font-semibold border transition ${
            genderFilter === "putra"
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border-gray-300"
          }`}
          onClick={() => onGenderChange("putra")}
        >
          Putra
        </button>
        <button
          className={`px-5 py-2 rounded-full text-sm font-semibold border transition ${
            genderFilter === "putri"
              ? "bg-pink-600 text-white"
              : "bg-white text-gray-700 border-gray-300"
          }`}
          onClick={() => onGenderChange("putri")}
        >
          Putri
        </button>
      </div>
    </div>
  );
};

export default SearchFilterBar;
