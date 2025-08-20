"use client";

import Header from "@/components/user/Header";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Pencil } from "lucide-react";

export default function UserProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: profileData, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) console.error(error);
    else setProfile({ ...profileData, email: user.email });

    setLoading(false);
  }

  async function updateProfile(field: string, value: string) {
    if (!profile) return;

    if (field === "password") {
      // 🔑 Password update via Supabase Auth
      const { error } = await supabase.auth.updateUser({
        password: value,
      });
      if (error) console.error("Error updating password:", error);
      else alert("Password updated!");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({ [field]: value })
      .eq("id", profile.id);

    if (error) {
      console.error("Error updating profile:", error);
    } else {
      setProfile({ ...profile, [field]: value });
      setEditingField(null);
    }
  }

  if (loading) return <p>Loading profile...</p>;
  if (!profile) return <p>No profile found.</p>;

  return (
    <section className="container mx-auto p-6 min-h-screen w-full">
        <Header />
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>

      <div className="space-y-4">
        {[
          { label: "Username", field: "username" },
          { label: "Street", field: "street" },
          { label: "City", field: "city" },
          { label: "Province", field: "province" },
          { label: "Postal Code", field: "postal" },
          { label: "Phone Number", field: "phone" },
          { label: "Email (read-only)", field: "email", readonly: true },
        ].map(({ label, field, readonly }) => (
          <div key={field} className="flex items-center gap-2">
            <input
              type="text"
              value={profile[field] || ""}
              readOnly={editingField !== field || readonly}
              onChange={(e) =>
                setProfile({ ...profile, [field]: e.target.value })
              }
              className={`flex-1 border px-3 py-2 rounded-md ${
                editingField === field && !readonly
                  ? "border-blue-500"
                  : "border-gray-300 bg-gray-100"
              }`}
            />
            {!readonly && (
              <button
                onClick={() =>
                  editingField === field
                    ? updateProfile(field, profile[field])
                    : setEditingField(field)
                }
                className="p-2 text-gray-600 hover:text-black"
              >
                <Pencil className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}

        {/* 🔑 Password change */}
        <div className="flex items-center gap-2">
          <input
            type="password"
            placeholder="New Password"
            readOnly={editingField !== "password"}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
            className={`flex-1 border px-3 py-2 rounded-md ${
              editingField === "password"
                ? "border-blue-500"
                : "border-gray-300 bg-gray-100"
            }`}
          />
          <button
            onClick={() =>
              editingField === "password"
                ? updateProfile("password", profile.password)
                : setEditingField("password")
            }
            className="p-2 text-gray-600 hover:text-black"
          >
            <Pencil className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
