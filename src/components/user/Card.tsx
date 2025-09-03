"use client";

import { useState } from "react";
import addToCart from "@/app/api/user/addToCart";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  colors: string[];
  sizes: { label: string; stock: number }[];
}

export default function ProductCard({
  id,
  name,
  image,
  price,
  description,
  colors,
  sizes,
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]?.label || "");
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"cart" | "buy">("cart");

  const handleActionClick = (type: "cart" | "buy") => {
    setActionType(type);
    setModalOpen(true);
  };

  return (
    <>
      <div className="transition overflow-hidden">
        <Link href={`/user/details/${id}`}>
          <div className="bg-gray-100 p-5">
            <img
              src={image}
              alt={name}
              className="w-full h-100 object-contain"
            />
          </div>
        </Link>

        <div>
          <h3 className="text-lg font-semibold text-black">{name}</h3>
          <p className="text-gray-600">₱{price.toLocaleString()}</p>

          <div className="mt-4 flex items-center gap-3">
            {/* Buy Now button */}
            <button
              onClick={() => handleActionClick("buy")}
              className="w-1/2 px-4 py-2 bg-text text-black rounded border-black border hover:bg-black hover:text-white cursor-pointer tracking-white font-semibold uppercase"
            >
              Buy Now
            </button>

            {/* Add to Cart icon */}
            <button
              onClick={() => handleActionClick("cart")}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-black hover:bg-gray-800 cursor-pointer "
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-6 h-6 text-[#f0ede4]" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-black hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-black text-xl font-bold mb-4">{name}</h2>
            <img
              src={image}
              alt={name}
              className="w-full h-60 object-contain rounded-lg mb-4"
            />
            <p className="text-black mb-2">{description}</p>
            <p className="text-black font-semibold mb-4">
              ₱{price.toLocaleString()}
            </p>

            <div className="mb-4">
              <p className="font-medium mb-1 text-black">Color:</p>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor === color ? "ring-2 ring-black" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="font-medium mb-1 text-black">Size:</p>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size.label}
                    className={`px-3 py-1 border rounded ${
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

            <button
              onClick={async () => {
                if (actionType === "cart") {
                  try {
                    await addToCart({
                      id,
                      name,
                      image,
                      price,
                      quantity: 1,
                      size: selectedSize,
                      color: selectedColor,
                    });
                    console.log(`${name} added to cart successfully!`);
                  } catch (err) {
                    console.error("Failed to add to cart:", err);
                  }
                } else {
                  console.log("Buying now", {
                    id,
                    name,
                    selectedColor,
                    selectedSize,
                  });
                }
                setModalOpen(false);
              }}
              className="w-full py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              {actionType === "cart" ? "Add to Cart" : "Buy Now"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
