export interface Category {
  id: number;
  depth: number;
  name: string;
}

export interface PriceHistory {
  price: number;
  date: string;
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
  store: Store;
  price_history: PriceHistory[];
  allergens: string[];
  nutrition: string[];
  labels: string[];
  created_at: string;
  updated_at: string;
}

export interface ProductDataResponse {
  data: Product[];
}

export interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface ProductItemProps {
  product: Product;
  onClick: (product: Product) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/* Store */

export interface Position {
  lat: string; 
  lng: string;
}

export interface OpeningHours {
  monday: string | null; 
  tuesday: string | null;
  wednesday: string | null;
  thursday: string | null;
  friday: string | null;
  saturday: string | null;
  sunday: string | null;
}

export interface Store {
  id: number;
  group: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
  website: string;
  detailUrl: string;
  position: Position; 
  openingHours: OpeningHours; 
}

export interface StoreDataResponse {
  data: Store[];
}