"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Grid() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const boxes = gsap.utils.toArray<HTMLDivElement>(".word-box");

      if (boxes.length > 0 && sliderRef.current) {
        const totalWidth = sliderRef.current.scrollWidth;

        gsap.to(sliderRef.current, {
          x: `-${totalWidth / 2}px`,
          duration: 20,
          ease: "linear",
          repeat: -1,
        });
      }
    }, sliderRef);

    return () => ctx.revert(); 
  }, []);

  const words = [
    "AESTHETIC",
    "COMFORT",
    "TREND",
    "LIT",
    "CHIC",
    "CONTEMPORARY",
    "MODISH",
    "SNAZZY",
    "STYLISH",
    "ON-POINT",
    "SLAY",
  ];

  return (
    <section className="w-full overflow-hidden mb-4">
      <div className="relative flex w-full">
        <div ref={sliderRef} className="flex gap-4">
          {words.map((word, i) => (
            <div
              key={`word-${i}`}
              className="word-box border border-black p-2 rounded-lg flex justify-center items-center min-w-[160px] text-center"
            >
              <h1 className="text-lg">{word}</h1>
            </div>
          ))}
          {words.map((word, i) => (
            <div
              key={`word-dup-${i}`}
              className="word-box border border-black p-2 rounded-lg flex justify-center items-center min-w-[160px] text-center"
            >
              <h1 className="text-lg">{word}</h1>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
