import { supabaseServer } from "@/lib/server";
import { Order } from "@/types/order";
import { Profile } from "@/types/user";
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
  const { data, error } = await supabaseServer
    .from("order_items")
    .select("product_name");

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

export async function fetchMonthlySales(): Promise<MonthlySalesSummary[]> {
  const { data, error } = await supabaseServer
    .from("orders")
    .select(
      `
      created_at,
      order_items (
        quantity,
        products (
          price
        )
      )
    `
    )
    .eq("status", "shipped"); // only shipped orders

  if (error || !data) {
    console.error("Error fetching monthly sales:", error);
    return [];
  }

  const monthlyOrders: MonthlySalesOrder[] = (
    data as RawsupabaseServerOrder[]
  ).map((order) => ({
    created_at: order.created_at,
    order_items: order.order_items.map((item) => {
      const product = Array.isArray(item.products)
        ? item.products[0]
        : item.products;

      return {
        quantity: Number(item.quantity),
        products: product ? { price: Number(product.price) } : null,
      };
    }),
  }));

  const salesByMonth: Record<string, number> = {};

  monthlyOrders.forEach((order) => {
    const date = new Date(order.created_at);
    const month = `${date.toLocaleString("en-US", {
      month: "short",
    })} ${date.getFullYear()}`;

    const orderTotal = order.order_items.reduce((sum, item) => {
      if (!item.products) return sum;
      return sum + item.quantity * item.products.price;
    }, 0);

    salesByMonth[month] = (salesByMonth[month] || 0) + orderTotal;
  });

  return Object.entries(salesByMonth).map(([month, total]) => ({
    month,
    total: Number(total),
  }));
}

export async function fetchProductSales() {
  const { data, error } = await supabaseServer
    .from("order_items")
    .select(
      `
      quantity,
      orders!inner (status),
      products (
        name,
        price
      )
    `
    )
    .eq("orders.status", "shipped");

  if (error) {
    console.error("Error fetching product sales:", error);
    return [];
  }

  const productTotals: Record<string, number> = {};

  data.forEach((item) => {
    const product = Array.isArray(item.products)
      ? item.products[0]
      : item.products;

    if (!product) return;

    const productName = product.name || "Unnamed";
    const total = Number(item.quantity) * Number(product.price);

    productTotals[productName] = (productTotals[productName] || 0) + total;
  });

  return Object.entries(productTotals).map(([product, total]) => ({
    product,
    total,
  }));
}

type ProfileRow = {
  id: string;
  username: string;
  role: string;
  created_at: string;
  street?: string | null;
  city?: string | null;
  province?: string | null;
  postal?: string | null;
  phone?: string | null;
};


export async function fetchUsers(): Promise<Profile[]> {
  const { data, error } = await supabaseServer
    .from("profiles")
    .select(
      "id, username, role, created_at, street, city, province, postal, phone"
    )
    .eq("role", "user")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return (data ?? []).map((u: ProfileRow) => ({
    id: u.id,
    role: u.role,
    created_at: u.created_at,
    fullName: u.username, 
    street: u.street ?? undefined,
    city: u.city ?? undefined,
    province: u.province ?? undefined,
    postal: u.postal ?? undefined,
    phone: u.phone ?? undefined,
  }));
}
