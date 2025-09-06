import { supabase } from "@/lib/supabase";

export default async function deleteCartItem(cartItemId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not logged in");

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId)
    .eq("user_id", user.id);

  if (error) throw error;
  return true;
}
