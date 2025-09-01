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

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState({
    pending: 0,
    shipped: 0,
    confirmed: 0,
  });
  const [stockData, setStockData] = useState<
    { name: string; totalStock: number }[]
  >([]);
  const [orderCategories, setOrderCategories] = useState<
    { product_name: string; count: number }[]
  >([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const resCounts = await fetch("/api/admin/counts");
        const countsData = await resCounts.json();
        setCounts(countsData);

        const resStock = await fetch("/api/admin/stock");
        const stockData = await resStock.json();
        setStockData(stockData);

        const resCategories = await fetch("/api/admin/categories");
        const categoriesData = await resCategories.json();
        setOrderCategories(categoriesData);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-450 p-6 rounded-xl shadow-md text-black">
          <h1 className="font-bold text-[2rem]">Pending Orders</h1>
          <h1 className="text-[2rem] font-bold">{counts.pending}</h1>
        </div>
        <div className="bg-gray-450 p-6 rounded-xl shadow-md text-black">
          <h1 className="font-bold text-[2rem]">Shipped</h1>
          <h1 className="text-[2rem] font-bold">{counts.shipped}</h1>
        </div>
        <div className="bg-gray-450 p-6 rounded-xl shadow-md text-black">
          <h1 className="font-bold text-[2rem]">Confirmed</h1>
          <h1 className="text-[2rem] font-bold">{counts.confirmed}</h1>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-md my-6">
        <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={[
              { name: "Jan", sales: 4000 },
              { name: "Feb", sales: 3000 },
              { name: "Mar", sales: 5000 },
              { name: "Apr", sales: 4500 },
              { name: "May", sales: 6000 },
              { name: "Jun", sales: 7000 },
            ]}
          >
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

      <div className="bg-gray-450 p-6 rounded-xl shadow-md text-black mt-6">
        <h1 className="font-bold text-[2rem]">Stock Numbers</h1>
        {stockData.map((prod) => (
          <div key={prod.name} className="flex justify-between mt-2">
            <span>{prod.name}</span>
            <span>{prod.totalStock}</span>
          </div>
        ))}
      </div>

      <div className="bg-gray-450 p-6 rounded-xl shadow-md text-black mt-6">
        <h1 className="font-bold text-[2rem]">Order Categories</h1>
        {orderCategories.map((cat) => (
          <div key={cat.product_name} className="flex justify-between mt-2">
            <span>{cat.product_name}</span>
            <span>{cat.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
