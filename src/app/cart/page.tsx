"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/user/Header";
import { useRouter } from "next/navigation";

type CartItem = {
  id: number;
  product_id: string;
  product_name: string;
  product_image: string;
  price: number;
  quantity: number;
  size: string | null;
  color: string | null;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchCart() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          console.error("Not logged in");
          return;
        }

        const { data, error } = await supabase
          .from("cart_items")
          .select("*")
          .eq("user_id", user.id);

        if (error) throw error;
        setCartItems(data || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  const toggleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleCheckout = () => {
    const selectedProducts = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );

    if (selectedProducts.length === 0) {
      alert("Please select at least one product to checkout.");
      return;
    }

    // Pass data to checkout page (you can use state, context, or query params)
    router.push(
      `/user/checkout?items=${encodeURIComponent(JSON.stringify(selectedProducts))}`
    );
  };

  if (loading) {
    return <div className="text-center py-10 text-black">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-10 text-black">Your cart is empty.</div>
    );
  }

  const totalPrice = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto py-10">
      <Header />

      <h1 className="text-3xl font-bold text-black mb-6">Your Cart</h1>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border p-4 rounded-lg bg-white shadow"
          >
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => toggleSelectItem(item.id)}
              className="w-5 h-5"
            />
            <img
              src={item.product_image}
              alt={item.product_name}
              className="w-20 h-20 object-contain border rounded"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-black">
                {item.product_name}
              </h2>
              <p className="text-gray-600">
                ₱{item.price.toLocaleString()} × {item.quantity}
              </p>
              {item.size && (
                <p className="text-gray-500 text-sm">Size: {item.size}</p>
              )}
              {item.color && (
                <div className="flex items-center gap-1">
                  <span className="text-gray-500 text-sm">Color:</span>
                  <span
                    className="inline-block w-4 h-4 rounded-full border"
                    style={{ backgroundColor: item.color }}
                  ></span>
                </div>
              )}
            </div>
            <div className="text-lg font-bold text-black">
              ₱{(item.price * item.quantity).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold text-black">
          Total: ₱{totalPrice.toLocaleString()}
        </p>
        <button
          onClick={handleCheckout}
          className="px-6 py-3 bg-black text-white font-semibold rounded-lg disabled:bg-gray-400"
          disabled={selectedItems.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
