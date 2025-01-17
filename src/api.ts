import { ProductDataResponse,
         StoreDataResponse,
         Product,
         Store } from './types/dataTypes';

const apiKey = import.meta.env.VITE_KASSALAPP_TOKEN;

export const fetchProductData = async (): Promise<Product[]> => {

  const response = await fetch('https://kassal.app/api/v1/products?size=60&search=kjøtt', {
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch product data, something went wrong on API or with the token.');
  }

  const res = await response.json() as ProductDataResponse;
  return res.data;
};

export const fetchProductSearchData = async (search: string = ""): Promise<Product[]> => {

  const response = await fetch(`https://kassal.app/api/v1/products?size=100&search=${encodeURIComponent(search)}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch product data, something went wrong on API or with the token.');
  }

  const res = await response.json() as ProductDataResponse;
  return res.data;
};

export const fetchStoreData = async (search: string = ""): Promise<Store[]> => {

  const response = await fetch(`https://kassal.app/api/v1/physical-stores?size=100&search=${encodeURIComponent(search)}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch store data, something went wrong on API or with the token.');
  }

  const res = await response.json() as StoreDataResponse;
  return res.data;
};
