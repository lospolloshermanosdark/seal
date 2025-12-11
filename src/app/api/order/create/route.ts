// src/app/api/order/create/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      externalRef,
      amount,
      title,
      customer_name,
      customer_email,
      customer_phone,
      customer_cpf,
      pix_qrcode,
    } = body;

    if (!customer_cpf) {
      return NextResponse.json({ error: "CPF obrigatório" }, { status: 400 });
    }

    const { data: existingOrder } = await supabaseAdmin
      .from("orders")
      .select("id, customer_id")
      .eq("external_ref", externalRef)
      .maybeSingle();

    let orderId = existingOrder?.id;
    let customerId = existingOrder?.customer_id;

    if (existingOrder) {
    } else {
      // ============================================================
      // VERIFICAR / CRIAR CLIENTE
      // ============================================================

      const { data: existingCustomer } = await supabaseAdmin
        .from("customers")
        .select("*")
        .eq("cpf", customer_cpf)
        .maybeSingle();

      customerId = existingCustomer?.id;

      if (!customerId) {
        const { data: newCustomer, error: customerError } = await supabaseAdmin
          .from("customers")
          .insert({
            name: customer_name,
            email: customer_email,
            phone: customer_phone,
            cpf: customer_cpf,
          })
          .select()
          .single();

        if (customerError) {
          console.error("[ERRO AO CRIAR CLIENTE]", customerError);
          return NextResponse.json(
            { error: "Erro ao criar cliente", details: customerError },
            { status: 500 }
          );
        }

        customerId = newCustomer.id;
      }

      const { data: order, error: orderError } = await supabaseAdmin
        .from("orders")
        .insert({
          external_ref: externalRef,
          amount,
          title,
          customer_id: customerId,
          payment_status: "pending",
          pix_qrcode,
          customer_name,
          customer_phone,
          customer_cpf,
        })
        .select()
        .single();
    }

    return NextResponse.json({ ok: true, order_id: orderId });
  } catch (err: any) {
    console.error("[FATAL ERROR]", err);
    return NextResponse.json(
      { error: "Erro inesperado", msg: err.message },
      { status: 500 }
    );
  }
}
