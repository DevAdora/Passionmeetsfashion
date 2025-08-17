"use client";

import Header from "@/components/user/Header";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {
  const searchParams = useSearchParams();

  const items = useMemo(() => {
    const itemsParam = searchParams.get("items");
    if (!itemsParam) return [];
    try {
      return JSON.parse(itemsParam);
    } catch (e) {
      console.error("Error parsing checkout items:", e);
      return [];
    }
  }, [searchParams]);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    postal: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);

  const totalPrice = items.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
  );
  const finalPrice = totalPrice - discount;

  // ✅ Fetch logged-in user profile
  useEffect(() => {
    async function fetchUserProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("username, phone, street, city, postal")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      if (profile) {
        setAddress({
          fullName: profile.username || "",
          phone: profile.phone || "",
          street: profile.street || "",
          city: profile.city || "",
          postal: profile.postal || "",
        });
      }
    }

    fetchUserProfile();
  }, []);

  function applyVoucher() {
    if (voucher === "DISCOUNT10") {
      setDiscount(totalPrice * 0.1);
    } else {
      setDiscount(0);
      alert("Invalid voucher code");
    }
  }

  function handlePlaceOrder() {
    console.log("Placing order with:", {
      items,
      address,
      paymentMethod,
      total: finalPrice,
    });
    alert("Order placed successfully!");
  }

  return (
    <main className="min-h-screen w-full container mx-auto">
      <Header />
      <div className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
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

          {/* Voucher / Discount */}
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
                onClick={applyVoucher}
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
            {items.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-semibold text-black">
                    {item.product_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} × ₱{item.price.toLocaleString()}
                  </p>
                </div>
                <p className="font-bold text-black">
                  ₱{(item.quantity * item.price).toLocaleString()}
                </p>
              </div>
            ))}

            {/* Totals */}
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

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
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
