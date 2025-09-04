"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
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
      <div className="hidden lg:flex lg:gap-2 lg:p-5 lg:w-full">
        <div className="w-[70%] h-[100%] justify-center">
          <div
            ref={bigImageRef}
            className="rounded-lg overflow-hidden flex justify-center items-center"
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
          <div className="p-5 bottom-[17.5%] left-0 w-[55%] absolute leading-tight letter-spacing-[0.01rem]">
            <h1 className="text-[6rem] font-bold">PASSION + FASHION</h1>
            <p className="text-[1rem]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur molestias, rerum, voluptates distinctio fugiat culpa
              vel error ipsum animi possimus nobis tempore eum eligendi suscipit
              est neque alias ratione explicabo.
            </p>
          </div>
        </div>

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

      {/* === Mobile / Tablet View (<1024px) === */}
      <div className="flex lg:hidden flex-col items-start justify-start text-left px-6 py-8 min-h-[80vh] sm:min-h-screen relative">
        <h1 className="font-bold text-[clamp(2.5rem,8vw,4rem)] leading-none tracking-tight">
          PASSION + FASHION
        </h1>

        <p className="text-[clamp(0.9rem,1.2vw,1rem)] mt-6 max-w-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          molestias, rerum, voluptates distinctio fugiat culpa vel error ipsum
          animi possimus nobis tempore eum eligendi suscipit est neque alias
          ratione explicabo.
        </p>

        {/* Small images row */}
        <div className="mt-8 flex w-full justify-between gap-2 items-start">
          <div className="flex-1 max-w-[50%]">
            <Image
              src="/assets/model5.jpg"
              width={400}
              height={400}
              alt="Model 1"
              className="w-full h-auto rounded-md object-cover"
            />
          </div>
          <div className="flex-1 max-w-[50%]">
            <Image
              src="/assets/model3.jpg"
              width={400}
              height={400}
              alt="Model 2"
              className="w-full h-auto rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
