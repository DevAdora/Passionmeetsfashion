"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/user/Card";

export default function ProductGrid() {
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const [menProducts, setMenProducts] = useState<any[]>([]);
  const [womenProducts, setWomenProducts] = useState<any[]>([]);
  const [accessories, setAccessories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);

    // ✅ Fetch latest 4 for New Arrivals
    const { data: arrivalsData } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(4);

    // ✅ Fetch Men products
    const { data: menData } = await supabase
      .from("products")
      .select("*")
      .ilike("category", "men") // case-insensitive
      .order("created_at", { ascending: false })
      .limit(4);

    // ✅ Fetch Women products
    const { data: womenData } = await supabase
      .from("products")
      .select("*")
      .ilike("category", "%women%")
      .order("created_at", { ascending: false })
      .limit(4);

    // ✅ Fetch Accessories
    const { data: accessoriesData } = await supabase
      .from("products")
      .select("*")
      .ilike("category", "%accessories%")
      .order("created_at", { ascending: false })
      .limit(4);

    setNewArrivals(arrivalsData || []);
    setMenProducts(menData || []);
    setWomenProducts(womenData || []);
    setAccessories(accessoriesData || []);

    setLoading(false);
  }

  function renderGrid(products: any[]) {
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
