  
export interface LightHouseData {
    lighthouses: LightHouse[];
  }

export interface LightHouse {
    id: number;
    name: string;
    country: string;
    latitude: number;
    longitude: number;
    builtYear: number;
    height: string;
  }
