import { useQuery } from "@tanstack/react-query";
import { fetchProductData } from "../api";

const ProductList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['productData'],
    queryFn: fetchProductData,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>API response Error: {error.message}</p>;
  }

  if (!data || data.length === 0) {
    return <p>No product data found</p>;
  }

  console.log('Data: ' + data);

  return (
    <div>
      <h1>|Product Data|</h1>

      {/*
      <ul>
        {data.map((products: any, index: number) => (
          <li key={index}>
            Product: {ship.name}, Position: {ship.position.latitude}, {ship.position.longitude}, Speed: {ship.speed}
          </li>
        ))}
      </ul>
      */}

    </div>
  );
};

export default ProductList;
