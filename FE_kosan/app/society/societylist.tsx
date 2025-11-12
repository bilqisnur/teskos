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
        path :`/society/dashboard`,
    },
    {
        id : `carikos`,
       label :`Cari Kos`,
        path :`/society/carikos`,
    },
    {
        id : `pesanan`,
       label :`Pesanan`,
        path :`/society/pesanan`,
    },
    {
        id : `akun`,
       label :`Akun`,
        path :`/society/akun`,
    }
]

export default adminlist;