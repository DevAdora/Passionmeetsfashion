export interface Product {
  id: string;
  name: string;
  image_url: string;
  price: number;
  description: string;
  colors?: string[];
  sizes?: { label: string; stock: number }[];
  category?: string;
  created_at?: string;
}
