import { supabase } from "@/lib/supabase";

export default async function fetchUserProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("username, phone, street, city, postal")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }

  return {
    fullName: profile.username || "",
    phone: profile.phone || "",
    street: profile.street || "",
    city: profile.city || "",
    postal: profile.postal || "",
  };
}
