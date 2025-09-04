"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/user/Card";
import fetchAllProducts from "@/app/api/user/fetchAllProduct";
import { Product } from "@/types/product";
import Header from "@/components/user/Header";

export default function ProductPage() {
  const searchParams = useSearchParams();
  const genderCategory = searchParams.get("category"); 

  const [products, setProducts] = useState<Product[]>([]);
  const [subcategories, setSubcategories] = useState<
    { key: string; name: string }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchAllProducts();

        const genderFiltered = data.filter(
          (p) => p.category?.toLowerCase() === genderCategory?.toLowerCase()
        );

        setProducts(genderFiltered);

        const uniqueSubcats = Array.from(
          new Set(
            genderFiltered
              .map((p) => p.subcategory?.toLowerCase())
              .filter(Boolean)
          )
        ).map((subcat) => ({
          key: subcat as string,
          name: subcat!.charAt(0).toUpperCase() + subcat!.slice(1),
        }));

        setSubcategories(uniqueSubcats);

        if (uniqueSubcats.length > 0) {
          setSelectedCategory(uniqueSubcats[0].key); // default
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [genderCategory]);

  useEffect(() => {
    if (!selectedCategory) return;
    const filtered = products.filter(
      (p) => p.subcategory?.toLowerCase() === selectedCategory.toLowerCase()
    );
    setFilteredProducts(filtered);
  }, [selectedCategory, products]);

  return (
    <section className="min-h-screen w-full bg-gray-50">
      <Header />
      <div className="flex min-h-screen">
        <div className="w-[30%] bg-white border-r border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-black">Categories</h2>
          </div>
          <ul>
            {subcategories.map((cat) => (
              <li
                key={cat.key}
                className={`p-4 border-b cursor-pointer ${
                  selectedCategory === cat.key
                    ? "bg-gray-100 border-l-4 border-l-black font-semibold"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div className="w-[70%] bg-white">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2 capitalize">
              {subcategories.find((c) => c.key === selectedCategory)?.name ||
                ""}
            </h1>
            <p className="text-gray-600">
              {loading
                ? "Loading..."
                : `${filteredProducts.length} products found`}
            </p>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id.toString()}
                    name={product.name}
                    image={product.image_url ?? "/fallback.jpg"}
                    price={product.price}
                    description={product.description ?? ""}
                    colors={product.colors ?? []}
                    sizes={product.sizes ?? []}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">No products found</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
