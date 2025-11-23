import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const customer_id = searchParams.get("customer_id");

  if (!customer_id) {
    return NextResponse.json({ error: "Missing customer_id" }, { status: 400 });
  }

  const { data: orders } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("customer_id", customer_id)
    .order("id", { ascending: false });

  return NextResponse.json({ orders });
}
