"use client";

import React from "react";

export default function NewArrivals() {
  return (
    <section className="relative w-full h-screen bg-[#0a0a09] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1
          className="font-extrabold uppercase text-[#F9E9C8] leading-none 
          text-[8rem] md:text[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[15rem]"
        >
          SUM
          <br />
          MER
          <br />
          SALE
        </h1>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-40">
        <h1
          className="font-extrabold uppercase text-transparent leading-none 
          text-[8rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[15rem]"
          style={{
            WebkitTextStroke: "2px #FFFFFF",
          }}
        >
          SUM
          <br />
          MER
          <br />
          SALE
        </h1>
      </div>

      <div className="absolute top-[20%] left-[7.5%] sm:top-[20%] sm:left-[20%] rotate-[-10deg] z-30">
        <div className="relative">
          <img
            src="/assets/model4.jpg"
            alt="Model Left"
            className="object-cover rounded-lg 
              w-[150px] h-[180px] lg:w-[200px] lg-h-[250px] xl:w-[250px] xl:h-[300px]  2xl:w-[350px] 2xl:h-[400px]"
          />
          <div
            className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white rounded-full 
            w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 flex items-center justify-center shadow-lg"
          >
            <span className="text-red-500 text-sm sm:text-base lg:text-lg">
              ♥
            </span>
          </div>
        </div>
      </div>

      <div className="absolute top-[40%] xl:top-[40%] 2xl:top-[50%] right-[7.5%] sm:top-[50%] sm:right-[20%] rotate-[8deg] z-30">
        <div className="relative">
          <img
            src="/assets/model2.png"
            alt="Model Right"
            className="object-cover rounded-lg 
              w-[150px] h-[180px] lg:w-[200px] lg-h-[250px] xl:w-[250px] xl:h-[300px]  2xl:w-[350px] 2xl:h-[400px]"
          />
          <div
            className="absolute -top-3 right-2 sm:-top-4 sm:right-4 bg-[#FF5733] text-white 
            text-[0.6rem] sm:text-xs lg:text-sm font-bold px-2 sm:px-3 lg:px-4 
            py-1 sm:py-2 rounded-full shadow-lg rotate-[10deg] border border-white"
          >
            NEW!
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-20">
        <div
          className="absolute top-[20%] left-[7.5%] sm:top-[20%] sm:left-[20%] rotate-[-10deg] 
                    w-[150px] h-[180px] lg:w-[200px] lg-h-[250px] xl:w-[250px] xl:h-[300px]  2xl:w-[350px] 2xl:h-[400px] rounded-lg"
          style={{
            mixBlendMode: "multiply",
            background:
              "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 70%)",
          }}
        />
        <div
          className="absolute top-[40%] xl:top-[40%] 2xl:top-[50%] right-[7.5%] sm:top-[50%] sm:right-[20%] rotate-[8deg] 
                       w-[150px] h-[180px] lg:w-[200px] lg-h-[250px] xl:w-[250px] xl:h-[300px]  2xl:w-[350px] 2xl:h-[400px] rounded-lg"
          style={{
            mixBlendMode: "multiply",
            background:
              "linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.1) 70%)",
          }}
        />
      </div>

      <div className="absolute top-[20%] right-[15%] sm:top-[20%] sm:right-[25%] z-40">
        <button
          className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold 
          px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 
          rounded-full shadow-xl hover transform hover:scale-105 transition-all duration-300 
          border border-white sm:border-2"
        >
          <span className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base lg:text-lg">
            <span>🔥</span>
            FRESH LOOK 2025
          </span>
        </button>
      </div>

      <div className="absolute bottom-[8%] left-[10%] sm:bottom-[10%] sm:left-[10%] lg:bottom-[5%] lg:left-[5%] z-40 max-w-[80%] sm:max-w-xs ">
        <p
          className="text-white text-xs sm:text-sm lg:text-base leading-relaxed 
          bg-black/30 p-2 sm:p-4 rounded-lg backdrop-blur-sm border border-white/20"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
          veniam error nisi facere sequi nemo nostrum, nam labore commodi libero
          eum placeat possimus! Ea, quasi nostrum. Veniam nemo possimus cum.
        </p>
      </div>

      {/* <div className="absolute top-[12%] left-[45%] z-20 text-white text-2xl sm:text-4xl lg:text-6xl animate-pulse">
        ✦
      </div>
      <div className="absolute bottom-[30%] left-[10%] z-20 text-white text-xl sm:text-3xl lg:text-4xl animate-bounce">
        ★
      </div> */}
    </section>
  );
}
