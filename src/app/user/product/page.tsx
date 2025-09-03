"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/user/Card";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  colors: string[];
  sizes: {
    label: string;
    stock: number;
  }[];
  category: string;
}

interface Category {
  name: string;
  key: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Classic White T-Shirt",
    image: "/assets/tshirt1.jpg",
    price: 599,
    description: "Comfortable cotton t-shirt perfect for everyday wear",
    colors: ["#FFFFFF", "#000000", "#808080"],
    sizes: [
      { label: "S", stock: 10 },
      { label: "M", stock: 15 },
      { label: "L", stock: 8 },
      { label: "XL", stock: 5 }
    ],
    category: "t-shirt"
  },
  {
    id: "2",
    name: "Premium Black T-Shirt",
    image: "/assets/tshirt2.jpg",
    price: 799,
    description: "Premium quality black t-shirt with superior comfort",
    colors: ["#000000", "#FFFFFF", "#FF0000"],
    sizes: [
      { label: "S", stock: 12 },
      { label: "M", stock: 20 },
      { label: "L", stock: 18 },
      { label: "XL", stock: 10 }
    ],
    category: "t-shirt"
  },
  {
    id: "3",
    name: "Summer Shorts",
    image: "/assets/shorts1.jpg",
    price: 899,
    description: "Lightweight shorts perfect for summer activities",
    colors: ["#000080", "#008000", "#800000"],
    sizes: [
      { label: "S", stock: 8 },
      { label: "M", stock: 12 },
      { label: "L", stock: 15 },
      { label: "XL", stock: 6 }
    ],
    category: "shorts"
  },
  {
    id: "4",
    name: "Cargo Shorts",
    image: "/assets/shorts2.jpg",
    price: 1299,
    description: "Durable cargo shorts with multiple pockets",
    colors: ["#8B4513", "#000000", "#556B2F"],
    sizes: [
      { label: "S", stock: 5 },
      { label: "M", stock: 8 },
      { label: "L", stock: 12 },
      { label: "XL", stock: 7 }
    ],
    category: "shorts"
  },
  {
    id: "5",
    name: "Leather Watch",
    image: "/assets/watch1.jpg",
    price: 2999,
    description: "Elegant leather watch for any occasion",
    colors: ["#8B4513", "#000000"],
    sizes: [
      { label: "One Size", stock: 25 }
    ],
    category: "accessories"
  },
  {
    id: "6",
    name: "Classic Polo Shirt",
    image: "/assets/polo1.jpg",
    price: 1199,
    description: "Classic polo shirt for a refined look",
    colors: ["#FFFFFF", "#000080", "#800000"],
    sizes: [
      { label: "S", stock: 9 },
      { label: "M", stock: 16 },
      { label: "L", stock: 11 },
      { label: "XL", stock: 8 }
    ],
    category: "polo"
  }
];

const categories: Category[] = [
  { name: "T-shirt", key: "t-shirt" },
  { name: "Shorts", key: "shorts" },
  { name: "Accessories", key: "accessories" },
  { name: "Polo", key: "polo" }
];

export default function Product() {
  const [selectedCategory, setSelectedCategory] = useState<string>("t-shirt");
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const filtered = products.filter(product => 
      product.category.toLowerCase() === selectedCategory.toLowerCase()
    );
    setFilteredProducts(filtered);
  }, [selectedCategory, products]);

  const handleCategorySelect = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/user/fetchAllProducts'); 
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); 

  return (
    <section className="min-h-screen w-full bg-gray-50">
      <div className="flex min-h-screen">
        <div className="w-[30%] bg-white border-r border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-black">Categories</h2>
          </div>
          <ul className="text-[0.8rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.2rem] xl:text-[1.2rem] 2xl:text-[1.2rem]">
            {categories.map((category) => (
              <li
                key={category.key}
                className={`p-4 border-b border-gray-200 transition-colors duration-200 ${
                  selectedCategory === category.key
                    ? 'bg-gray-100 border-l-4 border-l-black'
                    : 'hover:bg-gray-50'
                }`}
              >
                <button
                  onClick={() => handleCategorySelect(category.key)}
                  className={`w-full text-left relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full ${
                    selectedCategory === category.key ? 'font-semibold' : ''
                  }`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-[70%] bg-white">
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-black mb-2 capitalize">
                {categories.find(cat => cat.key === selectedCategory)?.name || selectedCategory}
              </h1>
              <p className="text-gray-600">
                {loading ? 'Loading...' : `${filteredProducts.length} products found`}
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    price={product.price}
                    description={product.description}
                    colors={product.colors}
                    sizes={product.sizes}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m-3 0h1m3 0h1m10 0h1m3 0h1"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  No products available in the {selectedCategory} category.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}