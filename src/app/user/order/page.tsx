"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/user/Header";

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCustomerOrders();
  }, []);

  async function fetchCustomerOrders() {
    setLoading(true);

    // ✅ Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user:", userError);
      setLoading(false);
      return;
    }

    if (!user) {
      console.warn("No user logged in");
      setLoading(false);
      return;
    }

    // ✅ Fetch only this user's orders
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        id,
        full_name,
        street,
        city,
        payment_method,
        status,
        order_items (
          quantity,
          products (
            id,
            name,
            image_url,
            price
          )
        )
      `
      )
      .eq("user_id", user.id) // ✅ filter by logged-in user
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching customer orders:", error);
    } else {
      setOrders(data || []);
    }

    setLoading(false);
  }
  async function cancelOrder(order: any) {
    // 1) Update order status to cancelled
    const { error: orderError } = await supabase
      .from("orders")
      .update({ status: "cancelled" })
      .eq("id", order.id);

    if (orderError) {
      console.error("Error cancelling order:", orderError);
      return;
    }

    // 2) Restore stock for each order item
    for (const item of order.order_items) {
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

      // Find the size ordered and add stock back
      const updatedSizes = product.sizes.map((s: any) =>
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

    // Refresh orders list
    fetchCustomerOrders();
  }

  return (
    <section className="p-6 min-h-screen w-full">
      <Header />
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {loading && <p>Loading your orders...</p>}

      <div className="grid grid-cols-1 gap-6">
        {orders.length === 0 ? (
          <div className="text-gray-500">You have no orders yet</div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-xl shadow-md text-black"
            >
              <div className="grid grid-cols-2 gap-4">
                {/* Order items */}
                <div>
                  <h1 className="font-semibold text-[1rem] mb-2">
                    Order ID: {order.id}
                  </h1>

                  {order.order_items.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 mt-2">
                      {item.products?.image_url && (
                        <img
                          src={item.products.image_url}
                          alt={item.products.name}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                      )}
                      <div>
                        <h2 className="font-semibold">{item.products?.name}</h2>
                        <p className="text-sm text-gray-700">
                          Qty: {item.quantity} × ${item.products?.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order details */}
                <div className="flex justify-between h-full">
                  <div>
                  <p className="text-sm mb-2">
                    <strong>Address:</strong> {order.street}, {order.city}
                  </p>
                  <p className="text-sm mb-2">
                    <strong>Payment:</strong> {order.payment_method}
                  </p>
                  <p className="text-sm">
                    <strong>Status:</strong>{" "}
                    <span className="capitalize">{order.status}</span>
                  </p>
                  </div>
                  <div className="flex flex-col items-end justify-end w-[100%]">
                    {order.status === "pending" && (
                      <button
                        onClick={() => cancelOrder(order)}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
