"use client"
import ProfileCard from "../../../components/profileCard";
import { useRouter } from "next/navigation"
import { removeCookie } from "@/lib/client-cookies";

export default function AdminAccountPage() {
  const router = useRouter();
  const handleLogout = () => {
    removeCookie("token"); // hapus cookie token
    removeCookie("user");  // kalau kamu juga simpan user, hapus juga
    router.replace("/login");   // redirect ke halaman awal
  };
  return (
    <ProfileCard
      role="Admin"
      name="Admin Kos"
      email="admin@gmail.com"
      phone="08987654321"
      onLogout={handleLogout}
    />
  );
}
