"use client";

import { useState } from "react";

export default function CategoriesSection() {
  const categories = [
    {
      name: "Men",
      subcategories: ["T-Shirts", "Shorts", "Jackets", "Shoes"],
    },
    {
      name: "Women",
      subcategories: ["Dresses", "Tops", "Skirts", "Heels"],
    },
    {
      name: "Accessories",
      subcategories: ["Bags", "Hats", "Watches", "Jewelry"],
    },
  ];

  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (name: string) => {
    setOpenCategory((prev) => (prev === name ? null : name));
  };

  return (
    <section className="container min-h-full w-full b flex flex-col justify-start items-start py-12 px-6 mx-auto mt-8">
      <h1 className="text-[4rem] font-bold mb-12 tracking-wide text-black uppercase">
        Categories
      </h1>
      <div className="gap-10 w-full">
        {categories.map((category) => (
          <div
            key={category.name}
            className="items-center w-full border-b border-black pb-6 mb-6"
          >
            <button
              onClick={() => toggleCategory(category.name)}
              className="text-4xl font-bold text-black hover:text-black transition"
            >
              {category.name}
            </button>

            {/* Smooth Dropdown */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openCategory === category.name
                  ? "max-h-60 opacity-100 mt-6"
                  : "max-h-0 opacity-0"
              } w-full`}
            >
              <ul className="text-left space-y-4">
                {category.subcategories.map((sub) => (
                  <li
                    key={sub}
                    className="text-[2rem] text-black hover:text-black cursor-pointer transition"
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
