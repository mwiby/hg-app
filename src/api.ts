import { Product, ProductDataResponse } from './types/dataTypes';

export const fetchProductData = async (): Promise<Product[]> => {
  const apiKey = import.meta.env.VITE_KASSALAPP_TOKEN;

  const response = await fetch('https://kassal.app/api/v1/products', {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch product data, something went wrong on api or with token.');
  }

  return(await response.json() as ProductDataResponse).data;
};