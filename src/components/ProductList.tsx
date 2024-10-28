import { useQuery } from "@tanstack/react-query";
import { fetchAISData } from "../api";

const AISComponent = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['aisData'],
    queryFn: fetchAISData,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>API response Error: {error.message}</p>;
  }

  if (!data || data.length === 0) {
    return <p>No AIS data found</p>;
  }

  return (
    <div>
      <h1>AIS Data</h1>
      <ul>
        {data.map((products: any, index: number) => (
          <li key={index}>
            Ship: {ship.name}, Position: {ship.position.latitude}, {ship.position.longitude}, Speed: {ship.speed}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AISComponent;
