"use client"
import ProfileCard from "../../../components/profileCard";
import { useRouter } from "next/navigation"
import { removeCookie } from "@/lib/client-cookies";

export default function SocietyAccountPage() {
  const router = useRouter();
    const handleLogout = () => {
      removeCookie("token"); // hapus cookie token
      removeCookie("user");  // kalau kamu juga simpan user, hapus juga
      router.replace("/login");   // redirect ke halaman awal
    };
  return (
    <ProfileCard
      role="Society"
      name="Biliqis Nur Fadhila"
      email="email@gmail.com"
      phone="083111610430"
      onLogout={handleLogout}
    />
  );
}
