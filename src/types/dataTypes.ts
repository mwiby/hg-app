
export interface Category {
  id: number;
  depth: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  vendor: string;
  ean: string;
  url: string;
  image: string;
  category: Category[];
  description: string;
  ingredients: string;
  current_price: number;
  current_unit_price: number;
  weight: number;
  weight_unit: string;
  store: {
      name: string;
      code: string;
      url: string;
      logo: string;
  };
  price_history: {
      price: number;
      date: string;
  }[];
  allergens: string[]; 
  created_at: string;
  updated_at: string;
}

export interface ProductDataResponse {
  data: Product[]; 
}