import { supabase } from "@/lib/supabase";

export default async function fetchProductSales() {
  const { data, error } = await supabase
    .from("order_items")
    .select("quantity, products(name, price)");

  if (error) {
    console.error("Error fetching product sales:", error);
    return [];
  }

  const productTotals: Record<string, number> = {};

  data.forEach((item) => {
    // Fix: handle both object or array
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
