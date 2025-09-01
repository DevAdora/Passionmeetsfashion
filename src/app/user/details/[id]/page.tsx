"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/user/Header";
import addToCart from "@/app/api/user/addToCart";
import RelatedProducts from "@/components/user/RelatedProduct";
import Footer from "@/components/user/Footer";

interface Product {
  id: string;
  name: string;
  image_url: string;
  price: number;
  description: string;
  colors: string[];
  sizes: { label: string; stock: number }[];
}

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  async function fetchProduct() {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) {
      setProduct(data);
      setSelectedColor(data.colors?.[0] || null);
      setSelectedSize(data.sizes?.[0]?.label || "");
    }
    setLoading(false);
  }

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await addToCart({
        id: product.id,
        name: product.name,
        image: product.image_url,
        price: product.price,
        quantity: 1,
        size: selectedSize,
        color: selectedColor,
      });
      alert(`${product.name} added to cart successfully! 🛒`);
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("Something went wrong adding to cart.");
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;

   
    try {
      await addToCart({
        id: product.id,
        name: product.name,
        image: product.image_url,
        price: product.price,
        quantity: 1,
        size: selectedSize,
        color: selectedColor,
      });
      router.push("/checkout");
    } catch (err) {
      console.error("Failed to process Buy Now:", err);
      alert("Something went wrong with Buy Now.");
    }
  };

  if (loading) return <p className="text-black">Loading...</p>;
  if (!product) return <p className="text-black">Product not found.</p>;

  return (
    <div className="container mx-auto p-8 mt-[5%]">
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-[500px] object-contain rounded-xl"
        />

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold text-black">{product.name}</h1>
          <p className="text-2xl font-semibold mt-4 text-black">
            ₱{product.price.toLocaleString()}
          </p>
          <p className="mt-6 text-gray-700">{product.description}</p>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-black">Available Colors:</h3>
              <div className="flex gap-3 mt-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-10 h-10 rounded-full border-2 transition ${
                      selectedColor === color
                        ? "ring-2 ring-black scale-110"
                        : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-black">Available Sizes:</h3>
              <div className="flex gap-2 mt-2">
                {product.sizes.map((size, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 border rounded-full text-sm transition ${
                      selectedSize === size.label
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => setSelectedSize(size.label)}
                    disabled={size.stock <= 0}
                  >
                    {size.label} ({size.stock})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 px-4 py-2 border rounded bg-black text-white cursor-pointer hover:bg-gray-800"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 px-4 py-2 bg-black text-white rounded cursor-pointer hover:bg-gray-800"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <RelatedProducts />
      <Footer />
    </div>
  );
}
