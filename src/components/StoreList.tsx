import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchStoreData } from "../api";
import { Store, StoreLabels } from "../types/dataTypes";
import Pagination from "./Pagination";
import StoreItem from "./StoreItem";


const STORE_PER_PAGE = 10;

const StoreList = () => {
  const [searchInput, setSearchInput] = useState(""); 
  const [search, setSearch] = useState("Oslo"); // Default Oslo
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading } = useQuery<Store[]>({
    queryKey: ["storeData", search],
    queryFn: () => fetchStoreData(search),
    staleTime: 5000, // Cache data for 5 seconds
  });

  const handleSearch = () => {
    setSearch(searchInput); 
    setCurrentPage(1); 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>API Error: {error instanceof Error ? error.message : "Unknown error"}</p>;
  if (!data || data.length === 0) return <p>No store data found</p>;

  const filteredData = data?.filter((store: Store) => 
    (!selectedGroup || store.group === selectedGroup) &&
    store.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalItems = filteredData?.length ?? 0;
  const totalPages = Math.ceil(totalItems / STORE_PER_PAGE);
  const startIndex = (currentPage - 1) * STORE_PER_PAGE;
  const endIndex = startIndex + STORE_PER_PAGE;
  const currentPageData = filteredData?.slice(startIndex, endIndex) ?? [];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Søk etter butikker</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Søk butikk ..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown} 
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSearch} 
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Søk
        </button>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Velg kjede:</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedGroup(null)}
            className={`px-3 py-2 rounded ${!selectedGroup ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Alle
          </button>
          {Array.from(new Set(data?.map((store: Store) => store.group))).map((group: string) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`px-3 py-2 rounded ${selectedGroup === group ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              {StoreLabels[group] || group}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentPageData.map((store: Store) => (
          <StoreItem 
            key={store.id}
            store={store}
            onClick={(store) =>
              alert(`${store.name} har ingen nettside tilgjengelig.`)
            } />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default StoreList;
