"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import ReviewSection from "../../../../components/reviewSection";
import BookingForm from "./bookingForm";

interface KosDetail {
  id: number;
  nama: string;
  harga: number;
  lokasi: string;
  fasilitas: string;
  gambar: string;
  gender: string;
}

export default function KosDetailPage({ params }: { params: { id: string } }) {
  const [kos, setKos] = useState<KosDetail | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const fetchKos = async () => {
      try {
        const { data } = await axios.get(
          `https://learn.smktelkom-mlg.sch.id/kos/api/society/show_kos/${params.id}`
        );
        setKos(data.data);
      } catch (err) {
        console.error("Gagal ambil data kos:", err);
      } 
    };
    fetchKos();
  }, [params.id]);

  if (!kos)
    return (
      <div className="text-center py-10 text-gray-500">Kos tidak ditemukan</div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 relative">
      <div className="flex gap-6">
        <div className="flex-1">
          <Image
            src={kos.gambar}
            alt={kos.nama}
            width={500}
            height={350}
            className="rounded-xl object-cover"
          />
        </div>

        <div className="flex-1 space-y-3">
          <h1 className="text-2xl font-semibold text-gray-800">{kos.nama}</h1>

          <div className="flex items-center gap-2">
            <span className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full">
              {kos.gender}
            </span>
          </div>

          <p className="text-xl font-bold text-gray-900">
            Rp. {kos.harga.toLocaleString("id-ID")}
          </p>

          <p className="text-sm text-gray-600 leading-relaxed">{kos.lokasi}</p>

          <hr />

          <p className="text-sm text-gray-700">
            <strong>Fasilitas:</strong> {kos.fasilitas}
          </p>

          <button
            onClick={() => setShowBooking(true)}
            className="mt-3 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            BOOK NOW
          </button>
        </div>
      </div>

      <ReviewSection kosId={parseInt(params.id)} />

      {showBooking && (
        <BookingForm
          kosName={kos.nama}
          kosId={kos.id}
          onClose={() => setShowBooking(false)}
        />
      )}
    </div>
  );
}