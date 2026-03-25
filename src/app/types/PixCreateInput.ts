export type PixCreateInput = {
  gateway: "pagloop" | "payfort" | "blackcat" | "ironpay";

  /**
   * 🔥 SEMPRE em reais no seu sistema
   * conversão para centavos acontece no gateway
   */
  amount: number;

  externalRef: string;

  cart: {
    id?: string; // opcional (futuro product_hash)
    nome: string;
    unitPrice: number; // reais
    quantity?: number;
  }[];

  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    cpf: string;

    // 🔥 NECESSÁRIO PARA IRONPAY
    street?: string;
    number?: string;
    complement?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };

  /**
   * 🔥 OPCIONAL (mas útil)
   */
  tracking?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
  };
};