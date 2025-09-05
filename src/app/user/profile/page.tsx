"use client";

import Header from "@/components/user/Header";
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import fetchProfile from "@/app/api/user/fetchProfile";
import updateProfile from "@/app/api/user/updateProfile";
import { Profile } from "@/types/user";

export default function UserProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchProfile();
      setProfile(data);
      setLoading(false);
    })();
  }, []);

  async function handleSave(field: keyof Profile) {
    if (!profile) return;
    try {
      await updateProfile(profile.id, field, profile[field] ?? "");
      setEditingField(null);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  }

  if (loading) return <p className="p-6">Loading profile...</p>;
  if (!profile) return <p className="p-6">No profile found.</p>;

  console.log(profile);
  return (
    <section className="container mx-auto p-6 min-h-screen  justify-center items-center flex flex-col w-full">
      <Header />
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="bg-white shadow rounded-xl p-6 space-y-6 w-[80%]">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
            {profile.fullName?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{profile.fullName}</h2>
            <p className="text-gray-500">{profile.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          {(
            [
              { label: "Street", field: "street" as const },
              { label: "City", field: "city" as const },
              { label: "Postal Code", field: "postal" as const },
              { label: "Phone Number", field: "phone" as const },
            ] as { label: string; field: keyof Profile }[]
          ).map(({ field }) => (
            <div key={field} className="flex items-center gap-3">
              <input
                type="text"
                placeholder={"Enter " + field}
                value={profile[field] || ""}
                readOnly={editingField !== field}
                onChange={(e) =>
                  setProfile({ ...profile, [field]: e.target.value })
                }
                className={`flex-1 border px-3 py-2 rounded-md ${
                  editingField === field
                    ? "border-blue-500"
                    : "border-gray-300 bg-gray-100"
                }`}
              />
              <button
                onClick={() =>
                  editingField === field
                    ? handleSave(field)
                    : setEditingField(field)
                }
                className="p-2 text-gray-600 hover:text-black"
              >
                <Pencil className="w-5 h-5" />
              </button>
            </div>
          ))}

          <div className="flex items-center gap-3">
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
                  ? handleSave("password")
                  : setEditingField("password")
              }
              className="p-2 text-gray-600 hover:text-black"
            >
              <Pencil className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
