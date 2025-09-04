"use client";

import Image from "next/image";
import Link from "next/link";

export default function CategoriesSection() {
  return (
    <section className="container w-full flex justify-start items-start py-12 px-6 mx-auto mt-8">
      <div className="relative w-1/2 h-screen group overflow-hidden cursor-pointer">
        <Link href={`/user/product?category=Women`}>
          <Image
            src="/assets/model.png"
            alt="For Her"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/50 transition duration-500 group-hover:bg-black/20" />

          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-[1rem] md:text-[2rem] font-semibold tracking-wider uppercase relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-500 group-hover:after:w-full">
              For Her
            </h2>
          </div>

          <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="text-sm md:text-base font-medium tracking-wide uppercase">
              Browse
            </span>
          </div>
        </Link>
      </div>

      <div className="relative w-1/2 h-screen group overflow-hidden cursor-pointer">
        <Link href={`/user/product?category=Men`}>
          <Image
            src="/assets/model1.png"
            alt="For Him"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/50 transition duration-500 group-hover:bg-black/20" />

          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-[1rem] md:text-[2rem] font-semibold tracking-wider uppercase relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-500 group-hover:after:w-full">
              For Him
            </h2>
          </div>

          <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="text-sm md:text-base font-medium tracking-wide uppercase">
              Browse
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
