"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Area,
  AreaChart,
} from "recharts";
import { useState, useEffect } from "react";
import {
  TrendingUp,
  // Package,
  // ShoppingCart,
  DollarSign,
  // Users,
  // Eye,
  // BarChart3,
  // Calendar,
  // Filter,
  // Download,
  RefreshCw,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [timeRange, setTimeRange] = useState("This month");
  const [refreshing, setRefreshing] = useState(false);

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

  const [counts, setCounts] = useState({
    pending: 0,
    shipped: 0,
    delivered: 0,
    confirmed: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const resCounts = await fetch("/api/admin/counts");
        const countsData = await resCounts.json();
        setCounts(countsData);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      }
    };

    loadData();
  }, []);
  const [kpiData] = useState({
    totalSales: 1273000,
    unitsSold: 28,
    avgPricePerSqFt: 42,
    remainingUnits: 18,
    totalAmount: 1273000,
    avgPriceSold: 39,
  });

  // const [monthlySales] = useState([
  //   { month: "Jan", total: 850000 },
  //   { month: "Feb", total: 920000 },
  //   { month: "Mar", total: 1100000 },
  //   { month: "Apr", total: 980000 },
  //   { month: "May", total: 1273000 },
  //   { month: "Jun", total: 1150000 },
  // ]);

  const [dailyLeads] = useState([
    { day: "Mon", leads: 12 },
    { day: "Tue", leads: 8 },
    { day: "Wed", leads: 15 },
    { day: "Thu", leads: 22 },
    { day: "Fri", leads: 18 },
    { day: "Sat", leads: 25 },
    { day: "Sun", leads: 14 },
  ]);

  const [statusData] = useState([
    { name: "Available", value: 18, color: "#10B981" },
    { name: "Reserved", value: 21, color: "#F59E0B" },
    { name: "Offered", value: 11, color: "#6B7280" },
    { name: "Sold", value: 28, color: "#1F2937" },
  ]);

  // const [productSales] = useState([
  //   { product: "Villa Units", total: 650000 },
  //   { product: "Condo Units", total: 423000 },
  //   { product: "Townhouse", total: 200000 },
  // ]);

  const handleRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const COLORS = [
    "#10B981",
    "#F59E0B",
    "#6B7280",
    "#1F2937",
    "#3B82F6",
    "#8B5CF6",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">
            Welcome back, here's what's happening
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border hover:bg-slate-50 transition-colors"
          >
            <RefreshCw
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-white rounded-lg shadow-sm border focus:ring-2 focus:ring-blue-500"
          >
            <option>This month</option>
            <option>Last month</option>
            <option>This quarter</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[0.7rem] font-medium text-slate-600">
                TOTAL SALES
              </p>
              <p className="text-[1.2rem] font-bold text-slate-900">
                ₱{kpiData.totalSales.toLocaleString()}
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
            <span className="text-sm text-green-600">
              +12.5% from last month
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[0.7rem] font-medium text-slate-600">
                UNITS SOLD
              </p>
              <p className="text-[1.2rem] font-bold text-slate-900">
                {kpiData.unitsSold}
              </p>
            </div>
            {/* <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="h-6 w-6 text-blue-600" />
            </div> */}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[0.7rem] font-medium text-slate-600">
                DAILY PRICE AVG.
              </p>
              <p className="text-[1.2rem] font-bold text-slate-900">
                ₱{kpiData.avgPricePerSqFt}
              </p>
            </div>
            {/* <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div> */}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[0.7rem] font-medium text-slate-600">STOCKS</p>
              <p className="text-[1.2rem] font-bold text-slate-900">
                {kpiData.remainingUnits}
              </p>
            </div>
            {/* <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-orange-600" />
            </div> */}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[0.8rem] font-medium text-slate-600">
                TOTAL AMOUNT
              </p>
              <p className="text-[1.2rem] font-bold text-slate-900">
                ₱{kpiData.totalAmount.toLocaleString()}
              </p>
            </div>
            {/* <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-red-600" />
            </div> */}
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">
          Units per Status
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statusData.map((status, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-2">
                {status.value}
              </div>
              <div className="text-sm font-medium text-slate-600 mb-3">
                {status.name.toUpperCase()} UNITS
              </div>
              <div
                className="h-2 rounded-full mx-auto"
                style={{
                  backgroundColor: status.color,
                  width: `${(status.value / 78) * 100}%`,
                  minWidth: "40px",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Monthly Sales Trend */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Sales Trend
            </h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                6M
              </button>
              <button className="px-3 py-1 text-xs bg-slate-100 text-slate-600 rounded-full">
                1Y
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlySales}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip
                formatter={(value) => [
                  `CA$${Number(value).toLocaleString()}`,
                  "Sales",
                ]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E2E8F0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#3B82F6"
                fillOpacity={1}
                fill="url(#colorSales)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Product */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">
            Sales by Product
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={productSales}
                dataKey="total"
                nameKey="product"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
              >
                {productSales.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [
                  `₱${Number(value).toLocaleString()}`,
                  "Sales",
                ]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E2E8F0",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {productSales.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-slate-600">{item.product}</span>
                </div>
                <span className="text-sm font-medium">
                  ₱{item.total.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Leads */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Daily Leads
            </h3>
            <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
              68 leads
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={dailyLeads}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip
                formatter={(value) => [`${value} leads`, "Leads"]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E2E8F0",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="leads" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Summary */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">
            Order Status
          </h3>
          <div className="space-y-4">
            {[
              {
                label: "Pending Orders",
                value: counts.pending,
                color: "bg-yellow-100 text-yellow-800",
                icon: "🕒",
              },
              {
                label: "Shipped Orders",
                value: counts.shipped,
                color: "bg-blue-100 text-blue-800",
                icon: "🚚",
              },
              {
                label: "Delivered Orders",
                value: counts.delivered,
                color: "bg-green-100 text-green-800",
                icon: "✅",
              },
              {
                label: "Confirmed Orders",
                value: counts.confirmed,
                color: "bg-purple-100 text-purple-800",
                icon: "📋",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium text-slate-700">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-slate-900">
                    {item.value}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${item.color}`}
                  >
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
