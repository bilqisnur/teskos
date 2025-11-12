"use client";

import { IData } from "@/app/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState, useEffect } from "react";
import { ButtonDanger, ButtonSuccess } from "@/components/button";
import Modal from "@/components/modal";

const AddKos = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [facilityName, setFacilityName] = useState<string>("");
  const [TOKEN, setTOKEN] = useState<string>(""); // 🧠 ambil token di client
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const [kos, setKos] = useState<IData>({
    id: 0,
    user_id: "1",
    name: "",
    address: "",
    price_per_month: 0,
    facilities: "",
    gender: "",
    image: "",
  });

  // Ambil token dari cookie/localStorage saat komponen dijalankan di client
  useEffect(() => {
    const tokenFromCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    const tokenFromLocal = localStorage.getItem("token");
    setTOKEN(tokenFromCookie || tokenFromLocal || "");
  }, []);

  const openModal = () => {
    setKos({
      id: 0,
      user_id: "1",
      name: "",
      address: "",
      price_per_month: 0,
      facilities: "",
      gender: "",
      image: "",
    });
    setFacilityName("");
    setIsShow(true);
    if (formRef.current) formRef.current.reset();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!TOKEN) {
      alert("Token tidak ditemukan! Silakan login ulang.");
      return;
    }

    try {
      // Step 1: kirim data kos
      const urlKos = `https://learn.smktelkom-mlg.sch.id/kos/api/admin/store_kos`;
      const { name, address, price_per_month, gender } = kos;
      const payload = new FormData();
      payload.append("name", name);
      payload.append("address", address);
      payload.append("price_per_month", price_per_month.toString());
      payload.append("gender", gender);

      const resKos = await axios.post(urlKos, payload, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          MakerID: "29",
          "Content-Type": "multipart/form-data",
        },
      });

      const newKosId = resKos.data?.data?.id;
      if (!newKosId) throw new Error("Gagal mendapatkan ID kos baru");

      // Step 2: upload gambar
      if (file) {
        const urlUpload = `https://learn.smktelkom-mlg.sch.id/kos/api/admin/upload_image/${newKosId}`;
        const payloadImg = new FormData();
        payloadImg.append("file", file);

        await axios.post(urlUpload, payloadImg, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            MakerID: "29",
            "Content-Type": "multipart/form-data",
          },
        });
      }

      // Step 3: upload fasilitas
      if (facilityName) {
        const urlFac = `https://learn.smktelkom-mlg.sch.id/kos/api/admin/store_facility/${newKosId}`;
        await axios.post(
          urlFac,
          { facility_name: facilityName },
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              MakerID: "29",
              "Content-Type": "application/json",
            },
          }
        );
      }

      alert("✅ Kos berhasil ditambahkan!");
      setIsShow(false);
      setTimeout(() => router.refresh(), 1000);
    } catch (error: any) {
      console.error("❌ Error saat menambah kos:", error.response?.data || error);
      alert(error.response?.data?.message || "Terjadi kesalahan saat menambah kos.");
    }
  };
    return (
    <div>
      <ButtonSuccess type="button" onClick={() => setIsShow(true)}>
        <div className="flex items-center gap-2">
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Kost
        </div>
      </ButtonSuccess>

      <Modal isShow={isShow} onClose={() => setIsShow(false)}>
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className="bg-white rounded-2xl w-[700px] shadow-md overflow-hidden"
        >
          {/* Header */}
          <div className="px-8 pt-6 pb-2 border-b">
            <h2 className="text-2xl font-semibold mb-2">Add Kost</h2>
          </div>

          {/* Body */}
          <div className="px-8 py-6 grid grid-cols-2 gap-x-6 gap-y-4">
            {/* Left column */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input
                type="text"
                value={kos.name}
                onChange={(e) => setKos({ ...kos, name: e.target.value })}
                className="border rounded-md w-full px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Price per month
              </label>
              <input
                type="number"
                value={kos.price_per_month}
                onChange={(e) =>
                  setKos({  ...kos, price_per_month: Number(e.target.value)  })
                }
                className="border rounded-md w-full px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Address</label>
              <input
                type="text"
                value={kos.address}
                onChange={(e) => setKos({ ...kos, address: e.target.value })}
                className="border rounded-md w-full px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Facilities
              </label>
              <input
                type="text"
                value={kos.facilities}
                onChange={(e) => setKos({ ...kos, facilities: e.target.value })}
                className="border rounded-md w-full px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Gender</label>
              <select
                  value={kos.gender}
                  onChange={(e) => setKos({ ...kos, gender: e.target.value })}
                  className="border rounded-md w-full px-3 py-2"
                 >
                  <option value="">Pilih Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                   </select>
              </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
                className="border rounded-md w-full px-3 py-2"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 border-t flex justify-end gap-3 bg-white">
            <ButtonDanger type="button" onClick={() => setIsShow(false)}>
              cancel
            </ButtonDanger>
            <ButtonSuccess type="submit">save</ButtonSuccess>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddKos