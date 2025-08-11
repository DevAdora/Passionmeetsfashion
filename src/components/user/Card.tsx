"use client";

import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  colors: string[];
  sizes: string[];
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
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"cart" | "buy">("cart");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const handleActionClick = (type: "cart" | "buy") => {
    setActionType(type);
    setModalOpen(true);
  };

  return (
    <>
      {/* Product Card */}
      <div className="border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
        <img src={image} alt={name} className="w-full h-60 object-contain" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-black">{name}</h3>
          <p className="text-gray-600">₱{price.toLocaleString()}</p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => handleActionClick("cart")}
              className="flex-1 px-4 py-2 border rounded text-black hover:bg-gray-100"
            >
              Add to Cart
            </button>
            <button
              onClick={() => handleActionClick("buy")}
              className="flex-1 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-black hover:text-black"
            >
              ✕
            </button>

            {/* Modal Content */}
            <h2 className="text-black text-xl font-bold mb-4">{name}</h2>
            <img
              src={image}
              alt={name}
              className="w-full h-60 object-contain rounded-lg mb-4"
            />
            <p className="text-black mb-2">{description}</p>
            <p className="text-black font-semibold mb-4">₱{price.toLocaleString()}</p>

            {/* Color selection */}
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

            {/* Size selection */}
            <div className="mb-6">
              <p className="font-medium mb-1 text-black">Size:</p>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-3 py-1 border rounded ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => {
                setModalOpen(false);
                if (actionType === "cart") {
                  console.log("Added to cart", {
                    id,
                    name,
                    selectedColor,
                    selectedSize,
                  });
                } else {
                  console.log("Buying now", {
                    id,
                    name,
                    selectedColor,
                    selectedSize,
                  });
                }
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
