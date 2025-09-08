"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Profile } from "@/types/user";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const res = await fetch("/api/admin/user");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  }

  return (
    <section className="p-6 text-gray-200 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-black">Accounts</h1>
        <Button variant="outline" className="bg-gray-950 text-white">
          + Add User
        </Button>
      </div>

      <div className="overflow-x-auto ">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-950 text-white text-sm font-semibold">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Address</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Joined</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-950">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-200 cursor-pointer transition text-black">
                  <td className="px-4 py-3">{user.fullName}</td>
                  <td className="px-4 py-3">{user.phone ?? "-"}</td>
                  <td className="px-4 py-3">
                    {user.street && user.city && user.province
                      ? `${user.street}, ${user.city}, ${user.province}, ${
                          user.postal ?? ""
                        }`
                      : "-"}
                  </td>
                  <td className="px-4 py-3">{user.role}</td>
                  <td className="px-4 py-3 text-black">
                    {format(new Date(user.created_at), "dd MMM yyyy, p")}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-800 text-white cursor-pointer"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 cursor-pointer"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
