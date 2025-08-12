import { supabase } from "@/lib/supabase";

export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity?: number;
  size?: string | null;
  color?: string | null;
};

export default async function addToCart(product: Product) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not logged in");

  const { error } = await supabase.from("cart_items").insert([
    {
      user_id: user.id,
      product_id: product.id,
      product_name: product.name,
      product_image: product.image,
      price: product.price,
      quantity: product.quantity ?? 1,
      size: product.size ?? null,
      color: product.color ?? null,
    },
  ]);

  if (error) throw error;
  return true;
}
