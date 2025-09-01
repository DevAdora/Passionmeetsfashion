import { NextResponse } from "next/server";
import { fetchMonthlySales } from "@/lib/admin/fetch";

export const runtime = "nodejs";

export async function GET() {
  const sales = await fetchMonthlySales();
  return NextResponse.json(sales);
}
