"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const data = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 7000 },
];

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState({
    pending: 0,
    shipped: 0,
    confirmed: 0,
  });
  useEffect(() => {
    async function fetchOrderCounts() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // statuses to track
      const statuses = ["pending", "shipped", "confirmed"];

      const results = await Promise.all(
        statuses.map(async (status) => {
          const { count, error } = await supabase
            .from("orders")
            .select("*", { count: "exact", head: true })
            .eq("status", status);

          if (error) {
            console.error(`Error fetching ${status} count:`, error);
            return [status, 0];
          }
          return [status, count || 0];
        })
      );

      // Convert array into object { pending: n, shipping: n, confirmed: n }
      const countsObj = Object.fromEntries(results);
      setCounts(countsObj as typeof counts);
    }

    fetchOrderCounts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        <div className="bg-gray-450 p-6 rounded-xl shadow-md text-black">
          <h1 className="font-bold text-[2rem]">Pending Orders</h1>
          <h1 className="text-[2rem] font-bold">{counts.pending}</h1>
        </div>
        <div className="bg-gray-450 p-6 rounded-xl shadow-md text-black">
          <h1 className="font-bold text-[2rem]">Shipped</h1>
          <h1 className="text-[2rem] font-bold">{counts.shipped}</h1>
        </div>
        <div className="bg-gray-450 p-6 rounded-xl shadow-md text-black">
          <h1 className="font-bold text-[2rem]">Confirmed Orders</h1>
          <h1 className="text-[2rem] font-bold">{counts.confirmed}</h1>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md my-6">
        <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="bg-gray-450 p-6 rounded-xl shadow-md text-black">
          <h1 className="font-bold text-[2rem]">Stock numbers</h1>
          <div className="justify-between flex items-center mt-4">
            <h1 className="font-semibold text-[1rem]">White Tee</h1>
            <h1 className="font-semibold text-[1rem]">20</h1>
          </div>
          <div className="justify-between flex items-center mt-4">
            <h1 className="font-semibold text-[1rem]">Classic Hoodie</h1>
            <h1 className="font-semibold text-[1rem]">11</h1>
          </div>
          <div className="justify-between flex items-center mt-4">
            <h1 className="font-semibold text-[1rem]">Black Tee</h1>
            <h1 className="font-semibold text-[1rem]">31</h1>
          </div>
        </div>
        <div className="bg-gray-450 p-6 rounded-xl shadow-md text-black">
          <h1 className="font-bold text-[2rem]">Order Categories</h1>
          <div className="justify-between flex items-center mt-4">
            <h1 className="font-semibold text-[1rem]">White Tee</h1>
            <h1 className="font-semibold text-[1rem]">20</h1>
          </div>
          <div className="justify-between flex items-center mt-4">
            <h1 className="font-semibold text-[1rem]">Classic Hoodie</h1>
            <h1 className="font-semibold text-[1rem]">11</h1>
          </div>
          <div className="justify-between flex items-center mt-4">
            <h1 className="font-semibold text-[1rem]">Black Tee</h1>
            <h1 className="font-semibold text-[1rem]">31</h1>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
