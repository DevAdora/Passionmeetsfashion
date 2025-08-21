export default function Hero() {
  return (
    <section
      className="relative h-[100vh] w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/assets/passion-meets-fashion.png')", // Replace with your image path
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Text */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Passion + Fashion
        </h1>
        <p className="text-lg md:text-2xl max-w-xl mx-auto">
          Elevate your style with our curated collection.
        </p>
      </div>
    </section>
  );
}
