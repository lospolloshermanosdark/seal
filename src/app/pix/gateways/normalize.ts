export function normalizePixResponse(
  raw: any,
  gateway: "pagloop" | "payfort" | "blackcat" | "ironpay",
) {
  if (!raw) {
    throw new Error("Resposta vazia do gateway");
  }

  // =====================
  // PAGLOOP
  // =====================
  if (gateway === "pagloop") {
    const qrCode = raw.qrCode;

    if (!qrCode) {
      throw new Error("QR Code não retornado pelo PagLoop");
    }

    return {
      id: raw.transactionId,
      qrCode,
      status: raw.status,
      amount: raw.amount,
      raw,
    };
  }

  // =====================
  // PAYFORT
  // =====================
  if (gateway === "payfort") {
    const qrCode = raw.qrCode || raw.raw?.pix?.qrcode || raw.pix?.qrcode;

    if (!qrCode) {
      throw new Error("QR Code não retornado pelo PayFort");
    }

    return {
      id: String(raw.id),
      qrCode,
      expiresAt: raw.raw?.pix?.expirationDate,
      raw,
    };
  }

  // =====================
  // BLACKCAT
  // =====================
  if (gateway === "blackcat") {
    const qrCode = raw?.data?.paymentData?.qrCode;
    const expiresAt = raw?.data?.paymentData?.expiresAt;
    const transactionId = raw?.data?.transactionId;

    if (!qrCode || !transactionId) {
      throw new Error("QR Code não retornado pelo Blackcat");
    }

    return {
      id: transactionId,
      qrCode,
      expiresAt,
      raw,
    };
  }

  // =====================
  // IRONPAY
  // =====================
  if (gateway === "ironpay") {
    const transactionId = raw?.transaction_hash || raw?.id;

    const qrCode =
      raw?.pix?.qr_code ||
      raw?.pix?.copy_paste ||
      raw?.qr_code ||
      raw?.pix_code;

    const expiresAt = raw?.pix?.expires_at || raw?.expires_at;

    if (!transactionId) {
      throw new Error("Transaction ID não retornado pela IronPay");
    }

    /**
     * ⚠️ IronPay pode retornar transação sem QR dependendo do timing
     * (principalmente PIX async)
     */
    if (!qrCode) {
      return {
        id: transactionId,
        qrCode: "",
        expiresAt,
        raw,
      };
    }

    return {
      id: transactionId,
      qrCode,
      expiresAt,
      raw,
    };
  }

  throw new Error("Gateway não suportado");
}
