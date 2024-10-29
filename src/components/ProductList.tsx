import { useQuery } from "@tanstack/react-query";
import { fetchProductData } from "../api";
import { Product } from "../types/dataTypes";

const ProductList = () => {
  // Use the query to fetch product data
  const { data, error, isLoading } = useQuery<Product[]>({
    queryKey: ['productData'],
    queryFn: fetchProductData,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>API response Error: {error instanceof Error ? error.message : 'Unknown error'}</p>;
  }

  if (!data || data.length === 0) {
    return <p>No product data found</p>;
  }

  return (
    <div>
      <h1>| Product Data |</h1>
      <ul>
        {data.map((product: Product) => ( 
          <li key={product.id}> 
            <h2>{product.name}</h2> 
            <p>Price: {product.current_price} {product.weight_unit}</p> 
            <p>Ingredients: {product.ingredients}</p> 
            <p>Brand: {product.brand}</p> 
            <p>Store: {product.store.name}</p> 
            <img src={product.image} alt={product.name} style={{ width: '100px', height: 'auto' }} /> 
            <a href={product.url} target="_blank" rel="noopener noreferrer">View Product</a> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
