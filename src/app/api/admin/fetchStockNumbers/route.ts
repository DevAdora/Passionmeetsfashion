import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product"; 

export default async function fetchStockNumbers() {
  const { data, error } = await supabase.from("products").select("*");

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
