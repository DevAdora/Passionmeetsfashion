import { NextResponse } from "next/server";
import { fetchOrderCounts } from "@/lib/admin/fetch";

export const runtime = "nodejs";

export async function GET() {
  const counts = await fetchOrderCounts();
  return NextResponse.json(counts);
}
