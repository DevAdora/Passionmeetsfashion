import { supabase } from "@/lib/supabase";

export default async function fetchMonthlySales() {
  const { data, error } = await supabase
    .from("orders")
    .select("created_at, order_items(quantity, products(price))");

  if (error) {
    console.error("Error fetching monthly sales:", error);
    return [];
  }

  // Aggregate sales per month
  const salesByMonth: Record<string, number> = {};

  data.forEach((order) => {
    const month = new Date(order.created_at).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    const orderTotal = order.order_items.reduce(
      (sum: number, item: any) => sum + item.quantity * item.products.price,
      0
    );

    salesByMonth[month] = (salesByMonth[month] || 0) + orderTotal;
  });

  return Object.entries(salesByMonth).map(([month, total]) => ({
    month,
    total,
  }));
}


