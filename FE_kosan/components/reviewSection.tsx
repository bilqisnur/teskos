"use client";
import { useEffect, useState, FormEvent } from "react";
import axios from "axios";

interface Review {
  id: number;
  user_name: string;
  review: string;
  created_at: string;
  reply?: {
    id: number;
    owner_name: string;
    reply_text: string;
    created_at: string;
  };
}

interface ReviewSectionProps {
  kosId: number;
  isOwner?: boolean; // tambahkan prop agar bisa reuse di halaman admin/owner
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ kosId, isOwner }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState("");
  const [replyText, setReplyText] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `https://learn.smktelkom-mlg.sch.id/kos/api/society/show_reviews/${kosId}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
        setReviews(data.data || []);
      } catch (err) {
        console.error("Gagal mengambil review:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [kosId]);

  // kirim review baru (society)
  const handleAddReview = async (e: FormEvent) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://learn.smktelkom-mlg.sch.id/kos/api/society/store_reviews/${kosId}`,
        { review: newReview },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            makerID: "29",
          },
        }
      );

      setReviews([
        ...reviews,
        {
          id: Math.random(),
          user_name: "Kamu",
          review: newReview,
          created_at: new Date().toLocaleDateString("id-ID"),
        },
      ]);

      setNewReview("");
    } catch (err) {
      console.error("Gagal menambahkan review:", err);
    }
  };

  // hapus review (society)
  const handleDeleteReview = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://learn.smktelkom-mlg.sch.id/kos/api/society/delete_review/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReviews(reviews.filter((r) => r.id !== id));
    } catch (err) {
      console.error("Gagal menghapus review:", err);
    }
  };

  // owner membalas review
  const handleReply = async (reviewId: number) => {
    const reply = replyText[reviewId];
    if (!reply?.trim()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `https://learn.smktelkom-mlg.sch.id/kos/api/owner/reply_review/${reviewId}`,
        { reply: reply },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            MakerID: "29",
          },
        }
      );

      setReviews(
        reviews.map((r) =>
          r.id === reviewId
            ? {
                ...r,
                reply: {
                  id: Math.random(),
                  owner_name: "Anda",
                  reply_text: reply,
                  created_at: new Date().toLocaleDateString("id-ID"),
                },
              }
            : r
        )
      );

      setReplyText({ ...replyText, [reviewId]: "" });
    } catch (err) {
      console.error("Gagal membalas review:", err);
    }
  };

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-3 text-lg">
        Komentar Pengguna
      </h3>

      {loading ? (
        <p className="text-sm text-gray-500">Memuat komentar...</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-gray-500">Belum ada komentar.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="border-b pb-3">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium text-gray-800">{r.user_name}</p>
                  <p className="text-sm text-gray-700">{r.review}</p>
                  <p className="text-xs text-gray-400">{r.created_at}</p>
                </div>

                <button
                  onClick={() => handleDeleteReview(r.id)}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Hapus
                </button>
              </div>

              {/* Balasan Owner */}
              {r.reply ? (
                <div className="ml-6 mt-2 p-3 bg-gray-50 rounded-md">
                  <p className="font-semibold text-gray-800">
                    {r.reply.owner_name} (Pemilik)
                  </p>
                  <p className="text-sm text-gray-700">{r.reply.reply_text}</p>
                  <p className="text-xs text-gray-400">{r.reply.created_at}</p>
                </div>
              ) : isOwner ? (
                <div className="ml-6 mt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Balas komentar..."
                    value={replyText[r.id] || ""}
                    onChange={(e) =>
                      setReplyText({ ...replyText, [r.id]: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-red-400"
                  />
                  <button
                    onClick={() => handleReply(r.id)}
                    className="bg-red-500 text-white px-3 rounded-md text-sm"
                  >
                    Kirim
                  </button>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {/* Tambah komentar untuk society */}
      {!isOwner && (
        <form onSubmit={handleAddReview} className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Tambahkan komentar..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Kirim
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewSection;
