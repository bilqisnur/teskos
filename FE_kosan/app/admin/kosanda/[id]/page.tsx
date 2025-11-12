"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

interface Kos {
  id: number;
  name: string;
  address: string;
  price_per_month: number;
  gender: string;
  facilities: string;
  image: string;
  reviews: Review[];
}

interface Review {
  id: number;
  reviewer_name: string;
  review: string;
  reply?: string;
}

export default function KosDetailOwner() {
  const { id } = useParams();
  const router = useRouter();
  const [kos, setKos] = useState<Kos | null>(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchKosDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `https://learn.smktelkom-mlg.sch.id/kos/api/owner/show_kos/${id}`,
          {
            headers: {
              MakerID: "29",
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
        setKos(data.data || data);
      } catch (error) {
        console.error("Gagal mengambil data kos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchKosDetail();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus kos ini?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://learn.smktelkom-mlg.sch.id/kos/api/owner/delete_kos/${id}`,
        {
          headers: {
            MakerID: "1",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      alert("Kos berhasil dihapus");
      router.push("/kosanda");
    } catch (error) {
      console.error("Gagal menghapus kos:", error);
    }
  };

  const handleReply = async (reviewId: number) => {
    if (!reply[reviewId]) return alert("Balasan tidak boleh kosong");
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://learn.smktelkom-mlg.sch.id/kos/api/owner/reply_review/${reviewId}`,
        { reply: reply[reviewId] },
        {
          headers: {
            MakerID: "1",
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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!kos) return <p className="text-center mt-10">Kos tidak ditemukan.</p>;

  return (
    <div className="p-10 flex flex-col lg:flex-row gap-10">
      <div className="w-full lg:w-1/2">
        <Image
          src={kos.image || "/default-kos.jpg"}
          alt={kos.name}
          width={500}
          height={300}
          className="rounded-xl w-full h-[400px] object-cover"
        />
      </div>

      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold">{kos.name}</h1>
          <span
            className={`px-3 py-1 text-white text-sm rounded-full ${
              kos.gender === "putri" ? "bg-red-500" : "bg-blue-500"
            }`}
          >
            {kos.gender}
          </span>
        </div>

        <p className="text-gray-600">{kos.address}</p>
        <p className="text-xl font-bold text-gray-800">
          Rp {kos.price_per_month.toLocaleString("id-ID")}/bulan
        </p>

        <p className="text-gray-600">
          <span className="font-semibold">Fasilitas:</span> {kos.facilities}
        </p>

        <div className="flex gap-4 mt-5">
          <button
            onClick={() => router.push(`/kosanda/edit/${kos.id}`)}
            className="bg-green-500 text-white px-5 py-2 rounded-lg shadow-md"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md"
          >
            Hapus
          </button>
        </div>
      </div>

      <div className="w-full mt-10 lg:mt-0 lg:w-1/3">
        <h2 className="text-lg font-semibold mb-3">Review dari Penyewa</h2>
        <div className="space-y-4">
          {kos.reviews && kos.reviews.length > 0 ? (
            kos.reviews.map((r) => (
              <div
                key={r.id}
                className="bg-gray-100 p-3 rounded-lg shadow-sm space-y-2"
              >
                <p className="font-semibold">{r.reviewer_name}</p>
                <p className="text-gray-700">{r.review}</p>

                {r.reply ? (
                  <div className="ml-5 text-sm bg-white p-2 rounded border">
                    <p className="text-gray-700">
                      <strong>Owner:</strong> {r.reply}
                    </p>
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
                      className="bg-pink-500 text-white px-3 py-1 rounded text-sm"
                    >
                      Kirim Balasan
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">Belum ada review.</p>
          )}
        </div>
      </div>
    </div>
  );
}
