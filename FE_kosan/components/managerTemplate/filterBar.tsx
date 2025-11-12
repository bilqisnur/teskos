"use client";

interface FilterBarProps {
  date: string;
  status: string;
  search: string;
  onChangeDate: (value: string) => void;
  onChangeStatus: (value: string) => void;
  onChangeSearch: (value: string) => void;
}

const FilterBar = ({
  date,
  status,
  search,
  onChangeDate,
  onChangeStatus,
  onChangeSearch,
}: FilterBarProps) => {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center gap-4 mb-6 border">
      {/* Filter tanggal */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Filter Tanggal</label>
        <input
          type="date"
          value={date}
          onChange={(e) => onChangeDate(e.target.value)}
          className="border rounded-md px-3 py-2 w-[200px]"
        />
      </div>

      {/* Filter status */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Filter Status</label>
        <select
          value={status}
          onChange={(e) => onChangeStatus(e.target.value)}
          className="border rounded-md px-3 py-2 w-[200px]"
        >
          <option value="">Status</option>
          <option value="Rejected">ditolak</option>
          <option value="konfirmed">dikonfirmasi</option>
        </select>
      </div>

      {/* Pencarian */}
      <div className="flex flex-col flex-1">
        <label className="text-sm text-gray-600 mb-1">Pencarian</label>
        <input
          type="text"
          placeholder="Keyword Pencarian"
          value={search}
          onChange={(e) => onChangeSearch(e.target.value)}
          className="border rounded-md px-3 py-2 w-full"
        />
      </div>
    </div>
  );
};

export default FilterBar;
