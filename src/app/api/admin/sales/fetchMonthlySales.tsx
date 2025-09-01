import { supabase } from "@/lib/supabase";
import { MonthlySalesOrder } from "@/types/order";

interface RawSupabaseOrder {
  created_at: string;
  order_items: {
    quantity: number;
    products: { price: number }[];
  }[];
}

export interface MonthlySalesSummary {
  month: string;
  total: number;
}

export default async function fetchMonthlySales(): Promise<
  MonthlySalesSummary[]
> {
  const { data, error } = await supabase
    .from("orders")
    .select("created_at, order_items(quantity, products(price))");

  if (error || !data) {
    console.error("Error fetching monthly sales:", error);
    return [];
  }

  const monthlyOrders: MonthlySalesOrder[] = (data as RawSupabaseOrder[]).map(
    (order) => ({
      created_at: order.created_at,
      order_items: order.order_items.map((item) => ({
        quantity: Number(item.quantity),
        products: item.products?.[0] 
          ? { price: Number(item.products[0].price) }
          : null,
      })),
    })
  );

  const salesByMonth: Record<string, number> = {};

  monthlyOrders.forEach((order) => {
    const month = new Date(order.created_at).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    const orderTotal = order.order_items.reduce((sum, item) => {
      if (!item.products) return sum;
      return sum + item.quantity * item.products.price;
    }, 0);

    salesByMonth[month] = (salesByMonth[month] || 0) + orderTotal;
  });

  return Object.entries(salesByMonth).map(([month, total]) => ({
    month,
    total,
  }));
}
