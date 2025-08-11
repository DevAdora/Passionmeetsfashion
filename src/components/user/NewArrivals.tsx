export default function NewArrivals() {
  return (
    <section className="relative w-full h-[100vh] flex">
      {/* Left Panel */}
      <div
        className="flex-1 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/Passion meets Fashion (1).png')", // Replace with your image
        }}
      ></div>

      {/* Right Panel */}
      <div
        className="flex-1 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/Passion meets Fashion (2).png')", // Replace with your image
        }}
      ></div>

      {/* Overlay Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-white text-[8rem] md:text-[14rem] font-bold uppercase text-center">
          New Arrivals
        </h2>
      </div>
    </section>
  );
}
