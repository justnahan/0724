export interface Product {
  id: number;
  name: string;
  price_in_cents: number;
  image_url: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface Cart {
  items: CartItem[];
  total_in_cents: number;
}

export interface ProductFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  category?: string;
}

export interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onSearchChange: (query: string) => void;
}

export interface SearchState {
  query: string;
  isOpen: boolean;
  results: Product[];
}