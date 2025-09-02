"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Hero() {
  const bigImageRef = useRef<HTMLDivElement>(null);
  const smallImage1Ref = useRef<HTMLDivElement>(null);
  const smallImage2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    tl.from(bigImageRef.current, {
      opacity: 0,
      y: 100,
    })
      .from(smallImage1Ref.current, { opacity: 0, y: 100 }, "-=0.5")
      .from(smallImage2Ref.current, { opacity: 0, y: 100 }, "-=0.5");
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center">
      <div className="flex gap-2 p-5 w-full">
        <div
          ref={bigImageRef}
          className="w-[70%] h-[100%] rounded-lg overflow-hidden flex justify-center items-center"
        >
          <Image
            src="/assets/model6.png"
            alt="Main model"
            width={1000}
            height={600}
            className="h-full w-full object-contain"
            priority
          />
        </div>

        {/* Small image 1 */}
        <div
          ref={smallImage1Ref}
          className="w-[25%] h-[100%] rounded-lg overflow-hidden flex justify-center items-center"
        >
          <Image
            src="/assets/model3.jpg"
            alt="Model 1"
            width={400}
            height={600}
            className="h-full w-full object-contain"
          ></Image>
        </div>

        {/* Small image 2 */}
        <div
          ref={smallImage2Ref}
          className="w-[25%] h-[100%] rounded-lg overflow-hidden flex justify-center items-center"
        >
          <Image
            src="/assets/model5.jpg"
            alt="Model 2"
            width={400}
            height={600}
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
