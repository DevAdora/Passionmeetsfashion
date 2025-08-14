"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/user/Card";

export default function ProductGrid() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*");

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-[4rem] font-bold mb-6 text-left text-black uppercase">
        New Arrivals
      </h2>

      {loading ? (
        <p className="text-black">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-black">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image_url}
              price={product.price}
              description={product.description}
              colors={product.colors || []}
              sizes={product.sizes || []}
            />
          ))}
        </div>
      )}
    </div>
  );
}
