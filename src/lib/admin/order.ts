import { supabaseServer } from "@/lib/server";

export default async function confirmOrder(orderId: string): Promise<boolean> {
  const { error } = await supabaseServer
    .from("orders")
    .update({ status: "shipped" })
    .eq("id", orderId);

  if (error) {
    console.error("Error updating order:", error);
    return false;
  }

  return true;
}
