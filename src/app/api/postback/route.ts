// src/app/api/postback/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { mailer } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("[WEBHOOK PIX RECEBIDO]", body);

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
      console.error("[WEBHOOK] Pedido não encontrado:", externalRef);
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

        console.log("[WEBHOOK] Pedido marcado como PAGO:", externalRef);
      } else {
        console.log("[WEBHOOK] Pedido já estava pago no banco.");
      }

      // 4. Enviar e-mail (sempre que chegar um paid, mesmo se duplicado)
      if (order.customers?.email) {
        try {
          const r = await mailer.sendMail({
            from: `"Eventim Ingressos" <${process.env.SMTP_FROM}>`,
            to: order.customers.email,
            subject: `Pagamento Confirmado — Pedido ${externalRef}`,
            html: htmlTemplate({
              customerName: order.customers.name,
              orderNumber: externalRef,
              productName: order.title,
              totalAmount: (order.amount / 100).toFixed(2).replace(".", ","),
              linkPedidos: `${process.env.NEXT_BASE_URL}/meus-pedidos`,
            }),
          });

          console.log("[EMAIL CLIENTE ENVIADO]", r.response);
        } catch (err) {
          console.error("[ERRO AO ENVIAR EMAIL]", err);
        }
      }
    }

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("[WEBHOOK] Erro fatal:", err);
    return NextResponse.json({ error: true }, { status: 500 });
  }
}


// 🔥 TEMPLATE ORIGINAL F1 — IDÊNTICO AO QUE VOCÊ ENVIOU
const htmlTemplate = ({
  customerName,
  orderNumber,
  productName,
  totalAmount,
  linkPedidos,
}: any) => `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:30px 0;">
  <tbody><tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#111;border-radius:10px 10px 0 0;">
        <tbody><tr>
          <td align="center" style="padding:25px 0;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/512px-F1.svg.png" width="130" alt="F1 Logo">
          </td>
        </tr>
      </tbody></table>

      <table width="600" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:0 0 10px 10px;padding:32px;color:white;">
        <tbody><tr>
          <td>

            <img src="https://media.formula1.com/image/upload/c_lfill,w_3392/q_auto/v1740000000/content/dam/fom-website/2018-redesign-assets/Racehub%20header%20images%2016x9/Brazil.webp" width="100%" style="border-radius:10px; margin-bottom:25px;" alt="F1 Race Banner">

            <h2 style="font-family:Arial;font-size:26px;font-weight:bold;color:#fff;margin:0 0 10px;">
              Pagamento Confirmado! 🏁
            </h2>

            <p style="font-family:Arial;font-size:15px;line-height:1.6;color:#ccc;margin-top:8px;">
              Parabéns, <strong>${customerName}</strong>!  
              Sua compra foi confirmada e você está oficialmente na pole position dessa experiência incrível.
            </p>

            <div style="margin-top:20px;background:#0f0f0f;border:1px solid #333;padding:16px;border-radius:8px;">
              <p style="font-family:Arial;font-size:15px;color:#bbb;margin:0;">
                <strong>Pedido:</strong> ${orderNumber}<br>
                <strong>Ingresso:</strong> ${productName}<br>
                <strong>Valor Pago:</strong> R$ ${totalAmount}
              </p>
            </div>

            <p style="font-family:Arial;font-size:15px;line-height:1.6;color:#ccc;margin-top:22px;">
              Acesse seus pedidos para acompanhar o status ou baixar seus ingressos.
            </p>

            <table cellpadding="0" cellspacing="0" style="margin:28px 0;">
              <tbody><tr>
                <td align="center">
                  <a href="${linkPedidos}" style="background:#e10600;color:white;padding:14px 28px;border-radius:8px;
                    font-family:Arial;font-size:16px;font-weight:bold;text-decoration:none;
                    display:inline-block;">
                    Acessar Meus Pedidos
                  </a>
                </td>
              </tr>
            </tbody></table>

            <p style="font-family:Arial;font-size:14px;color:#777;margin-top:12px;">
              Nos vemos na pista! 🏎️🔥  
            </p>

            <h3 style="font-family:Arial;font-size:22px;font-weight:bold;color:#e10600;margin:32px 0 18px;">
              Circuito de Interlagos 🇧🇷
            </h3>

            <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border-radius:10px;padding:0;overflow:hidden;">
              <tbody><tr>
                <td align="center">
                  <img src="https://media.formula1.com/image/upload/c_fit,w_1300,q_auto/v1740000000/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/Brazil_Circuit.webp" width="100%" style="display:block;border-radius:10px 10px 0 0;" alt="Circuito Interlagos">
                </td>
              </tr>

              <tr>
                <td style="padding:20px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tbody><tr>
                      <td style="color:#bbb;padding:8px 0;">Circuit Length</td>
                      <td style="color:#fff;font-weight:bold;" align="right">4.309 km</td>
                    </tr>
                    <tr>
                      <td style="color:#bbb;padding:8px 0;">First Grand Prix</td>
                      <td style="color:#fff;font-weight:bold;" align="right">1973</td>
                    </tr>
                    <tr>
                      <td style="color:#bbb;padding:8px 0;">Number of Laps</td>
                      <td style="color:#fff;font-weight:bold;" align="right">71</td>
                    </tr>
                    <tr>
                      <td style="color:#bbb;padding:8px 0;">Fastest Lap</td>
                      <td style="color:#fff;font-weight:bold;" align="right">
                        1:10.540<br>
                        <span style="color:#888;font-size:13px;">Valtteri Bottas (2018)</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="color:#bbb;padding:8px 0;">Race Distance</td>
                      <td style="color:#fff;font-weight:bold;" align="right">305.879 km</td>
                    </tr>
                  </tbody></table>
                </td>
              </tr>
            </tbody></table>

          </td>
        </tr>
      </tbody></table>

      <p style="font-family:Arial;color:#666;font-size:12px;margin-top:20px;width:600px;text-align:center;">
        Este e-mail contém informações importantes sobre sua compra.
      </p>

    </td>
  </tr>
</tbody></table>
`;
