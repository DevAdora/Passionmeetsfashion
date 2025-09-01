import { NextResponse } from "next/server";
import { fetchOrders } from "@/lib/admin/fetch";

export const runtime = "nodejs";

export async function GET() {
  const orders = await fetchOrders();
  return NextResponse.json(orders);
}
