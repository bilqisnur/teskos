"use client"
import ProfileCard from "../../../components/profileCard";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/navigation"
import { getCookie,removeCookie } from "@/lib/client-cookies";
import { Interface } from "readline";


export default function AdminAccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = getCookie("token");
    const userData = getCookie("user");

    if (!token || !userData) {
      router.replace("/login");
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch {
      setUser(null);
    }
  }, [router]);

  const handleLogout = () => {
    removeCookie("token"); // hapus cookie token
    removeCookie("user");  // kalau kamu juga simpan user, hapus juga
    router.replace("/login");   // redirect ke halaman awal
  };
  if (!user) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }
  return (
    <ProfileCard
       role={user.role || "Admin"}
      name={user.name}
      email={user.email}
      phone={user.phone || "—"}
      onLogout={handleLogout}
    />
  );
}
