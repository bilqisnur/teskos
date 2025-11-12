import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-1 ml-44 gap-10">
      <img 
      src="/image/gambar1.png" 
      alt="gambar home" 
      width={600}
      height={600}
      className=""/>
      <div className="my-auto">
        <h1 className="text-primary text-5xl">Selamat Datang</h1>
        <p className="text-third my-3 text-xl">Kelola keuangan bisnismu <br />menjadi lebih mudah bersama FINESS</p>
        <button className="text-white bg-primary p-3 text-xl rounded-md">Atur Sekarang</button>
      </div>
    </div>
    
  )
}
