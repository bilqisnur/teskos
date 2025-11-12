"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { getCookie } from "@/lib/client-cookies";

interface Pesanan {
  id: number;
  name: string;
  address: string;
  price_per_month: number;
  status: string;
  image?: string;
}

export default function PesananPage() {
  const [pesananList, setPesananList] = useState<Pesanan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPesanan = async () => {
      try {
        const token = localStorage.getItem("token");
        const makerId = "29"; // sesuaikan dengan ID user login
        const tokenCookie = getCookie("token");
        console.log(' tokenCookie : ' + tokenCookie);

        const { data } = await axios.get(
          "https://learn.smktelkom-mlg.sch.id/kos/api/society/show_bookings",
          {
            headers: {
              "MakerID": makerId,
              "Authorization": tokenCookie ? `Bearer ${tokenCookie}` : "",
            },
          }
        );

        // Asumsi data.data berisi array pesanan
        setPesananList(data.data || []);
      } catch (error) {
        console.error("Gagal mengambil data pesanan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPesanan();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">Memuat pesanan...</p>
    );
  }

  if (pesananList.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        Belum ada pesanan.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500 to-white py-10">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {pesananList.map((p) => (
          <div
            key={p.id}
            className="bg-white flex flex-col sm:flex-row items-center sm:items-start justify-between rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 gap-5 border border-gray-100"
          >
            {/* Gambar + info kos */}
            <div className="flex items-center gap-5 w-full sm:w-auto">
              <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-gray-200">
                <Image
                  src={p.image || "/image/default-living.png"}
                  alt={p.name}
                  width={112}
                  height={112}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">{p.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{p.address}</p>
                <p className="text-base font-bold text-green-600 mt-2">
                  Rp {p.price_per_month.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="w-full sm:w-auto flex justify-end">
              <span
                className={`${
                  p.status === "menunggu konfirmasi"
                    ? "bg-red-500"
                    : p.status === "disetujui"
                    ? "bg-green-500"
                    : "bg-yellow-400"
                } text-white text-sm font-medium px-5 py-2 rounded-full shadow-sm capitalize`}
              >
                {p.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
