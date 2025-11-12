"use client";

import { useState } from "react";

interface ProfileCardProps {
  role: string;        // "admin" atau "society"
  name: string;
  email: string;
  phone: string;
  onLogout: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  role,
  name,
  email,
  phone,
  onLogout,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name,
    email,
    phone,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Simulasi update data — nanti bisa diganti API call
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-red-500 to-white p-6">
      {/* Kartu Profil */}
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-md p-6 relative">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-slate-700">{role}</p>
            <h2 className="font-bold text-xl mt-1">{formData.name}</h2>
            <p className="text-slate-600">{formData.email}</p>
          </div>
          <div className="text-right">
            <p className="text-slate-700 font-medium">{formData.phone}</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-2 text-slate-500 hover:text-black transition"
            >
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
                  d="M16.862 4.487l1.687 1.687m-2.478-2.478a2.121 2.121 0 113.003 3.003L7.5 18.75H4.5v-3L15.071 3.696z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Tombol Logout */}
      <button
        onClick={onLogout}
        className="mt-6 w-full max-w-3xl py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all"
      >
        Logout
      </button>

      {/* Modal Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-center">Edit Profile</h2>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-slate-600">
                Name
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </label>

              <label className="text-sm font-medium text-slate-600">
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </label>

              <label className="text-sm font-medium text-slate-600">
                Phone
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg border text-slate-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
