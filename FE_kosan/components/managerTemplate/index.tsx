"use client"
import { ReactNode } from "react";
import Navbar from "../navbar"

type MenuType = {
   id: string,
   path: string,
   label: string
}

type ManagerProp = {
   children: ReactNode,
   id: string,
   title: string,
   menuList: MenuType[]
}

const ManagerTemplate = ({ children, id, title, menuList }: ManagerProp) => {
   return (
      <div className="w-full min-h-screen bg-slate-50">
           {/* Navbar di atas */}
           <Navbar menuList={menuList} title={title} id={id} />

           {/* Konten halaman */}
           <main className="p-4">
               {children}
           </main>
       </div>
   )
}

export default ManagerTemplate