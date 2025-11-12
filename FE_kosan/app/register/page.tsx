"use client"
import {useState} from "react"
import { useRouter } from "next/navigation"
import { FormEvent} from "react"
import axios from "axios"
import { storeCookie } from "@/lib/client-cookies";
import { ToastContainer, toast } from "react-toastify"

const RegisterPage=()=>{
    const [name, setName] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
const router = useRouter()
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("SUBMIT CLICKED ✅");
    try {
      const url = `https://learn.smktelkom-mlg.sch.id/kos/api/register`
      const payload = { name,phone,email, password , role :"society"}
      console.log("payload:", payload)
      const makerId = "29";
      console.log("makerID:", makerId);
      const { data } = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
          "makerID": makerId,
        },
      });
      console.log('thoriqq');
      console.log(data);
      if (data.status=== true) {
        toast.success(data.message || "Register berhasil!", { containerId: "toastLogin" });
        setTimeout(() => router.replace("/login"), 1500)
      } else {
        toast.warning(data.message || "Register gagal!", { containerId: "toastLogin" });
      }
    } catch (error: any) {
      toast.error("Register gagal!", { containerId: "toastLogin" });
      console.log("ERROR DETAIL:", error.response?.data); 
      const msg = Object.values(error.response?.data?.message || {}).flat().join(", ");
      toast.error(msg || "Register gagal!", { containerId: "toastLogin" });
    }
  };
return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-white to-red-500">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center">
        <div className="flex flex-col items-center mb-4">
          {/* Logo */}
          <div className="bg-red-500 text-white rounded-full p-3 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              />
            </svg>
          </div>

          <h1 className="text-xl font-semibold text-gray-800">Welcome to kosan!</h1>
          <p className="text-sm text-gray-500">Please enter your details</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-400 outline-none text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600 transition"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
    