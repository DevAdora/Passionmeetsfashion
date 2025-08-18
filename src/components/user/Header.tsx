"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { supabase } from "@/lib/supabase";

const navItems = [
  { name: "Home", path: "/user/dashboard" },
  { name: "Orders", path: "/user/order" },
  { name: "Profile", path: "/user/profile" },
  { name: "Cart", path: "/cart" }, // ✅ Add this

  { name: "Logout", path: "/auth/login" },
];

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsScrolled(window.scrollY > heroHeight * 0.3);
    };

    checkMobile();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

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

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={`${isScrolled ? "top-0 left-0 w-full z-50 " : "relative "}`}
      >
        <nav>
          {/* === Desktop Nav === */}
          <div className="header hidden md:flex justify-between items-center p-7">
            <div className="text-[1.2rem] font-bold text-gray-950">
              <h1>Passion + Fashion</h1>
            </div>

            {!isScrolled ? (
              <ul className="flex gap-[15px] items-center">
                {navItems.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.path}
                      className="text-light-dark text-[1.2rem] font-medium hover:text-gray-950 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}

                {/* Cart Icon */}
                <li>
                  <Link href="/cart" className="relative">
                    <ShoppingCartIcon className="w-7 h-7 text-gray-900 hover:text-black" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </li>
              </ul>
            ) : null}
          </div>
        </nav>
      </header>

      {/* Floating Burger Button - Shows when scrolled or on mobile */}
      {(isScrolled || isMobile) && (
        <button
          onClick={toggleMobileMenu}
          className={`fixed top-4 right-10 z-50 w-20 h-20 rounded-full flex flex-col justify-center items-center space-y-1 transition-all duration-300 hover:scale-105 shadow-lg cursor-pointer ${
            isMobileMenuOpen ? "space-y-0" : "space-y-1"
          }`}
          style={{ backgroundColor: "#323333" }}
          aria-label="Toggle menu"
        >
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}      
          <span
            className={`w-10 h-0.5 transition-all duration-500 ease-in-out ${
              isMobileMenuOpen
                ? "rotate-45 translate-y-0.5"
                : "rotate-0 translate-y-0"
            }`}
            style={{ backgroundColor: "#f0ede4" }}
          ></span>
          <span
            className={`w-10 h-0.5 transition-all duration-500 ease-in-out ${
              isMobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
            style={{ backgroundColor: "#f0ede4" }}
          ></span>
          <span
            className={`w-10 h-0.5 transition-all duration-500 ease-in-out ${
              isMobileMenuOpen
                ? "-rotate-45 -translate-y-0.5"
                : "rotate-0 translate-y-0"
            }`}
            style={{ backgroundColor: "#f0ede4" }}
          ></span>
        </button>
      )}

      {/* Side Menu Panel */}
      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/50 z-40 transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={closeMobileMenu}
        ></div>

        {/* Side Menu Panel - 30% width */}
        <div
          className={`fixed top-0 right-0 w-[100%] md:w-[50%] min-w-[280px] h-full z-50 transform transition-all duration-500 ease-in-out ${
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
                className="w-20 h-20 flex items-center justify-center relative rounded-full transition-all duration-300 hover:bg-white/10"
                aria-label="Close menu"
              >
                <span
                  className="w-10 h-0.5 rotate-45 absolute transition-all duration-300"
                  style={{ backgroundColor: "#f0ede4" }}
                ></span>
                <span
                  className="w-10 h-0.5 -rotate-45 absolute transition-all duration-300"
                  style={{ backgroundColor: "#f0ede4" }}
                ></span>
              </button>
            </div>

            {/* Navigation Links in Burger */}
            <nav className="flex flex-col space-y-6 flex-1">
              {navItems.map((item, i) => {
                if (item.name === "Cart") {
                  return (
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
                      {cartCount > 0 && (
                        <span className="ml-3 bg-red-500 text-white text-sm px-2 py-0.5 rounded-full">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  );
                }

                return (
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
                );
              })}
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
                Passion + Fashion
              </p>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
