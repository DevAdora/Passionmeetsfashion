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

  const EditButton = ({ field }: { field: keyof Profile }) => (
    <button
      onClick={() =>
        editingField === field ? handleSave(field) : setEditingField(field)
      }
      className="ml-auto text-black cursor-pointer text-sm font-medium"
    >
      Edit
    </button>
  );

  return (
    <section className="min-h-screen bg-gray-50 w-[80%]">
      <Header />
      <div className="px-4 py-6 w-full">
        <h1 className="text-2xl font-semibold mb-8 text-gray-800">
          My Profile
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <img
                src="/api/placeholder/80/80"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (
                    e.target as HTMLImageElement
                  ).nextElementSibling!.classList.remove("hidden");
                }}
              />
              <div className="hidden text-xl sm:text-2xl font-bold text-black">
                {profile.fullName?.[0]?.toUpperCase() || "U"}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">
                {profile.fullName || "User Name"}
              </h2>
              <p className="text-gray-600 text-sm">Admin</p>
              <p className="text-gray-500 text-sm">
                {profile.city ? `${profile.city}` : "Location"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Personal Information
            </h3>
            <EditButton field="fullName" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                First Name
              </label>
              {editingField === "firstName" ? (
                <input
                  type="text"
                  value={profile.fullName || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, fullName: e.target.value })
                  }
                  className="w-full border border-blue-500 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onBlur={() => handleSave("fullName")}
                  autoFocus
                />
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-gray-900 text-sm">
                    {profile.fullName || "Natasha"}
                  </p>
                  <button
                    onClick={() => setEditingField("firstName")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Last Name
              </label>
              {editingField === "lastName" ? (
                <input
                  type="text"
                  value={profile.fullName || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, fullName: e.target.value })
                  }
                  className="w-full border border-blue-500 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onBlur={() => handleSave("fullName")}
                  autoFocus
                />
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-gray-900 text-sm">
                    {profile.fullName || "Khalehra"}
                  </p>
                  <button
                    onClick={() => setEditingField("lastName")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Date of Birth
              </label>
              {editingField === "dateOfBirth" ? (
                <input
                  type="date"
                  value={profile.dateOfBirth || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, dateOfBirth: e.target.value })
                  }
                  className="w-full border border-blue-500 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onBlur={() => handleSave("dateOfBirth")}
                  autoFocus
                />
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-gray-900 text-sm">
                    {profile.dateOfBirth || "12-10-1990"}
                  </p>
                  <button
                    onClick={() => setEditingField("dateOfBirth")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div> */}

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email Address
              </label>
              {editingField === "email" ? (
                <input
                  type="email"
                  value={profile.email || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className="w-full border border-blue-500 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onBlur={() => handleSave("email")}
                  autoFocus
                />
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-gray-900 text-sm">
                    {profile.email || "info@binary-fusion.com"}
                  </p>
                  <button
                    onClick={() => setEditingField("email")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Phone Number
              </label>
              {editingField === "phone" ? (
                <input
                  type="tel"
                  value={profile.phone || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  className="w-full border border-blue-500 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onBlur={() => handleSave("phone")}
                  autoFocus
                />
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-gray-900 text-sm">
                    {profile.phone || "(+62) 921 5654-5846"}
                  </p>
                  <button
                    onClick={() => setEditingField("phone")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* User Role */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                User Role
              </label>
              {editingField === "role" ? (
                <select
                  value={profile.role || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, role: e.target.value })
                  }
                  className="w-full border border-blue-500 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onBlur={() => handleSave("role")}
                  autoFocus
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Manager">Manager</option>
                </select>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-gray-900 text-sm">
                    {profile.role || "Admin"}
                  </p>
                  <button
                    onClick={() => setEditingField("role")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Address</h3>
            <EditButton field="street" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Street Address
              </label>
              {editingField === "street" ? (
                <input
                  type="text"
                  value={profile.street || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, street: e.target.value })
                  }
                  className="w-full border border-blue-500 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onBlur={() => handleSave("street")}
                  autoFocus
                />
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-gray-900 text-sm">
                    {profile.street || "Enter street address"}
                  </p>
                  <button
                    onClick={() => setEditingField("street")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                City
              </label>
              {editingField === "city" ? (
                <input
                  type="text"
                  value={profile.city || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, city: e.target.value })
                  }
                  className="w-full border border-blue-500 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onBlur={() => handleSave("city")}
                  autoFocus
                />
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-gray-900 text-sm">
                    {profile.city || "Leeds, East London"}
                  </p>
                  <button
                    onClick={() => setEditingField("city")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Postal Code */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Postal Code
              </label>
              {editingField === "postal" ? (
                <input
                  type="text"
                  value={profile.postal || ""}
                  onChange={(e) =>
                    setProfile({ ...profile, postal: e.target.value })
                  }
                  className="w-full border border-blue-500 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onBlur={() => handleSave("postal")}
                  autoFocus
                />
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-gray-900 text-sm">
                    {profile.postal || "E5H 0Z54"}
                  </p>
                  <button
                    onClick={() => setEditingField("postal")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
