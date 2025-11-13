"use client";

import { IData } from "@/app/types";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ButtonDanger, ButtonSuccess } from "@/components/button";
import Modal from "@/components/modal";

export default function EditKos() {
  const [isShow, setIsShow] = useState<boolean>(true); // modal langsung muncul
  const [file, setFile] = useState<File | null>(null);
  const [TOKEN, setTOKEN] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { id } = useParams();
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

  // 🔹 Ambil token dan data kos saat pertama kali load
  useEffect(() => {
    const tokenFromCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    const tokenFromLocal = localStorage.getItem("token");
    const token = tokenFromCookie || tokenFromLocal || "";
    setTOKEN(token);

    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://learn.smktelkom-mlg.sch.id/kos/api/admin/show_kos/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              MakerID: "29",
            },
          }
        );

        const kosData = data.data;
        setKos({
          id: kosData.id,
          user_id: kosData.user_id || "1",
          name: kosData.name || "",
          address: kosData.address || "",
          price_per_month: kosData.price_per_month || 0,
          facilities:
            kosData.kos_facilities?.map((f: any) => f.facility_name).join(", ") ||
            "",
          gender: kosData.gender || "",
          image:
            kosData.kos_image && kosData.kos_image.length > 0
              ? `https://learn.smktelkom-mlg.sch.id/kos/${kosData.kos_image[0].file}`
              : "",
        });
      } catch (err) {
        console.error("Gagal mengambil data kos:", err);
        alert("Gagal memuat data kos.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  // 🔹 Update data kos
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!TOKEN) return alert("Token tidak ditemukan!");

    try {
      // Step 1: Update data kos
      const urlUpdate = `https://learn.smktelkom-mlg.sch.id/kos/api/admin/update_kos/${id}`;
      const payload = new FormData();
      payload.append("name", kos.name);
      payload.append("address", kos.address);
      payload.append("price_per_month", kos.price_per_month.toString());
      payload.append("gender", kos.gender);

      await axios.post(urlUpdate, payload, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          MakerID: "29",
          "Content-Type": "multipart/form-data",
        },
      });

      // Step 2: Update gambar (jika diganti)
      if (file) {
        const urlUpload = `https://learn.smktelkom-mlg.sch.id/kos/api/admin/upload_image/${id}`;
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

      // Step 3: Update fasilitas
      if (kos.facilities) {
        const urlFacility = `https://learn.smktelkom-mlg.sch.id/kos/api/admin/store_facility/${id}`;
        await axios.post(
          urlFacility,
          { facility_name: kos.facilities },
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              MakerID: "29",
              "Content-Type": "application/json",
            },
          }
        );
      }

      alert("✅ Kos berhasil diperbarui!");
      router.push("/kosanda");
    } catch (error: any) {
      console.error("❌ Gagal update kos:", error.response?.data || error);
      alert(error.response?.data?.message || "Terjadi kesalahan saat update kos.");
    }
  };

  if (loading)
    return <div className="text-center py-10 text-gray-500">Loading data...</div>;

  return (
    <Modal isShow={isShow} onClose={setIsShow}>
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="bg-white rounded-2xl w-[700px] shadow-md overflow-hidden"
      >
        {/* Header */}
        <div className="px-8 pt-6 pb-2 border-b">
          <h2 className="text-2xl font-semibold mb-2">Edit Kost</h2>
        </div>

        {/* Body */}
        <div className="px-8 py-6 grid grid-cols-2 gap-x-6 gap-y-4">
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
                setKos({ ...kos, price_per_month: Number(e.target.value) })
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
            <label className="block text-sm text-gray-600 mb-1">Facilities</label>
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
            {kos.image && (
              <img
                src={kos.image}
                alt="Preview"
                className="mt-2 rounded-md w-full h-40 object-cover"
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t flex justify-end gap-3 bg-white">
          <ButtonDanger type="button" onClick={() => router.push("/kosanda")}>
            Cancel
          </ButtonDanger>
          <ButtonSuccess type="submit">Update</ButtonSuccess>
        </div>
      </form>
    </Modal>
  );
}
