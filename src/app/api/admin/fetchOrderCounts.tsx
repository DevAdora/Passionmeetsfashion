import { supabase } from "@/lib/supabase";

export default async function fetchOrderCounts() {
  const statuses = ["pending", "shipped", "confirmed"];

  const results = await Promise.all(
    statuses.map(async (status) => {
      const { count, error } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("status", status);

      if (error) {
        console.error(`Error fetching ${status} count:`, error);
        return [status, 0];
      }
      return [status, count || 0];
    })
  );

  return Object.fromEntries(results) as {
    pending: number;
    shipped: number;
    confirmed: number;
  };
}
