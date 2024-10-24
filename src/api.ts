
export const fetchLightHouses = async () => {
  
    const response = await fetch(
      'https://api.openseamap.org/api/geonames?lang=en&lat=54.1&lon=13.4'
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch harbor data');
    }
  
    const data = await response.json();
    return data;
  };
