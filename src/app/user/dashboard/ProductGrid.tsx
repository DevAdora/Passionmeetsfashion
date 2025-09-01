"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import ProductCard from "@/components/user/Card";
import fetchProducts from "@/app/api/user/fetchProducts";

export default function ProductGrid() {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [menProducts, setMenProducts] = useState<Product[]>([]);
  const [womenProducts, setWomenProducts] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const { arrivals, men, women, accessories } = await fetchProducts();
      setNewArrivals(arrivals);
      setMenProducts(men);
      setWomenProducts(women);
      setAccessories(accessories);
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
      <h2 className="text-[4rem] font-bold mb-6 text-left text-black uppercase">
        New Arrivals
      </h2>
      {renderGrid(newArrivals)}

      <h2 className="text-[4rem] font-bold mb-6 text-left text-black uppercase">
        Men Top Picks
      </h2>
      {renderGrid(menProducts)}

      <h2 className="text-[4rem] font-bold mb-6 text-left text-black uppercase">
        Women Top Picks
      </h2>
      {renderGrid(womenProducts)}

      <h2 className="text-[4rem] font-bold mb-6 text-left text-black uppercase">
        Accessories Top Picks
      </h2>
      {renderGrid(accessories)}
    </div>
  );
}
