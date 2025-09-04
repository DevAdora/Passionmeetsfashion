import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  product_id: string; // bigint from Supabase → string here
  product_name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
}

interface PlaceOrderProps {
  address: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    postal: string;
  };
  paymentMethod: string;
  finalPrice: number;
  items: CartItem[];
}

export default async function handlePlaceOrder({
  address,
  paymentMethod,
  finalPrice,
  items,
}: PlaceOrderProps) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      alert("You must be logged in to place an order");
      return;
    }

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          user_id: user.id,
          full_name: address.fullName,
          phone: address.phone,
          street: address.street,
          city: address.city,
          postal: address.postal,
          payment_method: paymentMethod,
          total_price: finalPrice,
          status: "pending",
        },
      ])
      .select();

    if (orderError || !orderData || orderData.length === 0) {
      toast.error("Order insert error");
      alert("Failed to place order");
      return;
    }

    const order = orderData[0];

    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      toast.error("Order items insert error");
      alert("Failed to save order items");
      return;
    }

    for (const item of items) {
      const { data: product, error: fetchError } = await supabase
        .from("products")
        .select("sizes")
        .eq("id", item.product_id)
        .single();

      if (fetchError || !product) {
        toast.error("Error fetching product sizes");
        continue;
      }

      const sizes: { label: string; stock: number }[] = product.sizes || [];

      const updatedSizes = sizes.map((s) => {
        if (s.label === item.size) {
          if (s.stock < item.quantity) {
            throw new Error(
              `Not enough stock for ${item.product_name} - ${item.size}`
            );
          }
          return { ...s, stock: s.stock - item.quantity };
        }
        return s;
      });

      const { error: updateError } = await supabase
        .from("products")
        .update({ sizes: updatedSizes })
        .eq("id", item.product_id);

      if (updateError) {
        toast.error("Error updating stock" );
      }
    }

    const { error: clearCartError } = await supabase
      .from("cart_items")
      .delete()
      .in(
        "id",
        items.map((i) => i.id)
      )
      .eq("user_id", user.id);

    if (clearCartError) {
      console.error("Error clearing cart:", clearCartError);
    }

    toast.success("Order placed successfully!");
  } catch (err) {
    toast.error("Something went wrong");
  }
}
