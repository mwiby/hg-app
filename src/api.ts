import { ProductDataResponse,Product } from './types/dataTypes';


export const fetchProductData = async (): Promise<Product[]> => {
  const apiKey = import.meta.env.VITE_KASSALAPP_TOKEN;

  const response = await fetch('https://kassal.app/api/v1/products?size=100', {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch product data, something went wrong on API or with the token.');
  }

  const res = await response.json() as ProductDataResponse;
  return res.data;
};
