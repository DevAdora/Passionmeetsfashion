"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { supabase } from "@/lib/supabase";

const navItems = [
  { name: "Home ", path: "/user/dashboard" },
  { name: "Orders ", path: "/user/order" },
  { name: "Profile ", path: "/user/profile" },
  { name: "Cart ", path: "/cart" },
  { name: "Logout", path: "/auth/login" },
];

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Fetch cart count
  useEffect(() => {
    async function fetchCartCount() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const { count, error } = await supabase
        .from("cart_items")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      if (!error && typeof count === "number") {
        setCartCount(count);
      }
    }

    fetchCartCount();
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-end">
        {/* Burger + Cart */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
            <Link href="/cart" passHref>
            <button
              className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all hover:scale-105"
              style={{ backgroundColor: "#323333" }}
              aria-label="Cart"
            >
              <ShoppingCart className="w-6 h-6" style={{ color: "#f0ede4" }} />
              {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
              )}
            </button>
            </Link>

          {/* Burger */}
          <button
            onClick={toggleMobileMenu}
            className={`w-14 h-14 rounded-full flex flex-col justify-center items-center transition-all hover:scale-105 shadow-lg cursor-pointer ${
              isMobileMenuOpen ? "space-y-0" : "space-y-1"
            }`}
            style={{ backgroundColor: "#323333" }}
            aria-label="Toggle menu"
          >
            <span
              className={`w-7 h-0.5 transition-all duration-500 ease-in-out ${
                isMobileMenuOpen ? "rotate-45 translate-y-1" : "rotate-0"
              }`}
              style={{ backgroundColor: "#f0ede4" }}
            ></span>
            <span
              className={`w-7 h-0.5 transition-all duration-500 ease-in-out ${
                isMobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
              }`}
              style={{ backgroundColor: "#f0ede4" }}
            ></span>
            <span
              className={`w-7 h-0.5 transition-all duration-500 ease-in-out ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1" : "rotate-0"
              }`}
              style={{ backgroundColor: "#f0ede4" }}
            ></span>
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMobileMenu}
      ></div>

      {/* Side Menu Panel */}
      <div
        className={`fixed top-0 right-0 w-full md:w-[50%] min-w-[280px] h-full z-50 transform transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
        style={{ backgroundColor: "#323333" }}
      >
        <div className="flex flex-col p-8 space-y-8 h-full">
          {/* Close button */}
          <div className="flex justify-end items-center">
            <button
              onClick={closeMobileMenu}
              className="w-14 h-14 flex items-center justify-center relative rounded-full transition-all duration-300 hover:bg-white/10"
              aria-label="Close menu"
            >
              <span
                className="w-7 h-0.5 rotate-45 absolute transition-all duration-300"
                style={{ backgroundColor: "#f0ede4" }}
              ></span>
              <span
                className="w-7 h-0.5 -rotate-45 absolute transition-all duration-300"
                style={{ backgroundColor: "#f0ede4" }}
              ></span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-6 flex-1">
            {navItems.map((item, i) => (
              <Link
                key={i}
                href={item.path}
                onClick={closeMobileMenu}
                className={`text-[3rem] md:text[3.5rem] hover:opacity-80 transition-all duration-500 ease-out pb-3 transform ${
                  isMobileMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
                style={{
                  color: "#f0ede4",
                  borderColor: "#f0ede4",
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Footer text in menu */}
          <div
            className={`mt-auto transform transition-all duration-500 ease-out ${
              isMobileMenuOpen
                ? "translate-y-0 opacity-70"
                : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <p className="text-sm" style={{ color: "#f0ede4" }}>
              P + F
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
