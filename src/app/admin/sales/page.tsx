"use client";

import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function SalesPage() {
  const [monthlySales, setMonthlySales] = useState<
    { month: string; total: number }[]
  >([]);
  const [productSales, setProductSales] = useState<
    { product: string; total: number }[]
  >([]);

  useEffect(() => {
    const loadSales = async () => {
      try {
        const monthly = await fetch("/api/admin/sales/monthly");
        const monthlyData = await monthly.json();
        setMonthlySales(monthlyData);

        const products = await fetch("/api/admin/sales/products");
        const productsData = await products.json();
        setProductSales(productsData);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      }
    };

    loadSales();
  }, []);

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f50",
    "#00c49f",
    "#d0ed57",
  ];

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Sales Dashboard</h1>

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Sales by Product</h2>
        <PieChart>
          <Pie
            data={productSales}
            dataKey="total"
            nameKey="product"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {productSales.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </section>
  );
}
