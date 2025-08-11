"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const time = new Date().toLocaleTimeString("en-PH", {
        timeZone: "Asia/Manila",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });
      setLocalTime(time);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="text-black py-12 px-8 md:px-16 text-sm font-light relative">
      <div className="grid grid-cols-3 md:grid-cols-3 gap-12 border-b border-gray-300 pb-8">
        {/* Menu */}
        <div>
          <h3 className="font-semibold mb-4  border-b border-gray-300  text-[0.8rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.2rem] xl:text-[1.2rem] 2xl:text-[1.2rem]">
            Menu
          </h3>
          <ul className="space-y-2 text-[0.8rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.2rem] xl:text-[1.2rem] 2xl:text-[1.2rem]">
            {[
              "Home",
              "Men",
              "Women",
              "Category",
            ].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="hover:underline">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="font-semibold mb-4  border-b border-gray-300  text-[0.8rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.2rem] xl:text-[1.2rem] 2xl:text-[1.2rem]">
            Socials
          </h3>
          <ul className="space-y-2 text-[0.8rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.2rem] xl:text-[1.2rem] 2xl:text-[1.2rem]">
            {["P+F", "YouTube", "Instagram", "Facebook"].map(
              (item) => (
                <li key={item}>
                  <a href="#" className="hover:underline">
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-4  border-b border-gray-300  text-[0.8rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.2rem] xl:text-[1.2rem] 2xl:text-[1.2rem]">
            Contacts
          </h3>
          <ul className="space-y-2  text-[0.8rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.2rem] xl:text-[1.2rem] 2xl:text-[1.2rem]">
            {["Gmail", "Viber", "Telegram", "Discord"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:underline">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-row sm:flex-row md:flex-row justify-between items-center mt-8 relative">
        <div className="text-xl md:text-2xl xl:text-[3rem] font-bold w-[40%] flex-wrap">
          © Passion meets Fashion <br className="md:hidden" />
        </div>

        <div className="mt-4 md:mt-0 text-right text-xs">
          <p className="font-semibold">LOCAL TIME</p>
          <p>
            {localTime} <span className="text-[10px]">, PHI</span>
          </p>
        </div>

        {/* Scroll to Top */}
        {/* <button
          onClick={scrollToTop}
          className="absolute bottom-0 right-0 bg-gray-300 rounded-full p-3 hover:bg-gray-400 transition"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button> */}
      </div>
    </footer>
  );
}
