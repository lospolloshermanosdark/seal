"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import FooterEventim from "../components/FooterEventim";
import HeaderCheckout from "../components/HeaderCheckout";
import { formatBR } from "@/app/utils/format";

type PixResponse = {
  id: string;
  pix?: { qrcode?: string };
};

export default function PixPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [pixData, setPixData] = useState<PixResponse | null>(null);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [cart, setCart] = useState<any>(null);
  const [customer, setCustomer] = useState<any>(null);

  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const initializedRef = useRef(false);

  const externalRefRef = useRef(`PED-${Date.now().toString().slice(-6)}`);

  // ==========================
  // LOAD LOCAL STORAGE
  // ==========================
  useEffect(() => {
    const c = localStorage.getItem("cart");
    const cs = localStorage.getItem("customer");

    if (!c || !cs) {
      router.push("/checkout");
      return;
    }

    setCart(JSON.parse(c));
    setCustomer(JSON.parse(cs));
  }, []);

  // ==========================
  // CREATE / RESTORE PIX
  // ==========================
  useEffect(() => {
    if (!cart || !customer) return;
    if (initializedRef.current) return;

    initializedRef.current = true;

    async function gerarPix() {
      try {
        setLoading(true);

        const externalRef = externalRefRef.current;
        const amount = Math.round(cart.total * 100);

        // 🔁 RESTORE
        const saved = localStorage.getItem("currentPixOrder");

        if (saved) {
          const order = JSON.parse(saved);

          if (
            order.externalRef === externalRef &&
            order.qrCode &&
            order.pix_id
          ) {
            setPixData({
              id: order.pix_id,
              pix: { qrcode: order.qrCode },
            });

            const qr = await QRCode.toDataURL(order.qrCode, { width: 300 });
            setQrImage(qr);

            setLoading(false);
            startPolling(order.pix_id);
            return;
          }
        }

        // 🟢 CREATE PIX
        const payload = {
          gateway: "ironpay",
          amount,
          externalRef,

          cart: [
            {
              nome: cart.nome,
              produto: cart.setor,
              quantity: cart.quantity,
              unitPrice: amount,
            },
          ],

          customer: {
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone.replace(/\D/g, ""),
            cpf: customer.cpf.replace(/\D/g, ""),
          },
        };

        const res = await fetch("/api/pix/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Erro ao gerar PIX");

        const data = await res.json();

        const qrCode = data.pix?.qrcode ?? data.qrCode;

        if (!qrCode) throw new Error("QR Code não retornado");

        setPixData({
          id: data.id,
          pix: { qrcode: qrCode },
        });

        const qr = await QRCode.toDataURL(qrCode, { width: 300 });
        setQrImage(qr);

        localStorage.setItem(
          "currentPixOrder",
          JSON.stringify({
            externalRef,
            pix_id: data.id,
            qrCode,
          })
        );

        setLoading(false);
        startPolling(data.id);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    }

    gerarPix();
  }, [cart, customer]);

  // ==========================
  // POLLING
  // ==========================
const startPolling = (pixId: string) => {
  if (pollRef.current) clearInterval(pollRef.current);

  pollRef.current = setInterval(async () => {
    try {
      const res = await fetch(
        `/api/pix/check?id=${pixId}&gateway=ironpay`
      );

      const json = await res.json();

      console.log("PIX STATUS:", json);

      if (
        json?.paid === true ||
        json?.status === "paid" ||
        json?.status === "COMPLETED"
      ) {
        clearInterval(pollRef.current!);

        localStorage.removeItem("currentPixOrder");

        setPaid(true);

        setTimeout(() => {
          router.push("/checkout/success");
        }, 1200);
      }
    } catch {}
  }, 3000);
};

  const amount = cart ? cart.total * 100 : 0;
  const title = cart?.nome ?? "Pedido";

  return (
    <>
      <link rel="stylesheet" href="/eventim/css/patterns.css" />
      <link rel="stylesheet" href="/eventim/css/checkout.css" />

      <div className="checkout-wrapper-container" style={{ background: "#f3f4f7" }}>
        <div className="wrapper wrapper-container">
          <HeaderCheckout />

          <div className="row card standard-gray-shadow theme-content-bg" style={{ marginTop: 40, padding: 24, borderRadius: 16 }}>
            <div className="card-content">

              <h2 className="selection-list-headline u-font-weight-bold">
                Pague com PIX
              </h2>

              <div className="order-tag">
                Pedido: <strong>{externalRefRef.current}</strong>
              </div>

              <p style={{ marginTop: 10, textAlign: "center" }}>
                {title} — <strong>R$ {formatBR(amount)}</strong>
              </p>

              <div className="pix-wrapper">

                {/* PIX */}
                <div className="pix-card">
                  {loading ? (
                    <div className="spinner-wrapper">
                      <div className="spinner-circle-checkout"></div>
                      <div className="spinner-message-checkout">
                        Gerando PIX…
                      </div>
                    </div>
                  ) : (
                    <>
                      {qrImage && <img src={qrImage} className="qr-img" style={{margin: "0 auto"}} />}

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
                          navigator.clipboard.writeText(pixData?.pix?.qrcode ?? "");
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                      >
                        {copied ? "Copiado!" : "Copiar PIX"}
                      </button>

                      <p style={{ marginTop: 10, textAlign: "center" }}>
                        {paid ? "Pagamento confirmado!" : "Aguardando pagamento…"}
                      </p>
                    </>
                  )}
                </div>

                {/* RESUMO */}
                <div className="pix-card">
                  <h3 style={{ fontSize: 20, fontWeight: 700 }}>
                    Resumo do Pedido
                  </h3>

                  <div className="summary-line">
                    {title} — {cart?.quantity} unidade(s)
                  </div>

                  <div style={{
                    marginTop: 14,
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 18,
                    fontWeight: 600,
                  }}>
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
                <div style={{ marginTop: 14, color: "red", textAlign: "center" }}>
                  {error}
                </div>
              )}

            </div>
          </div>

          <FooterEventim />
        </div>
      </div>
    </>
  );
}