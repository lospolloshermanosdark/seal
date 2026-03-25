// src/app/api/postback/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const payload = await req.json();


    /**
     * Estrutura esperada (exemplo PagLoop):
     * {
     *   id: "tx_123",
     *   status: "paid",
     *   amount: 3000,
     *   paidAmount: 3000,
     *   externalRef: "PED-123456"
     * }
     */

    const {
      id,
      status,
      amount,
      paidAmount,
      externalRef,
    } = payload || {};

    // ==========================
    // ✅ VALIDAÇÕES OBRIGATÓRIAS
    // ==========================
    if (!id || !status || !externalRef) {
      console.error("❌ Postback inválido:", payload);

      return NextResponse.json(
        { error: "Payload inválido" },
        { status: 400 }
      );
    }

    // ==========================
    // ✅ PROCESSAR SOMENTE SE PAGO
    // ==========================
    if (status !== "paid") {

      return NextResponse.json(
        { received: true, ignored: true },
        { status: 200 }
      );
    }

    // ==========================
    // ✅ AQUI VOCÊ MARCA O PEDIDO COMO PAGO
    // (BANCO DE DADOS OU ERP)
    // ==========================

    /*
      EXEMPLO (quando tiver banco):

      await prisma.orders.update({
        where: { externalRef },
        data: {
          status: "paid",
          paidAt: new Date(),
          transactionId: id,
          paidAmount,
        }
      });
    */

    // ==========================
    // ✅ SEMPRE RESPONDER 200 PARA O GATEWAY
    // ==========================
    return NextResponse.json(
      { success: true },
      { status: 200 }
    );

  } catch (e) {
    console.error("❌ ERRO NO POSTBACK:", e);

    return NextResponse.json(
      { error: true },
      { status: 500 }
    );
  }
}
