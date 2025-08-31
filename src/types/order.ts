export interface Product {
  id: string;
  name: string;
  image_url: string;
  price: number;
}

export interface OrderItem {
  quantity: number;
  products: Product | null; // 👈 not an array
}

export interface Order {
  id: string;
  full_name: string;
  street: string;
  city: string;
  country?: string;
  payment_method: string;
  status: "pending" | "shipped" | "confirmed";
  order_items: OrderItem[];
}
