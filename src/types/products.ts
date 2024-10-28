export interface productData {
    products: product[];
  }

export interface product {
    id: number;
    name: string;
    ingredients: string;
    current_price: number;
  }

