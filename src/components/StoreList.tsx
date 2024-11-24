import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchStoreData } from "../api";
import { Store } from "../types/dataTypes";
import Pagination from "./Pagination";
import StoreItem from "./StoreItem";

const PROD_PER_PAGE = 10; // Define how many stores to show per page

const StoreList = () => {
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useQuery<Store[]>({
    queryKey: ["storeData", search],
    queryFn: () => fetchStoreData(search),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>API Error: {error instanceof Error ? error.message : "Unknown error"}</p>;
  if (!data || data.length === 0) return <p>No store data found</p>;

  // Filter and sort data based on selected group and search
  const filteredData = data.filter((store) =>
    (!selectedGroup || store.group === selectedGroup) &&
    store.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / PROD_PER_PAGE);
  const startIndex = (currentPage - 1) * PROD_PER_PAGE;
  const endIndex = startIndex + PROD_PER_PAGE;
  const currentPageData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Search for Stores</h2>
      <input
        type="text"
        placeholder="Search by store name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <div className="mb-4">
        <h3 className="font-medium">Filter by Group:</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedGroup(null)}
            className={`px-3 py-2 rounded ${!selectedGroup ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            All
          </button>
          {Array.from(new Set(data.map((store) => store.group))).map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`px-3 py-2 rounded ${selectedGroup === group ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              {group}
            </button>
          ))}
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentPageData.map((store) => (
          <StoreItem key={store.id} store={store} onClick={(s) => console.log(s)} />
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default StoreList;
