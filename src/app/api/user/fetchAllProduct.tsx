import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";


export default async function fetchProducts() {
  const { data: allProducts = [] } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
  

    return allProducts as Product[];
  
}
