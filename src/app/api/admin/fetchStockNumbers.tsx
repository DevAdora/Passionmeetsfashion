import { supabase } from "@/lib/supabase";

export default async function fetchStockNumbers() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data.map((product: any) => {
    const totalStock = (product.sizes || []).reduce(
      (sum: number, s: { stock: number }) => sum + (s.stock || 0),
      0
    );
    return { name: product.name, totalStock };
  });
}
