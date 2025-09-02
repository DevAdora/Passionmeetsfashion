"use client";

import React from "react";

export default function NewArrivals() {
  return (
    <section className="relative w-full h-screen bg-[#0a0a09] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 className="text-[15rem] font-extrabold leading-[12rem] text-[#F9E9C8] uppercase">
          SUM
          <br />
          MER
          <br />
          SALE
        </h1>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-40">
        <h1
          className="text-[15rem] font-extrabold leading-[12rem] text-transparent uppercase"
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

      <div className="absolute top-[20%] left-[20%] rotate-[-10deg] z-30 shadow-2xl">
        <div className="relative">
          <img
            src="/assets/model4.jpg"
            alt="Model Left"
            className="w-[350px] h-[400px] object-cover rounded-lg"
          />
          <div className="absolute top-3 left-3 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
            <span className="text-red-500 text-lg">♥</span>
          </div>
        </div>
      </div>

      <div className="absolute top-[25%] right-[20%] rotate-[8deg] z-30 shadow-2xl">
        <div className="relative">
          <img
            src="/assets/model2.png"
            alt="Model Right"
            className="w-[350px] h-[400px] object-cover rounded-lg"
          />
          <div className="absolute -top-4 right-4 bg-[#FF5733] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg rotate-[10deg] border-2 border-white">
            NEW!
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-35">
        <div
          className="absolute top-[20%] left-[20%] rotate-[-10deg] w-[350px] h-[400px] rounded-lg"
          style={{
            mixBlendMode: "multiply",
            background:
              "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 70%)",
          }}
        />
        <div
          className="absolute top-[25%] right-[20%] rotate-[8deg] w-[350px] h-[400px] rounded-lg"
          style={{
            mixBlendMode: "multiply",
            background:
              "linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.1) 70%)",
          }}
        />
      </div>

      <div className="absolute bottom-[20%] right-[25%] z-40">
        <button className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2 border-white">
          <span className="flex items-center gap-2">
            <span>🔥</span>
            FRESH LOOK 2025
          </span>
        </button>
      </div>

      <div className="absolute bottom-[10%] left-[10%] z-40 max-w-xs">
        <p className="text-white leading-relaxed text-sm bg-black/30 p-4 rounded-lg backdrop-blur-sm border border-white/20">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
          veniam error nisi facere sequi nemo nostrum, nam labore commodi libero
          eum placeat possimus! Ea, quasi nostrum. Veniam nemo possimus cum.
        </p>
      </div>

      <div className="absolute top-[15%] left-[50%] z-20 text-white text-6xl animate-pulse">
        ✦
      </div>
      <div className="absolute bottom-[30%] left-[15%] z-20 text-white text-4xl animate-bounce">
        ★
      </div>
    </section>
  );
}
