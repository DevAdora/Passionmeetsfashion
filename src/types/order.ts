export interface Product {
  id: string;
  name: string;
  image_url: string;
  price: number;
  size: string;
  sizes?: Size[]; 
}

export interface Size {
  size: string;
  stock: number;
}
export interface OrderItem {
  quantity: number;
  size?: string;
  products: Product | null;
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

export interface address {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  postal: string;
}

export interface MonthlySalesOrder {
  created_at: string;
  order_items: {
    quantity: number;
    products: {
      price: number;
    } | null;
  }[];
}
