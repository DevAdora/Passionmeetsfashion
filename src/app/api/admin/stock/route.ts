import { NextResponse } from "next/server";
import { fetchStockNumbers } from "@/lib/admin/fetch";

export const runtime = "nodejs";

export async function GET() {
  const stock = await fetchStockNumbers();
  return NextResponse.json(stock);
}
