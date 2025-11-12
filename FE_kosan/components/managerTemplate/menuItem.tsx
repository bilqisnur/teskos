import React from 'react';
import Link from "next/link"

interface MenuItemProps {
    label: string;
    path: string;
    active?: boolean;
   }
   
const MenuItem = ({ label, path, active }: MenuItemProps) => {
    return (
      <Link href={path} className={`flex justify-center p-2 hover:bg-gray-100 transition-colors ${active ? 'text-primary font-semibold' : 'text-black'}`}>

        <span className="flex-1">{label}</span>
      </Link>
    );
};

export default MenuItem