"use client"
import ProfileCard from "../../../components/profileCard";


export default function AdminAccountPage() {
  return (
    <ProfileCard
      role="Admin"
      name="Admin Kos"
      email="admin@gmail.com"
      phone="08987654321"
      onLogout={() => alert("Logout Admin")}
    />
  );
}
