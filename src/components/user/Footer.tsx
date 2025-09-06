"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import Link from "next/link";

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
        <div>
          <h3 className="font-semibold mb-4  border-b border-gray-300  text-[0.8rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.2rem] xl:text-[1.2rem] 2xl:text-[1.2rem]">
            Menu
          </h3>
          <ul className="space-y-2 text-[0.8rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.2rem] xl:text-[1.2rem] 2xl:text-[1.2rem]">
            {[
              "Home",
              "Products",
              "Contact",
              "About",
             
            ].map((item) => (
              <li key={item}>
                <Link
                  href={`/#${item.toLowerCase()}`}
                  className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4  border-b border-gray-300  text-[0.8rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.2rem] xl:text-[1.2rem] 2xl:text-[1.2rem]">
            Socials
          </h3>
          <ul className="space-y-2  text-[0.8rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.2rem] xl:text-[1.2rem] 2xl:text-[1.2rem]">
            <li>
              <a
                href="https://www.linkedin.com/in/rai-reyes-jr-6bb906272/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
              >
                Passion + Fashion
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
              >
                Amazon
              </a>
            </li>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4  border-b border-gray-300  text-[0.8rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.2rem] xl:text-[1.2rem] 2xl:text-[1.2rem]">
            Contacts
          </h3>
          <ul className="space-y-2  text-[0.8rem] sm:text-[1rem] md:text-[1.2rem] lg:text-[1.2rem] xl:text-[1.2rem] 2xl:text-[1.2rem]">
            <li>
              <a
                href="mailto:raireyesjr@gmail.com?subject=Hello&body=I want to contact you"
                className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
              >
                Gmail
              </a>
            </li>
            <li>
              <a
                href="viber://chat?number=%2B639171234567"
                className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
              >
                Viber
              </a>
            </li>
            <li>
              <a
                href="https://t.me/yourusername"
                className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
              >
                Telegram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-row sm:flex-row md:flex-row justify-between items-center mt-8 relative">
        <div className="text-xl md:text-2xl xl:text-[3rem] font-bold w-[40%] flex-wrap">
          © Passion + Fashion <br className="md:hidden" />
          <span className="font-semibold block md:inline">
            All rights reserved.
          </span>
        </div>

        <div className="mt-4 md:mt-0 text-right text-xs">
          <p className="font-semibold">LOCAL TIME</p>
          <p>
            {localTime} <span className="text-[10px]">, PHI</span>
          </p>
        </div>

        <button
          onClick={scrollToTop}
          className="absolute bottom-0 right-0 bg-black/50 rounded-full p-2 md:p-3 text-[#f0ede4] hover:bg-black transition cursor-pointer"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      </div>
    </footer>
  );
}
