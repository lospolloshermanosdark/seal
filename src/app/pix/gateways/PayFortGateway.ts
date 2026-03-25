import { PixCreateInput } from "@/app/types/PixCreateInput";
import { PixGateway } from "../PixGateway";

export class PayFortGateway implements PixGateway {
async create(input: PixCreateInput) {
  const SECRET_KEY = process.env.NEXT_PUBLIC_PAYFORT_SECRET!;
  const COMPANY_ID = process.env.NEXT_PUBLIC_PAYFORT_COMPANY_ID!;

  const credentials = Buffer.from(`${SECRET_KEY}:${COMPANY_ID}`).toString("base64");

  const body = {
    amount: input.amount,
    paymentMethod: "pix",
    provider: "gateway",
    transactionType: "DEPOSIT",
    description: `Pagamento ${input.externalRef}`,
    callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/postback`,
    seeWebhook: true,
    externalRef: input.externalRef,

    customer: {
      name: `${input.customer.firstName} ${input.customer.lastName}`,
      email: input.customer.email,
      phone: input.customer.phone.replace(/\D/g, ""),
      document: {
        type: "cpf",
        number: input.customer.cpf.replace(/\D/g, ""),
      },
    },

    items: input.cart.map((item) => ({
      title: item.nome,
      unitPrice: item.unitPrice,
      quantity: item.quantity ?? 1,
      tangible: false,
    })),
  };

  const res = await fetch(
    "https://api.payfortbr.club/functions/v1/transactions",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(JSON.stringify(data));
  }

  return {
    id: data.id,
    qrCode: data.pix?.qrcode,
    qrCodeBase64: data.pix?.qrcodeImage,
    expiresAt: data.pix?.expiresAt,
    raw: data,
  };
}

  async check(transactionId: string) {
    const SECRET_KEY = process.env.NEXT_PUBLIC_PAYFORT_SECRET!;
    const COMPANY_ID = process.env.NEXT_PUBLIC_PAYFORT_COMPANY_ID!;

    const credentials = Buffer.from(
      `${SECRET_KEY}:${COMPANY_ID}`
    ).toString("base64");

    const res = await fetch(
      `https://api.payfortbr.club/functions/v1/transactions/${transactionId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/json",
        },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(JSON.stringify(data));
    }

    return {
      paid: data.status === "paid",
      status: data.status,
      raw: data,
    };
  }
}
