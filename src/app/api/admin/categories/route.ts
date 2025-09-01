import { NextResponse } from "next/server";
import { fetchOrderCategories } from "@/lib/admin/fetch";

export const runtime = "nodejs";

export async function GET() {
  const categories = await fetchOrderCategories();
  return NextResponse.json(categories);
}
