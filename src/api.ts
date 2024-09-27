// Example fetch function

const fetchHarbors = async () => {
    const response = await fetch(
      'https://wfs.geonorge.no/skwms1/wfs.kartverket_havner?service=WFS&version=2.0.0&request=GetFeature&typeNames=kartverket_havner&outputFormat=application/json'
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch harbor data');
    }
  
    const data = await response.json();
    return data;
  };