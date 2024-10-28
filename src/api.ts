export const fetchAISData = async () => {
  const response = await fetch('https://kassal.app/api/v1/products', {
    headers: {
      Authorization: `Bearer ${process.env.KASSALAPP_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch AIS data');
  }


  const data = await response.json();

  return data;
};