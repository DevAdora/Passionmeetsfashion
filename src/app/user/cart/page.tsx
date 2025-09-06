"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Header from "@/components/user/Header";
import { useRouter } from "next/navigation";
import deleteCartItem from "@/app/api/user/deleteCartItem";
import updateCartItem from "@/app/api/user/updateCartItem";
import { FaTrash } from "react-icons/fa";

export const dynamic = "force-dynamic";

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
  const [editingItem, setEditingItem] = useState<CartItem | null>(null); // for modal
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

        const normalized = (data || []).map((item) => ({
          ...item,
          price: Number(item.price) || 0,
        }));

        setCartItems(normalized);
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

  const handleDelete = async (id: number) => {
    try {
      await deleteCartItem(id.toString());
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  const handleUpdate = async () => {
    if (!editingItem) return;
    try {
      await updateCartItem({
        cartItemId: editingItem.id.toString(),
        size: editingItem.size,
        color: editingItem.color,
        quantity: editingItem.quantity,
        image: editingItem.product_image,
        price: editingItem.price,
      });
      setCartItems((prev) =>
        prev.map((item) => (item.id === editingItem.id ? editingItem : item))
      );
      setEditingItem(null);
    } catch (err) {
      console.error("Failed to update item:", err);
    }
  };

  const handleCheckout = () => {
    const selectedProducts = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );

    if (selectedProducts.length === 0) {
      alert("Please select at least one product to checkout.");
      return;
    }

    router.push(
      `/user/checkout?items=${encodeURIComponent(
        JSON.stringify(selectedProducts)
      )}`
    );
  };

  if (loading) {
    return <div className="text-center py-10 text-black">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div>
        <Header />
        <div className="text-center py-10 text-black">Your cart is empty.</div>
      </div>
    );
  }

  const totalPrice = cartItems
    .filter((item) => selectedItems.includes(item.id))
    .reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-10 min-h-screen w-full ">
      <Header />

      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
      <div className="space-y-4 ">
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

            <div
              className="flex-1 cursor-pointer"
              onClick={() => setEditingItem(item)} // click to edit
            >
              <h2 className="text-[0.7rem] md:text-[1rem] font-semibold text-black">
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

            <div className="flex flex-col items-end gap-2">
              <button
                onClick={() => handleDelete(item.id)}
                className="px-3 py-1 text-red-600 rounded hover:bg-red-600 hover:text-white cursor-pointer text-sm"
              >
                <FaTrash />
              </button>
              <div className="text-lg font-semibold text-black">
                ₱{(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-semibold text-black">
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

      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
            <button
              onClick={() => setEditingItem(null)}
              className="absolute top-3 right-3 text-black"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-black">Edit Item</h2>
            <img
              src={editingItem.product_image}
              className="w-full h-20 object-contain rounded-lg mb-4"
            />
            <p className="text-black font-semibold mb-4">
              ₱{editingItem.price.toLocaleString()}
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Quantity
              </label>
              <input
                type="number"
                min={1}
                value={editingItem.quantity}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    quantity: Number(e.target.value),
                  })
                }
                className="mt-1 w-full border rounded p-2 text-black"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Size
              </label>
              <input
                type="text"
                value={editingItem.size || ""}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, size: e.target.value })
                }
                className="mt-1 w-full border rounded p-2 text-black"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-black">
                Color
              </label>
              <input
                type="text"
                value={editingItem.color || ""}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, color: e.target.value })
                }
                className="mt-1 w-full border rounded p-2 text-black"
              />
            </div>

            <button
              onClick={handleUpdate}
              className="w-full py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Update Item
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
