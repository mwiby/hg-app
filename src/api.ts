
export const fetchLightHouses = async () => {
  
    const response = await fetch(
      'https://api.openseamap.org/api/geonames?lang=en&lat=54.1&lon=13.4'
      // 'https://wfs.geonorge.no/skwms1/wfs.kartverket_havner?service=WFS&version=2.0.0&request=GetFeature&typeNames=kartverket_havner&outputFormat=application/json'
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch harbor data');
    }
  
    const data = await response.json();

    console.log(data);

    return data;
  };
