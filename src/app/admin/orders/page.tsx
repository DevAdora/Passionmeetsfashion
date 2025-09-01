"use client";

import { useEffect, useState } from "react";
import fetchOrders from "@/app/api/admin/fetchOrders/route";
import confirmOrder from "@/app/api/admin/confirmOrder/route";
import { Order } from "@/types/order";

export default function AdminOrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    setLoading(true);
    const data = await fetchOrders();
    setOrders(data);
    setLoading(false);
  }

  async function handleConfirm(orderId: string) {
    const success = await confirmOrder(orderId);
    if (success) {
      loadOrders(); 
    }
  }

  return (
    <section className="p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      {loading && <p>Loading orders...</p>}

      <div className="grid grid-cols-1 gap-6">
        {orders.length === 0 ? (
          <div className="text-gray-500">No orders found</div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-gray-450 p-6 rounded-xl shadow-md text-black"
            >
              <div className="justify-between grid grid-cols-3 items-start gap-4">
                {/* Left side: order details */}
                <div>
                  <h1 className="font-semibold text-[1rem]">
                    Order ID: {order.id}
                  </h1>

                  {order.order_items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 mt-2">
                      {item.products && (
                        <>
                          <img
                            src={item.products.image_url}
                            alt={item.products.name}
                            className="w-16 h-16 rounded-md object-cover"
                          />
                          <div>
                            <h2 className="font-semibold">
                              {item.products.name}
                            </h2>
                            <p className="text-sm text-gray-700">
                              Qty: {item.quantity} × ${item.products.price}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Customer details */}
                <div className="w-full">
                  <p className="text-[1rem] mb-4">
                    <strong>Customer:</strong> {order.full_name}
                  </p>
                  <p className="text-[1rem] mb-4">
                    <strong>Address:</strong> {order.street}, {order.city}
                  </p>
                  <p className="text-[1rem] mb-4">
                    <strong>Payment:</strong> {order.payment_method}
                  </p>
                  <p className="text-[1rem]">
                    <strong>Status:</strong>{" "}
                    <span className="capitalize">{order.status}</span>
                  </p>
                </div>

                {/* Right side: payment + action */}
                <div className="flex flex-col items-end h-full justify-end ">
                  {order.status === "pending" ? (
                    <button
                      onClick={() => handleConfirm(order.id)}
                      className="bg-black text-white px-4 py-2 rounded-lg shadow-md transition cursor-pointer"
                    >
                      Confirm & Ship
                    </button>
                  ) : (
                    <span className="px-3 py-1 bg-green-200 text-green-800 rounded-lg">
                      {order.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
