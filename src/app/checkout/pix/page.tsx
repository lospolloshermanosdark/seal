"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import FooterEventim from "../components/FooterEventim";
import HeaderCheckout from "../components/HeaderCheckout";
import { formatBR } from "@/app/utils/format";

type PixResponse = {
  id: string;
  pix?: {
    qrcode?: string;
    receiptUrl?: string | null;
    expirationDate?: string | null;
  };
  status?: string;
};

export default function PixPage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  // ============================
  // PEGAR CARRINHO + CLIENTE
  // ============================
  const cart =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart") || "null")
      : null;

  const customer =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("customer") || "null")
      : null;

  useEffect(() => {
    if (!cart || !customer) router.push("/checkout");
  }, []);

  // ============================
  // PEDIDO SALVO
  // ============================
  const savedOrder =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("currentOrder") || "null")
      : null;

  const externalRef =
    savedOrder?.externalRef ?? `PED-${Date.now().toString().slice(-6)}`;

  // ============================
  // VALORES
  // ============================
  const TEST_AMOUNT = process.env.NEXT_PUBLIC_PIX_TEST_AMOUNT
    ? Number(process.env.NEXT_PUBLIC_PIX_TEST_AMOUNT)
    : null;

  const amount = TEST_AMOUNT ? TEST_AMOUNT : (cart?.total ?? 0) * 100;
  const title = cart?.nome ?? "Pedido";

  // ============================
  // ESTADOS
  // ============================
  const [loading, setLoading] = useState(true);
  const [pixData, setPixData] = useState<PixResponse | null>(null);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasCreatedPix, setHasCreatedPix] = useState(false);

  // ============================
  // BODY DO PIX
  // ============================
  const body = useMemo(
    () => ({
      amount: Number(amount),
      paymentMethod: "pix",
      provider: "gatware",
      transactionType: "DEPOSIT",
      description: `Pagamento do pedido ${externalRef}`,
      callbackUrl: "https://davin-debonair-avidly.ngrok-free.dev/api/postback",

      externalRef,

      customer: {
        name: customer?.firstName + " " + customer?.lastName,
        email: customer?.email,
        document: {
          type: "cpf",
          number: customer?.cpf,
        },
      },

      items: [
        {
          title,
          unitPrice: Number(amount),
          name: "Serviço",
          description: `Pagamento do pedido ${externalRef}`,
          price_amount: { value: Number(amount) },
          quantity: cart?.quantity ?? 1,
          tangible: false,
        },
      ],
    }),
    [amount, cart, customer]
  );

  // ============================
  // RESTAURAR PEDIDO PENDENTE
  // ============================
  useEffect(() => {
    if (savedOrder && savedOrder.status === "pending") {
      setHasCreatedPix(true);

      setPixData({
        id: savedOrder.pix_id,
        pix: {
          qrcode: savedOrder.pix_qrcode,
          receiptUrl: null,
          expirationDate: null,
        },
      });

      QRCode.toDataURL(savedOrder.pix_qrcode, { width: 1080 }).then(setQrImage);

      const interval = setInterval(async () => {
        const chk = await fetch(`/api/pix/check?id=${savedOrder.pix_id}`);
        const json = await chk.json();

        if (json.status === "paid") {
          clearInterval(interval);
          setPaid(true);
          setTimeout(() => router.push("/checkout/success"), 1200);
        }
      }, 3000);

      return;
    }
  }, []);

  // ============================
  // CRIAR PIX + SALVAR PEDIDO
  // ============================
  useEffect(() => {
    if (hasCreatedPix) return;
    setHasCreatedPix(true);

    let mounted = true;

    async function start() {
      try {
        setLoading(true);

        const rPix = await fetch("/api/pix/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!rPix.ok) throw new Error("Erro ao gerar PIX");

        const pix: PixResponse = await rPix.json();
        if (!mounted) return;
        setPixData(pix);

        if (pix.pix?.qrcode) {
          const img = await QRCode.toDataURL(pix.pix.qrcode, { width: 1080 });
          setQrImage(img);
        }

        // 🔥 GRAVAR PEDIDO COM customer_id
        await fetch("/api/order/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            externalRef,
            amount,
            title,

            customer_name: customer?.firstName + " " + customer?.lastName,
            customer_email: customer?.email,
            customer_cpf: customer?.cpf?.replace(/\D/g, "") ?? "",

            payment_status: "pending",
            pix_id: pix.id,
            pix_qrcode: pix.pix?.qrcode ?? null,
          }),
        });

        // SALVAR LOCAL
        localStorage.setItem(
          "currentOrder",
          JSON.stringify({
            externalRef,
            pix_id: pix.id,
            pix_qrcode: pix.pix?.qrcode ?? "",
            amount,
            title,
            status: "pending",
            created_at: Date.now(),
          })
        );

        // POLLING
        const interval = setInterval(async () => {
          try {
            const chk = await fetch(`/api/pix/check?id=${pix.id}`);
            const json = await chk.json();

            if (json.status === "paid") {
              clearInterval(interval);
              setPaid(true);
              setTimeout(() => router.push("/checkout/success"), 1200);
            }
          } catch { }
        }, 3000);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    start();
    return () => {
      mounted = false;
    };
  }, []);


  return (
    <>
      <link rel="stylesheet" href="/eventim/css/patterns.css" />
      <link rel="stylesheet" href="/eventim/css/checkout.css" />

      <style>{`
        .pix-wrapper {
          display: grid;
          gap: 32px;
          margin-top: 20px;
          justify-content: center;
        }
/* SPINNER EVENTIM */
.spinner-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  gap: 12px;
}

.spinner-circle-checkout {
  width: 40px;
  height: 40px;
  border: 4px solid #d8d8d8;
  border-top-color: #0B74FF;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spinner-message-checkout {
  font-size: 15px;
  color: #333;
}

        @media (min-width: 992px) {
          .pix-wrapper {
            grid-template-columns: 460px 360px;
          }
        }

        .pix-card {
          background: #fff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }

        .order-tag {
          background: #eef2ff;
          color: #3b5bdb;
          padding: 6px 12px;
          border-radius: 8px;
          font-weight: 600;
          display: inline-block;
          margin-top: 6px;
          box-shadow: inset 0 0 0 1px #d0d7ff;
        }

        .summary-line {
          padding-bottom: 12px;
          border-bottom: 1px solid #eee;
          margin-top: 12px;
        }

        .btn-primary {
          border-radius: 8px;
          font-size: 16px;
        }

        .qr-img {
          width: 100%;
          max-width: 320px;
          margin: 0 auto;
          display: block;
        }

.card-content {
  display: flex!important;
  flex-direction: column!important;
  justify-content: center!important;
}

.selection-list-headline{
  text-align: center;
}

.order-tag {
    text-align: center;

}
        @media(max-width: 480px){
          .qr-img{
            max-width: 260px;
          }
        }
      `}</style>

      <div
        className="checkout-wrapper-container"
        style={{ background: "#f3f4f7" }}
      >
        <div className="wrapper wrapper-container">
          <HeaderCheckout />

          <div
            className="row card standard-gray-shadow theme-content-bg"
            style={{ marginTop: 40, padding: 24, borderRadius: 16 }}
          >
            <div className="card-content">
              <h2 className="selection-list-headline u-font-weight-bold">
                Pague com PIX
              </h2>

              <div className="order-tag">
                Pedido: <strong>{externalRef}</strong>
              </div>

              <p style={{ marginTop: 10, textAlign: "center" }}>
                {title} — <strong>R$ {formatBR(amount)}</strong>
              </p>

              {/* GRID */}
              <div className="pix-wrapper">
                {/* Caixa PIX */}
                <div className="pix-card">
                  {loading ? (
                    <div className="spinner-wrapper">
                      <div className="spinner-circle-checkout"></div>
                      <div className="spinner-message-message">
                        Gerando PIX…
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={qrImage ?? ""}
                        className="qr-img"
                        alt="QR Code"
                      />

                      <textarea
                        readOnly
                        value={pixData?.pix?.qrcode ?? ""}
                        style={{
                          width: "100%",
                          marginTop: 15,
                          padding: 12,
                          height: 110,
                          borderRadius: 8,
                          border: "1px solid #ccc",
                        }}
                      />

                      <button
                        className="btn btn-primary btn-lg btn-block"
                        style={{ marginTop: 12 }}
                        onClick={() => {
                          navigator.clipboard.writeText(
                            pixData?.pix?.qrcode ?? ""
                          );
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2500);
                        }}
                      >
                        Copiar PIX
                      </button>

                      <p style={{ marginTop: 10, textAlign: "center" }}>
                        {paid
                          ? "Pagamento confirmado!"
                          : "Aguardando pagamento…"}
                      </p>
                    </>
                  )}
                </div>

                {/* RESUMO DO PEDIDO */}
                <div className="pix-card">
                  <h3 style={{ fontSize: 20, fontWeight: 700 }}>
                    Resumo do Pedido
                  </h3>

                  <div className="summary-line">
                    {title} — {cart?.quantity} unidade(s)
                  </div>

                  <div
                    style={{
                      marginTop: 14,
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 18,
                      fontWeight: 600,
                    }}
                  >
                    <span>Total</span>
                    <span>R$ {formatBR(amount)}</span>
                  </div>

                  <button
                    onClick={() => router.push("/checkout")}
                    className="btn btn-default btn-lg btn-block"
                    style={{ marginTop: 20 }}
                  >
                    Voltar
                  </button>
                </div>
              </div>

              {error && (
                <div
                  style={{ marginTop: 14, color: "red", textAlign: "center" }}
                >
                  {error}
                </div>
              )}
            </div>
          </div>

          <FooterEventim />
        </div>
      </div>

      {copied && (
        <div className="pix-toast">Código PIX copiado com sucesso!</div>
      )}
    </>
  );
}
