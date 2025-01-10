import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductData, fetchProductSearchData } from "../api";
import { Product } from "../types/dataTypes";
import Pagination from "./Pagination";
import ProductModal from "./ProductModal";
import ProductItem from "./ProductItem";
import LoadingSpinner from "./LoadingSpinner";

const PROD_PER_PAGE = 9;

const ProductList = () => {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [sortCriteria, setSortCriteria] = useState<"price" | "name">("price");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {
    data: productData,
    error: productError,
    isLoading: isProductLoading,
  } = useQuery<Product[]>({
    queryKey: ["productData"],
    queryFn: fetchProductData,
  });

  const {
    data: searchData,
    error: searchError,
    isLoading: isSearchLoading,
  } = useQuery<Product[]>({
    queryKey: ["ProductSearchData", search],
    queryFn: () => fetchProductSearchData(search),
    staleTime: 5000,
    enabled: !!search
  });

  const displayedData = search ? searchData : productData;

  const handleSearch = () => {
    if (searchInput.trim().length < 3) {
      alert("Vennligst skriv inn minst 3 tegn for søket."); 
      return;
    }
    setSearch(searchInput.trim());
    setCurrentPage(1); 
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const sortedData = [...(displayedData || [])].sort((a, b) => {
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
      {/* Header with sort options */}
      <div className="flex justify-between items-center py-4 mb-6 bg-blue-50 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold text-blue-700">Produktliste</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Sorter:</span>
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

      <h2 className="text-xl font-semibold mb-4">Søk etter produkt</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Søk produkt ..."
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

      {isProductLoading || isSearchLoading ? (
        <LoadingSpinner />
      ) : productError || searchError ? (
        <p>
          API Error:{" "}
          {productError instanceof Error
            ? productError.message
            : searchError instanceof Error
            ? searchError.message
            : "Unknown error"}
        </p>
      ) : displayedData && displayedData.length > 0 ? (
        <>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {currentPageData.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                onClick={setSelectedProduct}
              />
            ))}
          </ul>
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      ) : (

        <div className="bg-blue-50 text-blue-700 p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Ingen produkter funnet</h3>
          <p className="text-sm text-gray-700 mt-2">
            Prøv å justere søkekriteriene, eller klikk på "Tilbakestill søk" for å starte på nytt.
          </p>
          <button
            onClick={() => {
              setSearchInput("");
              setSearch("");
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Tilbakestill søk
          </button>
        </div>
      )}
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};

export default ProductList;
