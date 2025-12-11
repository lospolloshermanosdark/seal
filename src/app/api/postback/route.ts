// src/app/api/postback/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const externalRef = body?.data?.externalRef;
    const status = body?.data?.status;

    if (!externalRef) {
      return NextResponse.json(
        { error: "Missing externalRef" },
        { status: 400 }
      );
    }

    // 1. Buscar pedido
    const { data: order } = await supabaseAdmin
      .from("orders")
      .select("*, customers(*)")
      .eq("external_ref", externalRef)
      .single();

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // 2. Evitar duplicação — mas NÃO bloquear e-mail
    const jaPago = order.payment_status === "paid";

    // 3. Só processa pagamento quando o status for paid mesmo
    if (status === "paid") {
      // Se ainda não estava pago, atualiza no banco
      if (!jaPago) {
        await supabaseAdmin
          .from("orders")
          .update({ payment_status: "paid" })
          .eq("external_ref", externalRef);
      } else {
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[WEBHOOK] Erro fatal:", err);
    return NextResponse.json({ error: true }, { status: 500 });
  }
}
