import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";

export interface ProductSections {
  arrivals: Product[];
  men: Product[];
  women: Product[];
  accessories: Product[];
}

export default async function fetchProducts(): Promise<ProductSections> {
  const { data: arrivalsData = [] } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4);

  const { data: menData = [] } = await supabase
    .from("products")
    .select("*")
    .ilike("category", "men")
    .order("created_at", { ascending: false })
    .limit(4);

  const { data: womenData = [] } = await supabase
    .from("products")
    .select("*")
    .ilike("category", "%women%")
    .order("created_at", { ascending: false })
    .limit(4);

  const { data: accessoriesData = [] } = await supabase
    .from("products")
    .select("*")
    .ilike("category", "%accessories%")
    .order("created_at", { ascending: false })
    .limit(4);

  return {
    arrivals: arrivalsData as Product[],
    men: menData as Product[],
    women: womenData as Product[],
    accessories: accessoriesData as Product[],
  };
}
