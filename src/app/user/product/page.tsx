"use client";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/user/Card";
import fetchAllProducts from "@/app/api/user/fetchAllProduct";
import { Product } from "@/types/product";
import Header from "@/components/user/Header";
import { Menu, X, Filter } from "lucide-react";

function ProductContent() {
  const searchParams = useSearchParams();
  const genderCategory = searchParams.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [subcategories, setSubcategories] = useState<
    { key: string; name: string }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          setSelectedCategory(uniqueSubcats[0].key);
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

  const handleCategorySelect = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <section className="min-h-screen w-full bg-gray-50">
      <Header />
      
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-20 left-4 z-50 p-3 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
        aria-label="Toggle categories menu"
      >
        {sidebarOpen ? (
          <X className="w-5 h-5 text-gray-700" />
        ) : (
          <Filter className="w-5 h-5 text-gray-700" />
        )}
      </button>

      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-h-screen pt-4 lg:pt-0">
        <div
          className={`
            fixed lg:static top-0 left-0 h-full w-80 lg:w-[30%] bg-white border-r border-gray-200 z-45
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0 lg:shadow-none shadow-xl
          `}
        >
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-bold text-black flex items-center">
              <Filter className="w-5 h-5 mr-2 text-gray-600" />
              Categories
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="overflow-y-auto h-full pb-20">
            {subcategories.length > 0 ? (
              <ul>
                {subcategories.map((cat) => (
                  <li
                    key={cat.key}
                    className={`p-4 border-b cursor-pointer transition-all duration-200 ${
                      selectedCategory === cat.key
                        ? "bg-gray-100 border-l-4 border-l-black font-semibold text-black"
                        : "hover:bg-gray-50 text-gray-700 hover:text-black"
                    }`}
                    onClick={() => handleCategorySelect(cat.key)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{cat.name}</span>
                      {selectedCategory === cat.key && (
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-6 text-center text-gray-500">
                {loading ? "Loading categories..." : "No categories found"}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 lg:w-[70%] bg-white min-h-screen">
          <div className="p-4 lg:p-6">
            <div className="pt-12 lg:pt-0">
              <h1 className="text-2xl font-bold mb-2 capitalize text-gray-900">
                {subcategories.find((c) => c.key === selectedCategory)?.name ||
                  "Products"}
              </h1>
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  {loading
                    ? "Loading..."
                    : `${filteredProducts.length} products found`}
                </p>
                
                <div className="lg:hidden">
                  <button
                    onClick={toggleSidebar}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                  >
                    <Filter className="w-4 h-4 mr-1" />
                    Filter
                  </button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 lg:gap-6">
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
              <div className="text-center py-16">
                <div className="text-gray-400 mb-2">
                  <Filter className="w-12 h-12 mx-auto mb-4" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try selecting a different category or check back later.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    }>
      <ProductContent />
    </Suspense>
  );
}