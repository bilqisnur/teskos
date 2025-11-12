"use client";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import KosCard from "./koscard";
import { headers } from "next/headers";
import { getCookie } from "@/lib/client-cookies";
import { useRouter } from "next/navigation";

interface KosImage {
  id: number;
  kos_id: number;
  file: string;
  created_at: string;
  updated_at: string;
}
interface Kos {
  id: number;
  name: string;
  address: string;
  price_per_month: number;
  gender: string;
  kos_image?: KosImage[];
}

interface KosListProps {
  searchTerm?: string;
  genderFilter?: string;
}

const KosList: FC<KosListProps> = ({ searchTerm = "", genderFilter = "" }) => {
  const [kosList, setKosList] = useState<Kos[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchKosList = async () => {
      try {
        const url =`https://learn.smktelkom-mlg.sch.id/kos/api/society/show_kos`
        const token = localStorage.getItem("token");
        const tokenCookie = getCookie("token");
        const makerID = "29";
        const { data } = await axios.get(url, {
          headers: {
            MakerID: makerID,
            Authorization: tokenCookie ? `Bearer ${tokenCookie}` : "",
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
      {filteredList.map((kos) => {
        // Pastikan gambar aman, meski array kosong atau null
        const imageUrl =
          kos.kos_image?.[0]?.file
            ? `https://learn.smktelkom-mlg.sch.id/kos/${kos.kos_image[0].file}`
            : "/image/default-living.png";

        return (
          <div
            key={kos.id}
            onClick={() => router.push(`/admin/kosanda/${kos.id}`)} // ✅ arahkan ke halaman detail [id]
            className="cursor-pointer transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <KosCard
              key={kos.id}
              name={kos.name}
              address={kos.address}
              price={kos.price_per_month}
              gender={kos.gender === "male" ? "putra" : "putri"}
              image={imageUrl}
            />
          </div>
        );
      })}
    </div>
  );
};

export default KosList;
