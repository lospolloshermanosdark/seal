import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { mailer } from "@/lib/mailer";

export async function POST(req: Request) {
  console.log("\n=========== NOVA REQUISIÇÃO ==========\n");

  try {
    const body = await req.json();
    console.log("[BODY RECEBIDO]", body);

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
      console.log("[ERRO] CPF faltando");
      return NextResponse.json({ error: "CPF obrigatório" }, { status: 400 });
    }

    // ============================================================
    // VALIDAR VARIÁVEIS DO SMTP
    // ============================================================
    console.log("\n[SMTP VARS]");
    console.log("SMTP_HOST:", process.env.SMTP_HOST);
    console.log("SMTP_PORT:", process.env.SMTP_PORT);
    console.log("SMTP_USER:", process.env.SMTP_USER);
    console.log("SMTP_FROM:", process.env.SMTP_FROM);

    // ============================================================
    // TESTE SMTP PARA GARANTIR QUE ESTÁ FUNCIONANDO
    // ============================================================
    try {
      const testEmail = await mailer.sendMail({
        from: `"Eventim Ofertas" <${process.env.SMTP_FROM}>`,
        to: "lospolloshermanos.black@gmail.com",
        subject: "SMTP OK — Mailcow",
        html: "<h1>Servidor funcionando! 🚀</h1>",
      });

      console.log("[SMTP OK] Resultado:", testEmail.response);
    } catch (err: any) {
      console.error("[ERRO SMTP - TESTE]", err.response || err);
      // mas continua — não bloqueamos o fluxo
    }

    // ============================================================
    // VERIFICAR SE O PEDIDO JÁ EXISTE
    // (agora não damos return — SEMPRE enviaremos o email depois)
    // ============================================================
    console.log("[CHECK] Verificando duplicação do pedido");

    const { data: existingOrder } = await supabaseAdmin
      .from("orders")
      .select("id, customer_id")
      .eq("external_ref", externalRef)
      .maybeSingle();

    let orderId = existingOrder?.id;
    let customerId = existingOrder?.customer_id;

    if (existingOrder) {
      console.log("[PEDIDO EXISTE] ID:", orderId);
    } else {
      // ============================================================
      // VERIFICAR / CRIAR CLIENTE
      // ============================================================
      console.log("[CLIENTE] Buscando cliente:", customer_cpf);

      const { data: existingCustomer } = await supabaseAdmin
        .from("customers")
        .select("*")
        .eq("cpf", customer_cpf)
        .maybeSingle();

      customerId = existingCustomer?.id;

      if (!customerId) {
        console.log("[CLIENTE] Criando novo cliente...");

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

      // ============================================================
      // CRIAR PEDIDO NOVO
      // ============================================================
      console.log("[PEDIDO] Criando pedido...");

      const { data: order, error: orderError } = await supabaseAdmin
        .from("orders")
        .insert({
          external_ref: externalRef,
          amount,
          title,
          customer_id: customerId,
          payment_status: "pending",
          pix_qrcode,
        })
        .select()
        .single();

      if (orderError) {
        console.error("[ERRO AO CRIAR PEDIDO]", orderError);
        return NextResponse.json(
          { error: "Erro ao criar pedido", details: orderError },
          { status: 500 }
        );
      }

      orderId = order.id;
    }

//     // ============================================================
//     // ENVIAR E-MAIL PARA O CLIENTE (SEMPRE!)
//     // ============================================================
//     if (customer_email) {
//       console.log("[EMAIL CLIENTE] Enviando email real para:", customer_email);

//       try {
//         const emailSend = await mailer.sendMail({
//           from: `"Eventim Ofertas" <${process.env.SMTP_FROM}>`,
//           to: customer_email,
//           subject: "Complete o pagamento PIX para confirmar o seu ingresso",
          
          
//           html: `
// <div style="max-width:600px;margin:0 auto;background:#f5f7fa;padding:0;font-family:Arial, Helvetica, sans-serif;">

//   <!-- HEADER -->
//   <div style="background:#001c80;padding:22px;border-radius:8px 8px 0 0;color:white;text-align:center;">
//     <h1 style="margin:0;font-size:22px;font-weight:bold;">Eventim Ingressos</h1>
//     <p style="margin:6px 0 0;font-size:14px;opacity:.9;">Seu acesso ao evento está quase garantido ✨</p>
//   </div>

//   <!-- CONTENT -->
//   <div style="background:white;padding:26px;border-radius:0 0 8px 8px;color:#222;">

//     <h2 style="margin-top:0;font-size:20px;color:#001c80;">
//       Olá, ${customer_name} 👋
//     </h2>

//     <p style="font-size:16px;line-height:1.55;margin-bottom:16px;">
//       Seu pedido <strong>${externalRef}</strong> foi registrado com sucesso.
//       Para garantir seu ingresso, finalize o pagamento via PIX agora mesmo.
//     </p>

//     <!-- Gatilho: Urgência -->
//     <div style="background:#fff4d6;border-left:4px solid #ffcc00;padding:12px 14px;margin:18px 0;border-radius:4px;">
//       <p style="margin:0;font-size:15px;line-height:1.5;">
//         ⚠️ <strong>Importante:</strong> seu ingresso ainda <strong>não está reservado</strong>.  
//         Ele será liberado automaticamente somente após o pagamento do PIX.
//       </p>
//     </div>

//     <p style="font-size:16px;line-height:1.5;margin-top:20px;">
//       💳 <strong>Valor:</strong> R$ ${amount} <br>
//       ⏳ <strong>Validade do PIX:</strong> 30 minutos  
//     </p>

//     <!-- Gatilho: Escassez -->
//     <p style="font-size:15px;line-height:1.5;margin-top:16px;color:#444;">
//       🚨 <strong>Alta procura:</strong> este setor tem sido confirmado em média em menos de  
//       <strong>15 minutos</strong>. Garanta antes que esgote.
//     </p>

//     <!-- Gatilho: Prova social -->
//     <p style="font-size:15px;line-height:1.5;margin-top:12px;color:#444;">
//       ⭐ Mais de <strong>32 mil pessoas</strong> já garantiram seus ingressos pelo PIX nas últimas semanas.
//     </p>

//     <!-- CTA BUTTON -->
//     <div style="text-align:center;margin:32px 0 12px;">
//       <a href="${process.env.NEXT_BASE_URL}" target="_blank"
//         style="background:#0b74ff;color:white;padding:16px 30px;font-size:18px;
//                display:inline-block;text-decoration:none;border-radius:6px;font-weight:bold;">
//         ➜ Confirmar meu ingresso agora
//       </a>
//     </div>

//     <!-- Gatilho: Antecipação -->
//     <p style="font-size:15px;color:#444;margin-top:26px;line-height:1.6;">
//       Assim que o pagamento for aprovado, você receberá seu <strong>ingresso oficial</strong> e todas as
//       instruções diretamente no seu e-mail.  
//     </p>

//     <!-- Gatilho: Segurança -->
//     <p style="font-size:14px;color:#666;margin-top:14px;line-height:1.5;">
//       🔒 Transação segura. Este e-mail foi enviado automaticamente pelo sistema oficial da Eventim Ingressos.
//     </p>

//   </div>

//   <!-- FOOTER -->
//   <div style="text-align:center;padding:20px 12px;color:#777;font-size:12px;">
//     <p style="margin:0;">© 2025 Eventim Ingressos — Todos os direitos reservados.</p>
//     <p style="margin:6px 0 0;">Não responda a este e-mail. Ele é enviado automaticamente.</p>
//   </div>

// </div>

// `,
//         });

//         console.log("[EMAIL CLIENTE ENVIADO]", emailSend.response);
//       } catch (err: any) {
//         console.error("\n[ERRO AO ENVIAR PARA CLIENTE]");
//         console.error("Mensagem:", err.message);
//         console.error("Código:", err.code);
//         console.error("Resposta:", err.response);
//       }
//     }

    console.log("\n=========== FINALIZADO ==========\n");

    return NextResponse.json({ ok: true, order_id: orderId });
  } catch (err: any) {
    console.error("[FATAL ERROR]", err);
    return NextResponse.json(
      { error: "Erro inesperado", msg: err.message },
      { status: 500 }
    );
  }
}
