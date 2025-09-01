import { supabase } from "@/lib/supabase";
import { Order, Size } from "@/types/order"; 

export default async function cancelOrder(order: Order): Promise<boolean> {
  const { error: orderError } = await supabase
    .from("orders")
    .update({ status: "cancelled" })
    .eq("id", order.id);

  if (orderError) {
    console.error("Error cancelling order:", orderError);
    return false;
  }

  for (const item of order.order_items) {
    if (!item.products) {
      console.error("Order item has no associated product:", item);
      continue;
    }

    const productId = item.products.id;

    const { data: product, error: productError } = await supabase
      .from("products")
      .select("sizes")
      .eq("id", productId)
      .single();

    if (productError || !product) {
      console.error("Error fetching product:", productError);
      continue;
    }

    const sizes: Size[] = product.sizes || [];

    const updatedSizes = sizes.map((s) =>
      s.size === item.size ? { ...s, stock: s.stock + item.quantity } : s
    );

    const { error: updateError } = await supabase
      .from("products")
      .update({ sizes: updatedSizes })
      .eq("id", productId);

    if (updateError) {
      console.error("Error restoring stock:", updateError);
    }
  }

  return true;
}
