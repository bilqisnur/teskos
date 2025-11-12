"use client";
import { useState } from "react";
import axios from "axios";

interface BookingFormProps {
  kosName: string;
  kosId: number;
  onClose: () => void;
}

export default function BookingForm({ kosName, kosId, onClose }: BookingFormProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        "https://learn.smktelkom-mlg.sch.id/kos/api/society/booking",
        {
          kos_id: kosId,
          start_date: startDate,
          end_date: endDate,
        },
        {
          headers: {
            makerID: "29", // nanti ganti pakai data user login
          },
        }
      );

      setMessage("Booking berhasil!");
      console.log(response.data);
    } catch (err) {
      console.error("Gagal booking:", err);
      setMessage("Terjadi kesalahan saat booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[400px] p-6 relative">
        <div className="bg-red-500 text-white text-lg font-semibold px-4 py-2 rounded-t-xl -mt-6 -mx-6">
          Kos {kosName}
        </div>

        <button
          onClick={onClose}
          className="absolute right-4 top-3 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        <form onSubmit={handleBooking} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mulai sewa
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Selesai sewa
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-red-500 text-white w-full py-2 rounded-lg hover:bg-red-600"
          >
            {loading ? "Memproses..." : "BOOKING"}
          </button>

          {message && (
            <p
              className={`text-sm text-center mt-2 ${
                message.includes("berhasil") ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
