"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Profile } from "@/types/user";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);

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

      {/* Large screen: Table */}
      <div className="hidden lg:block w-full overflow-x-auto scrollbar-hide">
        <table className="min-w-[700px] w-full divide-y divide-gray-800">
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
                <tr
                  key={user.id}
                  className="hover:bg-gray-200 cursor-pointer transition text-black"
                >
                  <td className="px-4 py-3 w-40 max-w-40 truncate">{user.fullName}</td>
                  <td className="px-4 py-3 w-32 max-w-32 truncate">{user.phone ?? "-"}</td>
                  <td className="px-4 py-3 w-64 max-w-64 truncate overflow-hidden">
                    {user.street && user.city && user.province
                      ? `${user.street}, ${user.city}, ${user.province}, ${user.postal ?? ""}`
                      : "-"}
                  </td>
                  <td className="px-4 py-3 w-24 max-w-24 truncate">{user.role}</td>
                  <td className="px-4 py-3 w-40 max-w-40 truncate text-black">
                    {format(new Date(user.created_at), "dd MMM yyyy, p")}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <Button variant="outline" size="sm" className="bg-gray-800 text-white cursor-pointer">
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

      <div className="flex flex-col gap-4 lg:hidden">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="p-4 rounded-xl border border-gray-300 bg-white text-black shadow cursor-pointer"
              onClick={() => setSelectedUser(user)}
            >
              <p className="font-semibold">{user.fullName}</p>
              <p className="text-sm text-gray-600">{user.role}</p>
            </div>
          ))
        )}
      </div>

      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-3 text-sm text-gray-700">
              <p><span className="font-medium">Name:</span> {selectedUser.fullName}</p>
              <p><span className="font-medium">Phone:</span> {selectedUser.phone ?? "-"}</p>
              <p><span className="font-medium">Address:</span>{" "}
                {selectedUser.street && selectedUser.city && selectedUser.province
                  ? `${selectedUser.street}, ${selectedUser.city}, ${selectedUser.province}, ${selectedUser.postal ?? ""}`
                  : "-"}
              </p>
              <p><span className="font-medium">Role:</span> {selectedUser.role}</p>
              <p><span className="font-medium">Joined:</span> {format(new Date(selectedUser.created_at), "dd MMM yyyy, p")}</p>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="bg-gray-800 text-white cursor-pointer">
                  Edit
                </Button>
                <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700 cursor-pointer">
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
