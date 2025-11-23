import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token inválido" }, { status: 400 });
  }

  const { data: tokenRow } = await supabaseAdmin
    .from("access_tokens")
    .select("*, customers(*)")
    .eq("token", token)
    .single();

  if (!tokenRow) {
    return NextResponse.json({ error: "Token não encontrado" }, { status: 404 });
  }

  if (new Date(tokenRow.expires_at) < new Date()) {
    return NextResponse.json({ error: "Token expirado" }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    customer: tokenRow.customers,
  });
}
