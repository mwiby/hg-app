import { useQuery } from "@tanstack/react-query";
import { fetchProductData } from "../api";
import { Product } from "../types/dataTypes";

const ProductList = () => {
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ['productData'],
    queryFn: fetchProductData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>API Error: {error instanceof Error ? error.message : 'Unknown error'}</p>;
  if (!data || data.length === 0) return <p>No product data found</p>;

  return (
    <div className="px-5 w-full max-w-7xl">
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((product) => (
          <li key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-200 ease-in-out transform hover:scale-105">
            <a href={product.url} target="_blank" rel="noopener noreferrer" className="block">
              <img src={product.image} alt={product.name} className="w-full h-56 object-cover rounded-md mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">{product.name}</h2>
              <p className="text-lg font-medium text-blue-600 mb-1">Price: {product.current_price} {product.weight_unit}</p>
              <p className="text-sm text-gray-500 mb-2">{product.ingredients}</p>
              <p className="text-sm text-gray-600">Store: <span className="font-semibold">{product.store.name}</span></p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;