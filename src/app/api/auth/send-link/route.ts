import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { cpf, email } = await req.json();

    if (!cpf || !email) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    // 1 — Buscar cliente
    const { data: customer } = await supabaseAdmin
      .from("customers")
      .select("*")
      .eq("cpf", cpf)
      .eq("email", email)
      .single();

    if (!customer) {
      return NextResponse.json(
        { error: "Cliente não encontrado" },
        { status: 404 }
      );
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 minutos

    // 2 — Salvar token
    await supabaseAdmin.from("access_tokens").insert({
      customer_id: customer.id,
      token,
      expires_at: expiresAt.toISOString(),
    });

    const link = `${process.env.NEXT_BASE_URL}/auth/access?token=${token}`;

 

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[AUTH ERROR]:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
