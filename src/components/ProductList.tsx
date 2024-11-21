import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductData } from "../api";
import { Product } from "../types/dataTypes";
import Pagination from "./Pagination";

const PROD_PER_PAGE = 9;

const ProductList = () => {
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["productData"],
    queryFn: fetchProductData,
  });

  const [sortCriteria, setSortCriteria] = useState<"price" | "name">("price");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>API Error: {error instanceof Error ? error.message : "Unknown error"}</p>;
  if (!data || data.length === 0) return <p>No product data found</p>;

  const sortedData = [...data].sort((a, b) => {
    if (sortCriteria === "price") {
      return sortOrder === "asc"
        ? a.current_price - b.current_price
        : b.current_price - a.current_price;
    } else if (sortCriteria === "name") {
      return sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
    return 0;
  });

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / PROD_PER_PAGE);
  const startIndex = (currentPage - 1) * PROD_PER_PAGE;
  const endIndex = startIndex + PROD_PER_PAGE;
  const currentPageData = sortedData.slice(startIndex, endIndex);

  return (
    <div className="px-4 w-full max-w-5xl mx-auto">
      <div className="flex justify-between items-center py-4 mb-6 bg-blue-50 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold text-blue-700">Produktliste</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Sorter etter:</span>
          <select
            value={`${sortCriteria}-${sortOrder}`}
            onChange={(e) => {

              const [criteria, order] = e.target.value.split("-");
              setSortCriteria(criteria as "price" | "name");
              setSortOrder(order as "asc" | "desc");
            }}

            className="px-3 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-700"
          >

            <option value="price-asc">Pris (lavest først)</option>
            <option value="price-desc">Pris (høyest først)</option>
            <option value="name-asc">Navn (A til Å)</option>
            <option value="name-desc">Navn (Å til A)</option>
          </select>

        </div>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {currentPageData.map((product) => (
          <li
            key={product.id}
            className="bg-white border border-gray-200 rounded-md shadow-sm p-4 hover:shadow-md transition duration-150 ease-in-out transform hover:scale-105"
          >
            <a href={product.url} target="_blank" rel="noopener noreferrer" className="block">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-3"
              />
              <h2 className="text-lg font-medium text-gray-800">{product.name}</h2>
              <p className="text-md text-blue-600 font-semibold mb-1">Pris: {product.current_price}</p>
              <p className="text-sm text-gray-500 mb-1">Leverandør: {product.vendor}</p>
              <p className="text-sm text-gray-600">
                Butikk: <span className="font-medium">{product.store.name}</span>
              </p>
            </a>
          </li>
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

export default ProductList;
