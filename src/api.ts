export const fetchProductData = async () => {
  const response = await fetch('https://kassal.app/api/v1/products', {
    headers: {
      Authorization: `Bearer ${process.env.KASSALAPP_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch product data');
  }
  const data = await response.json();

  return data;
};