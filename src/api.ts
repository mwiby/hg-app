export const fetchAISData = async () => {
  const response = await fetch('https://liveais.barentswatch.no/v1/latest', {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_BARIENTSWATCH_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch AIS data');
  }

  const data = await response.json();
  return data;
};