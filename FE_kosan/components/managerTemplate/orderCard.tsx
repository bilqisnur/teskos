"use client";

import Image from "next/image";
import { ButtonDanger, ButtonSuccess } from "../button";

interface OrderCardProps {
  id: number;
  image: string;
  name: string;
  price: number;
  dateRange: string;
  onReject?: () => void;
  onConfirm?: () => void;
}

const OrderCard = ({
  id,
  image,
  name,
  price,
  dateRange,
  onReject,
  onConfirm,
}: OrderCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow border border-gray-300 p-5 flex items-center gap-5 mb-5">
      {/* Gambar Kost */}
      <div className="w-[180px] h-[120px] overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={name}
          width={180}
          height={120}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="text-lg font-bold">{name}</h3>
          <span className="text-gray-500 text-sm">#{id.toString().padStart(2, "0")}</span>
        </div>
        <p className="font-semibold text-gray-800 mt-1">
          Rp {price.toLocaleString("id-ID")}
        </p>

        <div className="mt-3 bg-yellow-300 inline-block px-4 py-1 rounded-md text-sm font-medium">
          Pemesanan {dateRange}
        </div>

        <div className="mt-4 flex gap-3">
          <ButtonDanger type="button" onClick={onReject}>tolak</ButtonDanger>
          <ButtonSuccess type="button" onClick={onConfirm}>konfirmasi</ButtonSuccess>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
