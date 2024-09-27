import { useQuery } from "@tanstack/react-query"
import { fetchHarbors } from "../api"

const HarborList = () => {

    const { data, error, isLoading } = useQuery(['harbors'], fetchHarbors);

    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Kunne ikke hente havneinformasjon: {error.message}</p>;
    }
    
    if (!data || !data.features) {
        return <p>Ingen havnedata tilgjengelig.</p>;
    }
  
    return (
      <div>
        <h1>Havner i Norge</h1>
        <ul>
          {data.features.map((harbor: any, index: number) => (
            <li key={index}>{harbor.properties.name}</li>
          ))}
        </ul>
      </div>
    );
  };

export default HarborList