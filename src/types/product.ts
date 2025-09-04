export interface Product {
  id: number;
  name: string;
  description: string | null;
  image_url: string;
  price: number;
  colors: string[] | null;
  sizes:
    | {
        label: string;
        stock: number;
      }[]
    | null;
  category: string | null;
  subcategory: string | null;
  created_at?: string;
  
}
