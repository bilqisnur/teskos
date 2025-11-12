"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import KosCard from "@/components/koscard";
import { useRouter } from "next/navigation";
import AddKos from "./addkos";
import { getCookie } from "@/lib/client-cookies";

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

export default function KosAndaPage() {
  const [kosList, setKosList] = useState<Kos[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔹 Fetch data kos milik owner
  const fetchKos = async () => {
    try {
      setLoading(true);
      const makerId = "29";
      const token = localStorage.getItem("token");
      const tokenCookie = getCookie("token");
      console.log(' token : ' + token);
      console.log(' tokenCookie : ' + tokenCookie);
      
      const { data } = await axios.get(
        `https://learn.smktelkom-mlg.sch.id/kos/api/admin/show_kos?search=${search}`,
        {
          headers: {
            MakerID: makerId,
            Authorization: tokenCookie ? `Bearer ${tokenCookie}` : "",
          },
        }
      );

      setKosList(data.data || data);
    } catch (error) {
      console.error("Gagal ambil data kos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKos();
  }, [search]);

 return (
    <main className="min-h-screen bg-gradient-to-b from-white to-red-100">
      {/* 🔹 Header */}
      <div className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-semibold text-red-600">Kos Anda</h1>
        <AddKos />
      </div>

      {/* 🔹 Search bar */}
      <div className="flex justify-center px-10 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari kos anda..."
          className="w-full max-w-3xl border border-gray-300 rounded-full px-5 py-3 shadow-sm focus:ring-2 focus:ring-red-400 outline-none"
        />
      </div>

      {/* 🔹 Daftar Kos */}
      {loading ? (
        <p className="text-center text-gray-500 mt-10">Memuat data kos...</p>
      ) : kosList.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          Belum ada kos yang ditambahkan.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-8 pb-12">
          {kosList.map((kos) => {
            const imageUrl =
              kos.kos_image && kos.kos_image.length > 0
                ? `https://learn.smktelkom-mlg.sch.id/kos/${kos.kos_image[0].file}`
                : "/image/default-living.png";

            return (
              <div
                key={kos.id}
                onClick={() => router.push(`/admin/kosanda/${kos.id}`)} // ✅ arahkan ke halaman detail [id]
                className="cursor-pointer transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                  {/* Gambar Kos */}
                  <div className="relative h-48 w-full bg-gray-100">
                    <img
                      src={imageUrl}
                      alt={kos.name}
                      className="h-full w-full object-cover"
                      onError={(e) =>
                        (e.currentTarget.src = "/image/default-living.png")
                      }
                    />
                  </div>

                  {/* Info Kos */}
                  <div className="p-4">
                    <span
                      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-2 ${
                        kos.gender === "male"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-pink-100 text-pink-600"
                      }`}
                    >
                      {kos.gender === "male" ? "Putra" : "Putri"}
                    </span>

                    <h3 className="text-lg font-bold text-gray-800">
                      {kos.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{kos.address}</p>
                    <p className="text-base font-semibold text-gray-900">
                      Rp {Number(kos.price_per_month).toLocaleString("id-ID")}/bulan
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}