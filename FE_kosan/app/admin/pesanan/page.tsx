"use client";

import OrderCard from "../../../components/managerTemplate/orderCard";
import { useEffect, useState } from "react";
import { getCookie } from "@/lib/client-cookies";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"

interface Booking {
  id: number;
  name: string;
  image: string;
  address: string;
  price_per_month: number;
  gender: string;
  start_date: string;
  end_date: string;
  id_booking: number;
  status: string;
}

export default function PesananPage() {
  const [BookingList, setBookingList] = useState<Booking[]>([]);
  const makerId = "29";
  const tokenCookie = getCookie("token");

  const fetchKos = async () => {
    try {
      console.log("tokenCookie:", tokenCookie);
      const { data } = await axios.get(
        `https://learn.smktelkom-mlg.sch.id/kos/api/admin/show_bookings`,
        {
          headers: {
            MakerID: makerId,
            Authorization: tokenCookie ? `Bearer ${tokenCookie}` : "",
          },
        }
      );

      const mappedData = (data.data || []).map((item: any) => ({
        ...item,
        image: "/image/default-living.png",
      }));

      setBookingList(mappedData);

    } catch (error) {
      console.error("Gagal ambil data kos:", error);
    }
  };

  useEffect(() => {
    fetchKos();
  }, []);

  const handleUpdateStatus = async (
    bookingId: number,
    newStatus: string
  ) => {
    try {
      // setLoading(true);
      const response = await axios.put(
        `https://learn.smktelkom-mlg.sch.id/kos/api/admin/update_status_booking/${bookingId}`,
        { status: newStatus }, // body payload
        {
          headers: {
            MakerID: makerId,
            Authorization: tokenCookie ? `Bearer ${tokenCookie}` : "",
          },
        }
      );

      console.log("Respon update:", response.data);
      toast.success('Success Perbarui Booking');
      
      fetchKos(); // refresh data
    } catch (error) {
      toast.error("Gagal update status: " + error);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ff4b4b] to-[#f9d7d7]">
      {/* Header */}
      <div className="bg-[#ff4b4b] text-white py-4 px-10 font-semibold text-xl">
        Pesanan Masuk
      </div>

      {/* Container Pesanan */}
      <div className="p-10">
        {BookingList.length === 0 ? (
          <p className="text-center text-gray-700">Belum ada pesanan.</p>
        ) : (
          BookingList.map((booking) => (
            <OrderCard
              key={booking.id}
              {...booking}
              onReject={() => handleUpdateStatus(booking.id_booking, 'reject')}
              onConfirm={() => handleUpdateStatus(booking.id_booking, 'accept')}
            />
          ))
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
}
