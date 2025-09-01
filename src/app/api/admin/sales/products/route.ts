import { NextResponse } from "next/server";
import { fetchProductSales } from "@/lib/admin/fetch";

export const runtime = "nodejs";

export async function GET() {
  const sales = await fetchProductSales();
  return NextResponse.json(sales);
}
