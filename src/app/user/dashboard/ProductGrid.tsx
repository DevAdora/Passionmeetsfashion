"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import ProductCard from "@/components/user/Card";
import fetchProducts from "@/app/api/user/fetchProducts";

export default function ProductGrid() {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const { arrivals } = await fetchProducts();
      setNewArrivals(arrivals);

      setLoading(false);
    };
    loadProducts();
  }, []);

  function renderGrid(products: Product[]) {
    if (loading) return <p className="text-black">Loading products...</p>;
    if (products.length === 0)
      return <p className="text-black">No products found.</p>;

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={String(product.id)}
            name={product.name}
            image={product.image_url}
            price={product.price}
            description={product.description ?? ""}
            colors={product.colors || []}
            sizes={product.sizes || []}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="p-6 text-center w-full  md:w-[25%] md:text-left">
        <h2 className="text-[1.2rem] font-semibold mb-6 text-left text-white uppercase bg-black  p-4">
          New Arrivals
        </h2>
      </div>
      {renderGrid(newArrivals)}
    </div>
  );
}
