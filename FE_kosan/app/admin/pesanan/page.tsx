"use client";

import OrderCard from "../../../components/managerTemplate/orderCard";

export default function PesananPage() {
  // Dummy data sementara
  const orders = [
    {
      id: 7,
      image: "/images/kos1.jpg",
      name: "kos bidadari",
      price: 900000,
      dateRange: "13 Jan - 13 Mei",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ff4b4b] to-[#f9d7d7]">
      {/* Header */}
      <div className="bg-[#ff4b4b] text-white py-4 px-10 font-semibold text-xl">
        Pesanan Masuk
      </div>

      {/* Container Pesanan */}
      <div className="p-10">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            {...order}
            onReject={() => alert(`Pesanan #${order.id} ditolak`)}
            onConfirm={() => alert(`Pesanan #${order.id} dikonfirmasi`)}
          />
        ))}
      </div>
    </div>
  );
}
