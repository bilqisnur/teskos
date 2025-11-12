"use client"
import ProfileCard from "../../../components/profileCard";


export default function SocietyAccountPage() {
  return (
    <ProfileCard
      role="Society"
      name="Biliqis Nur Fadhila"
      email="email@gmail.com"
      phone="083111610430"
      onLogout={() => alert("Logout Society")}
    />
  );
}
