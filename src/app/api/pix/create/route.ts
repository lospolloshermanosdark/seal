// app/api/pix/create/route.ts

import { getPixGateway } from "@/app/pix/PixService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { gateway } = body;

    // validação básica
    if (!body.amount || !body.customer) {
      return NextResponse.json(
        { error: "Dados incompletos" },
        { status: 400 }
      );
    }

    if (!gateway) {
      return NextResponse.json(
        { error: "Gateway não informado" },
        { status: 400 }
      );
    }

    let normalized;

    try {
      // gateway principal
      const gw = getPixGateway(gateway);
      normalized = await gw.create(body);

    } catch (err) {
      console.warn("Gateway principal falhou, tentando fallback...");

      // fallback automático
      const fallback = getPixGateway("pagloop");
      normalized = await fallback.create(body);
    }

    return NextResponse.json(normalized);

  } catch (err: any) {
    console.error("PIX ERROR:", err);

    return NextResponse.json(
      { error: err.message ?? "Erro ao gerar PIX" },
      { status: 500 }
    );
  }
}