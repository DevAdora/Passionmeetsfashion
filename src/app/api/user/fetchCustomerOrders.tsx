
import { supabase } from "@/lib/supabase";
import { Order } from "@/types/order";

export default async function fetchCustomerOrders(): Promise<Order[]> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("Error fetching user:", userError);
    return [];
  }

  if (!user) {
    console.warn("No user logged in");
    return [];
  }

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
          size,
          products (
            id,
            name,
            image_url,
            price
          )
        )
      `
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching customer orders:", error);
    return [];
  }

  return (data ?? []) as unknown as Order[]; 
}
