export interface productData {
    products: product[];
  }

export interface product {
    id: number;
    name: string;
    country: string;
    latitude: number;
    longitude: number;
    builtYear: number;
    height: string;
  }

