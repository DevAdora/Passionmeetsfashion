"use client";

import { useEffect, useState } from "react";
import Header from "@/components/user/Header";
import fetchCustomerOrders from "@/app/api/user/fetchCustomerOrders";
import cancelOrder from "@/app/api/user/cancelOrder";
import { Order } from "@/types/order";

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    setLoading(true);
    const data = await fetchCustomerOrders();
    setOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function handleCancel(order: Order) {
    const success = await cancelOrder(order);
    if (success) {
      await loadOrders(); // refresh orders after cancellation
    }
  }

  return (
    <section className="p-6 min-h-screen w-full">
      <Header />
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {loading && <p>Loading your orders...</p>}

      <div className="grid grid-cols-1 gap-6">
        {!loading && orders.length === 0 ? (
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

                  {order.order_items.map((item, idx) => (
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
                        onClick={() => handleCancel(order)}
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
