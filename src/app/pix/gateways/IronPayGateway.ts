import { PixCreateInput } from "@/app/types/PixCreateInput";
import { PixGateway, PixNormalizedResponse } from "../PixGateway";

export class IronPayGateway implements PixGateway {
 async create(input: PixCreateInput): Promise<PixNormalizedResponse> {
  const body = {
    amount: Math.round(input.amount),

    offer_hash: process.env.IRONPAY_OFFER_HASH,
    payment_method: "pix",
    installments: 1,

    customer: {
      name: `${input.customer.firstName} ${input.customer.lastName}`.trim(),
      email: input.customer.email,
      phone_number: input.customer.phone.replace(/\D/g, ""),
      document: input.customer.cpf.replace(/\D/g, ""),

      // 🔥 OBRIGATÓRIO NA PRÁTICA
      street_name: input.customer.street || "Rua",
      number: input.customer.number || "0",
      complement: input.customer.complement || "",
      neighborhood: input.customer.neighborhood || "Centro",
      city: input.customer.city || "São Paulo",
      state: input.customer.state || "SP",
      zip_code: input.customer.zipCode?.replace(/\D/g, "") || "00000000",
    },

    cart: input.cart.map((item) => ({
      product_hash: process.env.IRONPAY_PRODUCT_HASH,
      title: item.nome,
      cover: null,
      price: Math.round(item.unitPrice),
      quantity: item.quantity ?? 1,
      operation_type: 1,
      tangible: false,
    })),

    expire_in_days: 1,
    transaction_origin: "api",

    tracking: {
      utm_source: "site",
      utm_medium: "checkout",
      utm_campaign: "curso",
    },

    postback_url: `${process.env.BASE_URL}/api/postback/ironpay`,
  };

  const res = await fetch(
    `https://api.ironpayapp.com.br/api/public/v1/transactions?api_token=${process.env.IRONPAY_API_TOKEN}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    console.error("IRONPAY ERROR:", data);
    throw new Error(JSON.stringify(data));
  }

  return {
    id: data.hash,
    qrCode: data.pix?.pix_qr_code || "",
    expiresAt: data.pix?.expires_at,
  };
}

 async check(transactionId: string) {
  const res = await fetch(
    `https://api.ironpayapp.com.br/api/public/v1/transactions/${transactionId}?api_token=${process.env.IRONPAY_API_TOKEN}`
  );

  const json = await res.json();

  if (!res.ok) {
    throw new Error(JSON.stringify(json));
  }

  // 🔥 suporta ambos formatos da API
  const data = json.data ?? json;

  const status =
    data.payment_status || // resposta de criação
    data.status || // resposta de consulta
    null;

  return {
    paid: status === "paid",
    status,
    raw: json,
  };
}
}