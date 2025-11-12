"use client";

interface Transaction {
  id: number;
  name: string;
  kosName: string;
  date: string;
  status: string;
}

interface TableProps {
  data: Transaction[];
}

const TransactionTable = ({ data }: TableProps) => {
  return (
    <div className="bg-white rounded-xl shadow border p-6">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b text-gray-700">
            <th className="pb-3">ID Transaksi</th>
            <th className="pb-3">Nama</th>
            <th className="pb-3">Nama Kos ↓</th>
            <th className="pb-3">Tanggal Transaksi</th>
            <th className="pb-3">Status</th>
            <th className="pb-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((trx, index) => (
            <tr key={trx.id} className="border-b hover:bg-gray-50">
              <td className="py-3">{index + 1}</td>
              <td>{trx.name}</td>
              <td>{trx.kosName}</td>
              <td>{trx.date}</td>
              <td>{trx.status}</td>
              <td className="text-center text-blue-600 font-semibold cursor-pointer">
                View
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
