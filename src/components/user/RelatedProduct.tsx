"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/user/Card";
import { Product } from "@/types/product";

export default function RelatedProducts() {
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);

    const { data: relatedData, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(4);

    if (error) {
      console.error("Error fetching related products:", error);
      setRelated([]);
    } else {
      setRelated(relatedData as Product[]);
    }

    setLoading(false);
  }

  function renderGrid(products: Product[]) {
    if (loading) return <p className="text-black">Loading products...</p>;
    if (products.length === 0)
      return <p className="text-black">No products found.</p>;

    return (
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
    );
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-[4rem] font-bold mb-6 text-left text-black uppercase">
        Related Products
      </h2>
      {renderGrid(related)}
    </div>
  );
}
