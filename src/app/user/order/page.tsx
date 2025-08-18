"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

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

  return (
    <section className="p-6 bg-gray-50">
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
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
