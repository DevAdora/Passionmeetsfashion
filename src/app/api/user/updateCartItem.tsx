import { supabase } from "@/lib/supabase";

export type CartUpdate = {
  cartItemId: string; 
  size?: string | null;
  color?: string | null;
  quantity?: number;
  image?: string;
  price?: number;
};

export default async function updateCartItem(update: CartUpdate) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not logged in");

  const { error } = await supabase
    .from("cart_items")
    .update({
      size: update.size ?? null,
      color: update.color ?? null,
      quantity: update.quantity ?? 1,
    })
    .eq("id", update.cartItemId)
    .eq("user_id", user.id);

  if (error) throw error;
  return true;
}
