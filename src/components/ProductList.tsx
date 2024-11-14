import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductData } from "../api";
import { Product } from "../types/dataTypes";

const ProductList = () => {
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ["productData"],
    queryFn: fetchProductData,
  });

  const [sortCriteria, setSortCriteria] = useState<"price" | "name">("price");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>API Error: {error instanceof Error ? error.message : "Unknown error"}</p>;
  if (!data || data.length === 0) return <p>No product data found</p>;

  const sortedData = [...data].sort((a, b) => {
    if (sortCriteria === "price") {
      return a.current_price - b.current_price;
    } else if (sortCriteria === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <div className="px-4 w-full max-w-5xl mx-auto">
      <div className="flex justify-between items-center py-4 mb-6 bg-blue-50 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold text-blue-700">Product List</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Sort by:</span>
          <button
            onClick={() => setSortCriteria("price")}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              sortCriteria === "price"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Price
          </button>
          <button
            onClick={() => setSortCriteria("name")}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              sortCriteria === "name"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Name
          </button>
        </div>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedData.map((product) => (
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
              <p className="text-md text-blue-600 font-semibold mb-1">Price: ${product.current_price}</p>
              <p className="text-sm text-gray-500 mb-1">Vendor: {product.vendor}</p>
              <p className="text-sm text-gray-600">
                Store: <span className="font-medium">{product.store.name}</span>
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
