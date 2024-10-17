import { useQuery } from "@tanstack/react-query";
import { fetchLightHouses } from "../api";
import { LightHouse, LightHouseData } from "../types/lightHouse";  

const LightHouseComponent = () => {
  
  const { data, error, isLoading } = useQuery<LightHouseData, Error>({
    queryKey: ['lighthouse'],
    queryFn: fetchLightHouses,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>API response Error: {error.message}</p>;
  }

  if (!data || !data.lighthouses) {  
    return <p>Cannot find lightHouses</p>;
  }

  return (
    <div>
      <h1>LightHouses</h1>
      <ul>
        {data.lighthouses.map((lighthouse: LightHouse, index: number) => (
          <li key={lighthouse.id}>
            {lighthouse.name} location: {lighthouse.country}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LightHouseComponent;
