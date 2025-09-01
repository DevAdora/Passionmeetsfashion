"use client";

import Header from "@/components/user/Header";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState, useEffect } from "react";
import applyVoucher from "@/app/api/user/applyVoucher";
import fetchUserProfile from "@/app/api/user/fetchUserProfile";
import handlePlaceOrder from "@/app/api/user/handlePlaceOrder";
import type { CartItem } from "@/app/api/user/handlePlaceOrder";

function CheckoutContent() {
  const [discount, setDiscount] = useState(0);
  const [voucher, setVoucher] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    postal: "",
  });

  const searchParams = useSearchParams();

  const items: CartItem[] = useMemo(() => {
    const itemsParam = searchParams.get("items");
    if (!itemsParam) return [];
    try {
      return JSON.parse(itemsParam) as CartItem[];
    } catch (e) {
      console.error("Error parsing checkout items:", e);
      return [];
    }
  }, [searchParams]);

  const totalPrice = items.reduce(
    (total: number, item) => total + item.price * item.quantity,
    0
  );

  const finalPrice = totalPrice - discount;

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await fetchUserProfile();
      if (profile) setAddress(profile);
    };
    loadProfile();
  }, []);

  const handleApplyVoucher = () => {
    const result = applyVoucher(voucher);
    if (result.success) {
      setDiscount(finalPrice * 0.1);
    } else {
      alert(result.message);
    }
  };

  const placeOrder = async () => {
    await handlePlaceOrder({
      address,
      paymentMethod,
      finalPrice,
      items,
    });
  };

  return (
    <main className="min-h-screen w-full container mx-auto">
      <Header />
      <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white shadow p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-black">
              Shipping Address
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="border p-2 rounded"
                value={address.fullName}
                onChange={(e) =>
                  setAddress({ ...address, fullName: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="border p-2 rounded"
                value={address.phone}
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Street Address"
                className="border p-2 rounded col-span-2"
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="City"
                className="border p-2 rounded"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Postal Code"
                className="border p-2 rounded"
                value={address.postal}
                onChange={(e) =>
                  setAddress({ ...address, postal: e.target.value })
                }
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white shadow p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-black">
              Payment Method
            </h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                Credit/Debit Card
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="gcash"
                  checked={paymentMethod === "gcash"}
                  onChange={() => setPaymentMethod("gcash")}
                />
                GCash / PayPal
              </label>
            </div>
          </div>

          {/* Voucher */}
          <div className="bg-white shadow p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-black">Voucher</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter voucher code"
                className="border p-2 rounded flex-1"
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
              />
              <button
                onClick={handleApplyVoucher}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4 text-black">Order Summary</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start border-b pb-2"
              >
                <div>
                  <p className="font-semibold text-black">
                    {item.product_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} × ₱{item.price.toLocaleString()}
                  </p>
                  {item.size && (
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                  )}
                  {item.color && (
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <span>Color:</span>
                      <span
                        className="inline-block w-3 h-3 rounded-full border"
                        style={{ backgroundColor: item.color }}
                      ></span>
                    </div>
                  )}
                </div>
                <p className="font-bold text-black">
                  ₱{(item.quantity * item.price).toLocaleString()}
                </p>
              </div>
            ))}

            <div className="flex justify-between font-semibold text-black">
              <span>Subtotal</span>
              <span>₱{totalPrice.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₱{discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-xl text-black">
              <span>Total</span>
              <span>₱{finalPrice.toLocaleString()}</span>
            </div>

            <button
              onClick={placeOrder}
              className="bg-black text-white w-full py-3 rounded-lg font-semibold mt-4"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
