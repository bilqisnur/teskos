"use client";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import KosCard from "./koscard";
import { headers } from "next/headers";


interface Kos {
  id: number;
  name: string;
  address: string;
  price_per_month: number;
  gender: string;
  image?: string;
}

interface KosListProps {
  searchTerm?: string;
  genderFilter?: string;
}

const KosList: FC<KosListProps> = ({ searchTerm = "", genderFilter = "" }) => {
  const [kosList, setKosList] = useState<Kos[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKosList = async () => {
      try {
        const url =`https://learn.smktelkom-mlg.sch.id/kos/api/admin/show_kos`
        const token = localStorage.getItem("token");
        const makerID = "29";
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Data kos berhasil diambil:", data);

        setKosList(data.data || []); // antisipasi struktur response
      } catch (error) {
        console.error("Gagal ambil data kos:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchKosList();
  }, []);

  const filteredList = kosList.filter((kos) => {
    const matchesSearch =
      kos.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kos.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender =
      !genderFilter || kos.gender.toLowerCase() === genderFilter.toLowerCase();
    return matchesSearch && matchesGender;
  });

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading data kos...</p>;
  if (filteredList.length === 0)
    return <p className="text-center mt-10 text-gray-500">Tidak ada kos ditemukan.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {filteredList.map((kos) => (
        <KosCard
          key={kos.id}
          name={kos.name}
          address={kos.address}
          price={kos.price_per_month}
          gender={kos.gender === "male" ? "putra" : "putri"}
          image={kos.image || "/default-kos.jpg"}
        />
      ))}
    </div>
  );
};

export default KosList;
