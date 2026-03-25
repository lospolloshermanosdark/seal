// app/api/pix/check/route.ts

import { getPixGateway } from "@/app/pix/PixService";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const txId = url.searchParams.get("id");
    const gatewayType = url.searchParams.get("gateway");

    if (!txId) {
      return NextResponse.json(
        { error: "Missing transaction id" },
        { status: 400 }
      );
    }

    if (!gatewayType) {
      return NextResponse.json(
        { error: "Gateway não informado" },
        { status: 400 }
      );
    }

    let result;

    try {
      // gateway principal
      const gateway = getPixGateway(gatewayType);
      result = await gateway.check(txId);

    } catch (err) {
      console.warn("Gateway principal falhou no check, tentando fallback...");

      // fallback (opcional, mas útil)
      const fallback = getPixGateway("blackcat");
      result = await fallback.check(txId);
    }

    return NextResponse.json({
      paid: result.paid,
      status: result.status,
    });

  } catch (error: any) {
    console.error("PIX CHECK ERROR:", error);

    return NextResponse.json(
      {
        error: true,
        message: error.message ?? "Erro interno ao consultar transação",
      },
      { status: 500 }
    );
  }
}