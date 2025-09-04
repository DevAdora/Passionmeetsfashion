import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";

export default async function fetchAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Error fetching products:", error?.message);
    return [];
  }

  return data.map((product) => ({
    ...product,
    image: product.image
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${product.image}`
      : null,
  })) as Product[];
}
