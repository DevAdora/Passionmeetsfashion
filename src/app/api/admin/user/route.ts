import { NextResponse } from "next/server";
import { fetchUsers } from "@/lib/admin/fetch";

export const runtime = "nodejs";

export async function GET() {
  const orders = await fetchUsers();
  return NextResponse.json(orders);
}
