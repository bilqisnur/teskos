"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { getCookie } from "@/lib/client-cookies";

interface KosImage {
  id: number;
  kos_id: number;
  file: string;
  created_at: string;
  updated_at: string;
}

interface kos_facilities {
  id: number;
  kos_id: number;
  facility_name: string;
  created_at: string;
  updated_at: string;
}

interface Review {
  id: number;
  reviewer_name: string;
  review: string;
  reply?: string;
}

interface KosDetail {
  id: number;
  name: string;
  price_per_month: number;
  lokasi: string;
  gender: string;
  kos_facilities?: kos_facilities[];
  kos_image?: KosImage[];
  reviews?: Review[];
}

export default function KosDetailAdmin() {
  const { id } = useParams();
  const router = useRouter();
  const [kos, setKos] = useState<KosDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchKosDetail = async () => {
      try {
        const token = getCookie("token") || localStorage.getItem("token");
        const { data } = await axios.get(
          `https://learn.smktelkom-mlg.sch.id/kos/api/admin/detail_kos/${id}`,
          {
            headers: {
              MakerID: "29",
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
        setKos(data.data || data);
      } catch (error) {
        console.error("Gagal mengambil detail kos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchKosDetail();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus kos ini?")) return;
    try {
      const token = getCookie("token") || localStorage.getItem("token");
      await axios.delete(
        `https://learn.smktelkom-mlg.sch.id/kos/api/admin/delete_kos/${id}`,
        {
          headers: {
            MakerID: "29",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      alert("Kos berhasil dihapus!");
      router.push("/admin/kos");
    } catch (error) {
      console.error("Gagal menghapus kos:", error);
    }
  };

  const handleReply = async (reviewId: number) => {
    if (!reply[reviewId]) return alert("Balasan tidak boleh kosong");
    try {
      const token = getCookie("token") || localStorage.getItem("token");
      await axios.post(
        `https://learn.smktelkom-mlg.sch.id/kos/api/admin/reply_review/${reviewId}`,
        { reply: reply[reviewId] },
        {
          headers: {
            MakerID: "29",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      alert("Balasan terkirim!");
      setReply({ ...reply, [reviewId]: "" });
      location.reload();
    } catch (error) {
      console.error("Gagal mengirim balasan:", error);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading data kos...</p>;

  if (!kos)
    return (
      <p className="text-center mt-10 text-gray-500">
        Data kos tidak ditemukan.
      </p>
    );

  const imageUrl =
    kos.kos_image && kos.kos_image.length > 0
      ? `https://learn.smktelkom-mlg.sch.id/kos/${kos.kos_image[0].file}`
      : "/image/default-living.png";

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-1/2">
          <Image
            src={imageUrl}
            alt={kos.name}
            width={500}
            height={350}
            className="rounded-xl w-full h-[400px] object-cover shadow-md"
          />
        </div>

        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">{kos.name}</h1>
            <span
              className={`px-3 py-1 text-white text-sm rounded-full ${
                kos.gender === "putri" ? "bg-pink-500" : "bg-blue-500"
              }`}
            >
              {kos.gender}
            </span>
          </div>

          <p className="text-gray-700">{kos.lokasi}</p>

          <p className="text-xl font-bold text-gray-800">
            Rp {kos.price_per_month.toLocaleString("id-ID")}/bulan
          </p>

          <p className="text-gray-700">
            <strong>Fasilitas:</strong>{" "}
            {kos.kos_facilities?.map((f) => f.facility_name).join(", ") || "-"}
          </p>

          <div className="flex gap-4 mt-5">
            <button
              onClick={() => router.push(`/admin/kos/edit/${kos.id}`)}
              className="bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Review dari Penyewa</h2>
        {kos.reviews && kos.reviews.length > 0 ? (
          <div className="space-y-4">
            {kos.reviews.map((r) => (
              <div
                key={r.id}
                className="bg-gray-100 p-4 rounded-lg shadow-sm space-y-2"
              >
                <p className="font-semibold">{r.reviewer_name}</p>
                <p className="text-gray-700">{r.review}</p>

                {r.reply ? (
                  <div className="ml-5 text-sm bg-white p-2 rounded border">
                    <strong>Admin:</strong> {r.reply}
                  </div>
                ) : (
                  <div className="ml-3 space-y-2">
                    <textarea
                      placeholder="Balas review..."
                      value={reply[r.id] || ""}
                      onChange={(e) =>
                        setReply({ ...reply, [r.id]: e.target.value })
                      }
                      className="w-full border p-2 rounded-lg text-sm"
                    />
                    <button
                      onClick={() => handleReply(r.id)}
                      className="bg-pink-500 text-white px-3 py-1 rounded text-sm hover:bg-pink-600"
                    >
                      Kirim Balasan
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Belum ada review.</p>
        )}
      </div>
    </div>
  );
}
