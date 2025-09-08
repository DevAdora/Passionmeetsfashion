"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types/order";
import { FaLocationArrow } from "react-icons/fa";

export default function AdminOrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);
    const res = await fetch("/api/admin/orders");
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  }

  async function handleConfirm(orderId: string) {
    const res = await fetch("/api/admin/orders/co", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });

    const { success } = await res.json();
    if (success) {
      loadOrders();
    }
  }

  return (
    <section className="p-6 min-h-screen w-full mx-auto container">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {loading && <p>Loading orders...</p>}

      <div className="grid grid-cols-1 gap-6">
        {!loading && orders.length === 0 ? (
          <div className="text-gray-500">No orders found</div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-xl shadow-md text-black"
            >
              {/* Header row */}
              <div className="md:flex justify-between items-center mb-4">
                <h2 className="font-semibold text-sm md:text-base">
                  Order ID <span className="font-bold">#{order.id}</span>
                </h2>
                <div className="flex md:grid md:grid-cols-2 items-center gap-4 pt-3">
                  <span className="text-xs text-gray-500">
                    Customer: {order.full_name}
                  </span>
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      order.status === "confirmed"
                        ? "bg-green-100 text-green-600"
                        : order.status === "shipped"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-4">
                <span className="">───────── </span>
                <FaLocationArrow className="rotate-[45deg] mx-2" />
                <span>
                  {order.street}, {order.city}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {order.order_items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 border rounded-lg p-3"
                  >
                    {item.products?.image_url && (
                      <img
                        src={item.products.image_url}
                        alt={item.products?.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-sm">
                        {item.products?.name}
                      </h3>
                      <p className="text-sm text-gray-700">
                        ₱ {item.products?.price} × {item.quantity}
                      </p>
                      {item.size && (
                        <p className="text-xs text-gray-500">
                          Size: {item.size}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <p className="font-semibold">
                  ₱{" "}
                  {order.order_items
                    .reduce(
                      (sum, item) =>
                        sum + (item.products?.price || 0) * item.quantity,
                      0
                    )
                    .toLocaleString("id-ID")}{" "}
                  <span className="text-gray-500 text-sm">
                    ({order.order_items.length} Items)
                  </span>
                </p>
                {order.status === "pending" ? (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleConfirm(order.id)}
                      className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                    >
                      Confirm & Ship
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 flex justify-end">
                    <span className="px-4 py-2 bg-green-100 text-green-600 rounded-md text-sm font-medium">
                      {order.status}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}