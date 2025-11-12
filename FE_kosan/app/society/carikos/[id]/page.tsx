"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import ReviewSection from "../../../../components/reviewSection";
import BookingForm from "./bookingForm";
import { useParams, useRouter } from "next/navigation";
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

interface KosDetail {
  id: number;
  name: string;
  price_per_month: number;
  lokasi: string;
  kos_facilities?: kos_facilities[];
  kos_image?: KosImage[];
  gender: string;
}

export default function KosDetailPage() {
  const { id } = useParams();
  const [kos, setKos] = useState<KosDetail | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const fetchKos = async () => {
      try {
        const token = localStorage.getItem("token");
        const tokenCookie = getCookie("token");
        console.log(token);
        const { data } = await axios.get(
          `https://learn.smktelkom-mlg.sch.id/kos/api/society/detail_kos/${id}`,
          {
            headers: {
              MakerID: "29",
              Authorization: tokenCookie ? `Bearer ${tokenCookie}` : "",
            },
          }
        );
        setKos(data.data);
      } catch (err) {
        console.error("Gagal ambil data kos:", err);
      } 
    };
    fetchKos();
  }, [id]);

  if (!kos)
    return (
      <div className="text-center py-10 text-gray-500">Kos tidak ditemukan</div>
    );

  const imageUrl =
    kos.kos_image && kos.kos_image.length > 0
      ? `https://learn.smktelkom-mlg.sch.id/kos/${kos.kos_image[0].file}`
      : "/image/default-living.png";

  return (
    <div className="max-w-5xl mx-auto p-6 relative">
      <div className="flex gap-6">
        <div className="flex-1">
          <Image
            src={imageUrl}
            alt={kos.name}
            width={500}
            height={350}
            className="rounded-xl object-cover"
          />
        </div>

        <div className="flex-1 space-y-3">
          <h1 className="text-2xl font-semibold text-gray-800">{kos.name}</h1>

          <div className="flex items-center gap-2">
            <span className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full">
              {kos.gender}
            </span>
          </div>

          <p className="text-xl font-bold text-gray-900">
            Rp. {kos.price_per_month.toLocaleString("id-ID")}
          </p>

          <p className="text-sm text-gray-600 leading-relaxed">{kos.lokasi}</p>

          <hr />

          <p className="text-sm text-gray-700">
            <strong>Fasilitas:</strong>{" "}
            {kos.kos_facilities?.map((f) => f.facility_name).join(", ") || "-"}
          </p>

          <button
            onClick={() => setShowBooking(true)}
            className="mt-3 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            BOOK NOW
          </button>
        </div>
      </div>

      <ReviewSection kosId={parseInt(id as string)} />

      {showBooking && (
        <BookingForm
          kosName={kos.name}
          kosId={kos.id}
          onClose={() => setShowBooking(false)}
        />
      )}
    </div>
  );
}