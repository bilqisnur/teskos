"use client"
import {FC} from "react"

interface kosCardProps{
  name: string;
  address: string;
  price: number;
  gender: string; 
  image: string;
}

const Koscard: FC <kosCardProps> = ({name, address, price, gender, image}) => {
    return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-[240px] hover:shadow-lg transition">
      <img src={image} alt={name} className="h-40 w-full object-cover" />

      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className={`text-white text-xs font-semibold px-2 py-1 rounded-full ${gender === "putri" ? "bg-red-500" : "bg-blue-500"}`}>
            {gender}
          </span>
        </div>

        <h2 className="font-semibold text-gray-800 text-sm">{name}</h2>
        <p className="text-xs text-gray-500">{address}</p>

        <div className="flex justify-between items-center pt-2">
          <span className="font-bold text-sm text-gray-800">Rp {price.toLocaleString("id-ID")}/bulan</span>
        </div>
      </div>
    </div>
  );
}
export default Koscard;