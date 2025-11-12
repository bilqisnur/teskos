"use client";

import KosList from "../../../components/kosList";
import { useState } from "react";
import SearchFilterBar from "../../../components/searchfilterbar";

export default function SocietyPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  return (
    <div className="min-h-screen bg-g radient-to-b from-red-500 to-white">
      {/* ✅ Search & Filter Section */}
      <div className="pt-6">
        <SearchFilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          genderFilter={genderFilter}
          onGenderChange={setGenderFilter}
        />
      </div>

      {/* ✅ Kos List */}
      <div className="flex justify-center mt-6">
        <KosList searchTerm={searchTerm} genderFilter={genderFilter} />
      </div>
    </div>
  );
}
