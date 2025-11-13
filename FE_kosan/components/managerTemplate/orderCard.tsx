"use client";

import Image from "next/image";
import { ButtonDanger, ButtonSuccess } from "../button";

interface OrderCardProps {
  id: number;
  image: string;
  name: string;
  price_per_month: number;
  start_date: string;
  end_date: string;
  status: string;
  onReject?: () => void;
  onConfirm?: () => void;
}

const OrderCard = ({
  id,
  image,
  name,
  price_per_month,
  start_date,
  end_date,
  status,
  onReject,
  onConfirm,
}: OrderCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 flex flex-col sm:flex-row items-center sm:items-start gap-5 transition-all hover:shadow-lg hover:scale-[1.01] duration-200 mb-6">
      {/* Gambar Kost */}
      <div className="w-full sm:w-[180px] h-[120px] overflow-hidden rounded-xl flex-shrink-0">
        <Image
          src={image || "/image/default-living.png"}
          alt={name}
          width={180}
          height={120}
          className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="flex-1 w-full">
        {/* Nama dan ID */}
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">
            {name}
          </h3>
          <span className="text-gray-400 text-sm font-medium">
            #{id.toString().padStart(2, "0")}
          </span>
        </div>

        {/* Harga */}
        <p className="text-lg font-bold text-[#ff4b4b] mt-1">
          Rp {price_per_month.toLocaleString("id-ID")}
          <span className="text-gray-500 text-sm font-normal ml-1">/bulan</span>
        </p>

        {/* Tanggal pemesanan */}
        <div className="mt-3 bg-yellow-100 border border-yellow-300 text-yellow-700 inline-block px-4 py-1 rounded-lg text-sm font-medium">
          Pemesanan {start_date} - {end_date}
        </div>

        {/* Tombol aksi atau status booking */}
        <div className="mt-5">
          {status === "reject" ? (
            <p className="text-red-600 font-medium bg-red-100 px-4 py-2 rounded-lg inline-block">
              Booking telah ditolak
            </p>
          ) : status === "accept" ? (
            <p className="text-green-600 font-medium bg-green-100 px-4 py-2 rounded-lg inline-block">
              Booking telah disetujui
            </p>
          ) : (
            <div className="flex flex-wrap gap-3">
              <ButtonDanger
                type="button"
                onClick={onReject}
                className="px-5 py-2 text-sm sm:text-base"
              >
                Tolak
              </ButtonDanger>

              <ButtonSuccess
                type="button"
                onClick={onConfirm}
                className="px-5 py-2 text-sm sm:text-base"
              >
                Konfirmasi
              </ButtonSuccess>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
