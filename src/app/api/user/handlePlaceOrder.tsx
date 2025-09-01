import { supabase } from "@/lib/supabase";

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

    // Insert order
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
      console.error("Order insert error:", orderError);
      alert("Failed to place order");
      return;
    }

    const order = orderData[0];

    // Insert items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id, // keep as string
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
      console.error("Order items insert error:", itemsError);
      alert("Failed to save order items");
      return;
    }

    // Update stock
    for (const item of items) {
      const { data: product, error: fetchError } = await supabase
        .from("products")
        .select("sizes")
        .eq("id", item.product_id)
        .single();

      if (fetchError || !product) {
        console.error("Error fetching product sizes:", fetchError);
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
        console.error("Error updating stock:", updateError);
      }
    }

    // Clear cart
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

    alert("Order placed successfully!");
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Something went wrong");
  }
}
