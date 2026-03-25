// src/pix/gateways/PagLoopGateway.ts

import { PixCreateInput } from "@/app/types/PixCreateInput";
import { PixGateway } from "../PixGateway";
import { PixNormalizedResponse } from "../PixGateway";
import { getPagloopToken } from "@/lib/pagloopAuth";

export class PagLoopGateway implements PixGateway {

  async create(input: PixCreateInput): Promise<PixNormalizedResponse> {

    const token = await getPagloopToken();

    const body = {
      amount: input.amount / 100, // API nova usa reais

      external_id: input.externalRef || `PED-${Date.now()}`,

      clientCallbackUrl: `${process.env.BASE_URL}/api/postback`,

      payer: {
        name: `${input.customer.firstName} ${input.customer.lastName}`.trim(),
        email: input.customer.email,
        phone: input.customer.phone.replace(/\D/g, ""),
        document: input.customer.cpf.replace(/\D/g, ""),
      },
    };

    const res = await fetch(
      "https://api.pagloop.tech/api/payments/deposit",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(JSON.stringify(data));
    }

    // Pagloop não retorna expiresAt direto.
    // QR expira em 30 minutos (documentação oficial).
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    return {
      id: data.qrCodeResponse.transactionId, // 👈 mantém padrão da sua interface
      qrCode: data.qrCodeResponse.qrcode,
      expiresAt,
    };
  }
  async check(transactionId: string) {
  const token = await getPagloopToken();

  const res = await fetch(
    `https://api.pagloop.tech/api/transactions/getStatusTransac/${transactionId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.status === 404) {
    return {
      paid: false,
      status: "NOT_FOUND",
    };
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(JSON.stringify(data));
  }

  const status = data.status;

  return {
    paid: status === "COMPLETED",
    status,
    raw: data,
  };
}
}
