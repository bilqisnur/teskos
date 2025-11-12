"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import MenuItem from "./managerTemplate/menuItem"

type MenuType = {
  id: string;
  path: string;
  label: string;
};

type NavbarProps = {
  title: string;
  id: string;
  menuList: MenuType[];
};

export default function Navbar({ title, id, menuList }: NavbarProps) {
  const pathname = usePathname();

  return (
     <header className="w-full bg-white px-6 py-3 flex items-center justify-between px-20">
       <div className="flex items-center"><Image src="/image/Logo.png" 
       alt="Logo" 
       width={50}
       height={50}
       className="mr-2 inline" />
       <h1 className="text-primary font-extrabold text-lg">Kosan</h1>
      </div>
      <nav className="flex gap-4">
        {menuList?.map((menu) => (
          <MenuItem
            key={menu.id}
            label={menu.label}
            path={menu.path}
            active={pathname === menu.path}
          />
        ))}
      </nav>
    </header>
  );
}
