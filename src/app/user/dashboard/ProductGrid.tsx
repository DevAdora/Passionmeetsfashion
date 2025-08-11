import ProductCard from "@/components/user/Card";

export default function ProductGrid() {
  return (
    <div className="container mx-auto mt-8">
        <h2 className="text-[4rem] font-bold mb-6 text-left text-black uppercase">New Arrivals</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
        <ProductCard
          id="1"
          name="Classic Hoodie"
          image="/assets/hoodie.png"
          price={1299}
          description="A comfy and stylish hoodie perfect for everyday wear."
          colors={["#000000", "#ffffff", "#808080"]}
          sizes={["S", "M", "L", "XL"]}
        />
        <ProductCard
          id="2"
          name="White Tee"
          image="/assets/White.png"
          price={1899}
          description="A rugged denim jacket for all seasons."
          colors={["#1e3a8a", "#6b7280"]}
          sizes={["S", "M", "L"]}
        />
        <ProductCard
          id="3"
          name="Black Tee"
          image="/assets/Black.png"
          price={1899}
          description="A rugged denim jacket for all seasons."
          colors={["#1e3a8a", "#6b7280"]}
          sizes={["S", "M", "L"]}
        />
        <ProductCard
          id="4"
          name="Gray Tee"
          image="/assets/Gray.png"
          price={1899}
          description="A rugged denim jacket for all seasons."
          colors={["#1e3a8a", "#6b7280"]}
          sizes={["S", "M", "L"]}
        />
      </div>
    </div>
  );
}
