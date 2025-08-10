import Header from "@/components/user/Header";
import Hero from "@/components/user/Hero";
import NewArrivals from "@/components/user/NewArrivals";
export default function UserDashboardPage() {
  return (
    <main className="min-h-screen w-full bg-gray-50">
      <Header />
      {/* Padding to avoid header overlap */}
      <Hero />
      <NewArrivals />
    </main>
  );
}
