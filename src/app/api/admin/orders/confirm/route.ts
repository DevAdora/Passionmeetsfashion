import { NextResponse } from "next/server";
import confirmOrder from "@/lib/admin/order";

export const runtime = "nodejs"; 

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();
    const success = await confirmOrder(orderId);
    return NextResponse.json({ success });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to confirm order" }, { status: 500 });
  }
}

