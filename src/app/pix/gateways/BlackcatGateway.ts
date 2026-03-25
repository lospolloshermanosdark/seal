import { PixCreateInput } from "@/app/types/PixCreateInput";
import { PixGateway, PixNormalizedResponse } from "../PixGateway";

export class BlackcatGateway implements PixGateway {
async create(input: PixCreateInput): Promise<PixNormalizedResponse> {

  const body = {
    amount: input.amount,
    currency: "BRL",
    paymentMethod: "pix",

    items: input.cart.map((item) => ({
      title: item.nome,
      unitPrice: item.unitPrice,
      quantity: item.quantity ?? 1,
      tangible: false,
    })),

    customer: {
      name: `${input.customer.firstName} ${input.customer.lastName}`.trim(),
      email: input.customer.email,
      phone: input.customer.phone.replace(/\D/g, ""),
      document: {
        number: input.customer.cpf.replace(/\D/g, ""),
        type: "cpf",
      },
    },

    externalRef: input.externalRef,

    postbackUrl: `${process.env.BASE_URL}/api/postback`,

    pix: {
      expiresInDays: 1,
    },
  };

  const res = await fetch(
    "https://api.blackcatpay.com.br/api/sales/create-sale",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.BLACKCAT_API_KEY!,
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(JSON.stringify(data));
  }

  return {
    id: data.data.transactionId,
    qrCode:
      data.data.paymentData?.qrCode ||
      data.data.paymentData?.copyPaste,
    expiresAt: data.data.paymentData?.expiresAt || undefined,
  };
}
  async check(transactionId: string) {
  const res = await fetch(
    `https://api.blackcatpay.com.br/api/sales/${transactionId}/status`,
    {
      method: "GET",
      headers: {
        "X-API-Key": process.env.BLACKCAT_API_KEY!,
      },
    }
  );

  const data = await res.json();


  if (!res.ok || !data.success) {
    throw new Error(JSON.stringify(data));
  }

  const status = data.data.status;

  return {
    paid: status === "PAID",
    status: status,
    raw: data,
  };
}
}