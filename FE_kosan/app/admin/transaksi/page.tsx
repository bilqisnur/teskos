"use client";

import { useState } from "react";
import FilterBar from "../../../components/managerTemplate/filterBar";
import TransactionTable from "../../../components/managerTemplate/transactionTable";

export default function TransaksiPage() {
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const transactions = [
    { id: 1, name: "XII RPL 1", kosName: "Kos Bidadari", date: "Jan 11, 2050", status: "Online" },
    { id: 2, name: "XII VKJ 1", kosName: "Kos Putra", date: "Jan 11, 2050", status: "Offline" },
    { id: 3, name: "Company name", kosName: "Kos Mawar", date: "Jan 11, 2050", status: "Team name" },
  ];

  // Bisa nanti di-filter sesuai date/status/search
  const filtered = transactions.filter((t) => {
    const matchStatus = !status || t.status.toLowerCase().includes(status.toLowerCase());
    const matchDate = !date || t.date === date;
    const keyword = search.toLowerCase();

    // Keyword cocok di ID, nama, nama kos, atau status
    const matchKeyword =
      !search ||
      t.id.toString().includes(keyword) ||
      t.name.toLowerCase().includes(keyword) ||
      t.kosName.toLowerCase().includes(keyword) ||
      t.status.toLowerCase().includes(keyword) ||
      t.date.toLowerCase().includes(keyword);

    return matchStatus && matchDate && matchKeyword;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ff4b4b] to-[#f9d7d7] p-10">
      <h1 className="text-white text-2xl font-bold mb-6">History Transaksi</h1>

      <FilterBar
        date={date}
        status={status}
        search={search}
        onChangeDate={setDate}
        onChangeStatus={setStatus}
        onChangeSearch={setSearch}
      />

      <TransactionTable data={filtered} />
    </div>
  );
}
