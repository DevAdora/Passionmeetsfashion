import { supabaseServer } from "@/lib/server";
import { Order } from "@/types/order";
import { Product } from "@/types/product";

export async function fetchOrders(): Promise<Order[]> {
  const { data, error } = await supabaseServer
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

  return (data ?? []) as unknown as Order[];
}


export async function fetchOrderCounts() {
  const statuses = ["pending", "shipped", "confirmed"];

  const results = await Promise.all(
    statuses.map(async (status) => {
      const { count, error } = await supabaseServer
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


export async function fetchOrderCategories() {
  const { data, error } = await supabaseServer.from("order_items").select("product_name");

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



export async function fetchStockNumbers() {
  const { data, error } = await supabaseServer.from("products").select("*");

  if (error || !data) {
    console.error("Error fetching products:", error);
    return [];
  }

  return (data as Product[]).map((product) => {
    const totalStock = (product.sizes || []).reduce(
      (sum, s) => sum + (s.stock || 0),
      0
    );
    return { name: product.name, totalStock };
  });
}


import { MonthlySalesOrder } from "@/types/order";

interface RawsupabaseServerOrder {
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

export  async function fetchMonthlySales(): Promise<
  MonthlySalesSummary[]
> {
  const { data, error } = await supabaseServer
    .from("orders")
    .select("created_at, order_items(quantity, products(price))");

  if (error || !data) {
    console.error("Error fetching monthly sales:", error);
    return [];
  }

  const monthlyOrders: MonthlySalesOrder[] = (data as RawsupabaseServerOrder[]).map(
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


export async function fetchProductSales() {
  const { data, error } = await supabaseServer
    .from("order_items")
    .select("quantity, products(name, price)");

  if (error) {
    console.error("Error fetching product sales:", error);
    return [];
  }

  const productTotals: Record<string, number> = {};

  data.forEach((item) => {
    const product = Array.isArray(item.products) ? item.products[0] : item.products;

    if (!product) return;

    const productName = product.name || "Unnamed";
    const total = item.quantity * product.price;

    productTotals[productName] = (productTotals[productName] || 0) + total;
  });

  return Object.entries(productTotals).map(([product, total]) => ({
    product,
    total,
  }));
}
