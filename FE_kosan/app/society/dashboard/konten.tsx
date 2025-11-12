import Image from "next/image";

const Konten1: React.FC = () => {
    return (
    <main className="w-screen min-h-screen bg-gradient-to-b from-white to-primary">
      <section className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center px-6 py-16">
        <div className="flex-1 space-y-5 ">
          <h1 className="text- md:text-5xl font-extrabold text-black leading-tight">
            Temukan Kos Impianmu <br /> Hanya di{" "}
            <span className="text-red-600">Kosan</span>
          </h1>
          <p className="text-gray-800 max-w-md">
            Nggak perlu ribet keliling kota, cukup klik dan pilih kos yang pas
            buat kamu. Simple dan praktis!
          </p>
          <a href="./pesanan">
          <button className="bg-yellow-300 text-black font-bold px-6 py-3 rounded-full hover:bg-yellow-500 transition"> 
        
            Cari Sekarang
          </button>
          </a>
        </div>

        <div className="flex-1 mt-10 lg:mt-0">
            <Image src="/image/konten1.png" 
                   alt="konten1" 
                   width={800}
                   height={800}
          />
        </div>
      </section>

      {/* Section 2 */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-6xl md:text-4xl font-extrabold text-center mb-12 text-white">
          Cari dan pesan sekarang!
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Gambar */}
          <div className="flex-1">
            <Image
              src="/image/konten2.png"
              alt="Langkah Booking"
              width={900}
              height={900}
              className="w-full max-w-sm mx-auto"
            />
          </div>

          {/* Langkah-langkah */}
          <div className="flex-1 bg-white/20 backdrop-blur-sm border border-blue-300 rounded-xl p-6 shadow-lg">
            <ol className="space-y-5 text-gray-900 font-medium">
              <li>
                <span className="font-bold text-white text-lg">
                  1. Masukkan Lokasi & Filter
                </span>
                <br />
                <span className="text-yellow-300 text-sm">
                  Temukan kos sesuai kota, harga, fasilitas.
                </span>
              </li>
              <li>
                <span className="font-bold text-white text-lg">
                  2. Lihat Detail Kos
                </span>
                <br />
                <span className="text-yellow-300 text-sm">
                  Cek foto, fasilitas, dan peraturan sebelum booking.
                </span>
              </li>
              <li>
                <span className="font-bold text-white 600 text-lg">
                  3. Booking & Konfirmasi
                </span>
                <br />
                <span className="text-yellow-300 text-sm">
                  Pesan kos dengan mudah dan tunggu konfirmasi pemilik.
                </span>
              </li>
              <li>
                <span className="font-bold text-white text-lg">
                  4. Siap Ngekos!
                </span>
                <br />
                <span className="text-yellow-300 text-sm">
                  Nikmati kenyamanan kos pilihanmu.
                </span>
              </li>
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Konten1