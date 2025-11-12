import {ReactNode} from "react";

interface IPropMenu{
    id : string,
   label : string,
    path : string
}
let adminlist : IPropMenu[] = [
    {
        id : `dashboard`,
       label :`Dashboard`,
        path :`/admin/dashboard`,
    },
    {
        id : `kosadmin`,
       label :`Kos Anda`,
        path :`/admin/kosanda`,
    },
    {
        id : `pesanan`,
       label :`Pesanan`,
        path :`/admin/pesanan`,
    },
    {
        id : `transaksi`,
       label :`Transaksi`,
        path :`/admin/transaksi`,
    },
    {
        id : `akun`,
       label :`Akun`,
        path :`/admin/akun`,
    }
]

export default adminlist;