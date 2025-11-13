"use client"
import { storeCookie } from "@/lib/client-cookies";
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { getCookie } from "@/lib/client-cookies";


const LoginPage = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const router = useRouter()
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("SUBMIT CLICKED ✅");
    try {
      const url = `https://learn.smktelkom-mlg.sch.id/kos/api/login`
      const payload = { email: email, password }

      const makerId = "29";
      console.log("makerID:", makerId);
      const { data } = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
          "makerID": makerId,
          
        },
      });
      if (data.access_token) {
        toast.success(data.message || "Login berhasil!", { containerId: "toastLogin" });
        storeCookie("token", data.access_token)
        storeCookie("user", JSON.stringify(data.user));
        let role = data.user.role
        if (role === `owner`) setTimeout(() => router.replace(`/admin/dashboard`), 1000)
        else if (role === `society`) setTimeout(() => router.replace(`/society/dashboard`), 1000)
      } else {
        toast.warning(data.message || "Login gagal!", { containerId: "toastLogin" });
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Login gagal — periksa email/password!", { containerId: "toastLogin" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-red-500">
      <div className="bg-white w-[380px] rounded-2xl shadow-lg p-8 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-4 flex flex-col items-center">
          <div className=" w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            <Image
              src="/image/Logo.png"
              alt="Logo"
              width={50}
              height={50}
            />
          </div>
          <h1 className="text-xl font-semibold mt-3">Welcome Back!</h1>
          <p className="text-gray-500 text-sm mt-1">
            We missed you! Please enter your details
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-red-400 text-black"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 pr-10 outline-none focus:ring-2 focus:ring-red-400 text-black"
            />
            {/* Eye Toggle Button */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-red-500"
            >
              {showPassword ? (
                // Eye-off icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.092 7.244 19 12 19c1.28 0 2.506-.214 3.64-.61M9.88 9.88A3 3 0 0012 15a2.99 2.99 0 002.12-.88M15 12a3 3 0 00-3-3M4.22 4.22l15.56 15.56"
                  />
                </svg>
              ) : (
                // Eye icon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-all"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <a href="/register"
            className="text-red-500 hover:underline font-medium"
          >Register now
          </a>
        </p>
        <ToastContainer containerId="toastLogin" />
      </div>
    </div>
  );

};

export default LoginPage;