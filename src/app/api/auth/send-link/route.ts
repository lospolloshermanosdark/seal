import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { mailer } from "@/lib/mailer";
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

    // 3 — Enviar e-mail com link mágico
    await mailer.sendMail({
      from: `"Eventim Ingressos" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: "Seu acesso seguro — Eventim Ingressos",
      html: `
        <h2>Seu acesso está pronto</h2>
        <p>Clique no botão abaixo para entrar com segurança:</p>
        <p><a href="${link}" style="padding:12px 22px;background:#0b1e61;color:#fff;border-radius:8px;text-decoration:none;">Entrar agora</a></p>
        <p>Este link expira em 15 minutos.</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[AUTH ERROR]:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
