import Header from "@/components/user/Header";
import Hero from "@/components/user/Hero";
import NewArrivals from "@/components/user/NewArrivals";
import ProductGrid from "@/app/user/dashboard/ProductGrid";
import CategoriesSection from "@/components/user/Categories";
import Footer from "@/components/user/Footer";


import { supabase } from "@/lib/supabase";

async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user?.id; 
}


export default function UserDashboardPage() {
  return (
    <main className="min-h-screen w-full bg-gray-50">
      <Header />
      {/* Padding to avoid header overlap */}
      <Hero />
      <NewArrivals />
      <ProductGrid />
      <CategoriesSection />
      <Footer />
    </main>
  );
}
