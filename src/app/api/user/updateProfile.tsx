// app/api/user/updateProfile.ts
import { supabase } from "@/lib/supabase";

export default async function updateProfile(
  userId: string,
  field: string,
  value: string
) {
  if (field === "password") {
    const { error } = await supabase.auth.updateUser({ password: value });
    if (error) throw error;
    return;
  }

  const { error } = await supabase
    .from("profiles")
    .update({ [field]: value })
    .eq("id", userId);

  if (error) throw error;
}
