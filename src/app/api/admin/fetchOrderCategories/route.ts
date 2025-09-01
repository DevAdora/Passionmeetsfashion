import { supabase } from "@/lib/supabase";

export default async function fetchOrderCategories() {
  const { data, error } = await supabase.from("order_items").select("product_name");

  if (error) {
    console.error("Error fetching order items:", error);
    return [];
  }

  const counts: Record<string, number> = {};
  data.forEach((item) => {
    counts[item.product_name] = (counts[item.product_name] || 0) + 1;
  });

  return Object.entries(counts).map(([product_name, count]) => ({
    product_name,
    count,
  }));
}
