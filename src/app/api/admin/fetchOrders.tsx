import { supabase } from "@/lib/supabase";
import { Order } from "@/types/order";

export default async function fetchOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
        id,
        full_name,
        street,
        city,
        payment_method,
        status,
        order_items (
          quantity,
          products (
            id,
            name,
            image_url,
            price
          )
        )
      `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return [];
  }

  return (data ?? []) as unknown as Order[]; // 👈 use unknown cast
}
