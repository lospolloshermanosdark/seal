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
 <div style={{ background: "#f3f4f7", minHeight: "100vh" }}>
  <HeaderCheckout />

  {/* HERO */}
  <div
    style={{
      background: "linear-gradient(135deg, #202867, #2a3485)",
      color: "#fff",
      padding: "30px 20px",
      textAlign: "center",
    }}
  >
    <h1 style={{ fontSize: 26, fontWeight: 700 }}>
      Finalize seu pagamento
    </h1>

    <p style={{ marginTop: 6, opacity: 0.8 }}>
      Pedido #{externalRefRef.current}
    </p>

    <div style={{ marginTop: 12, fontSize: 32, fontWeight: 800 }}>
      R$ {formatBR(amount)}
    </div>
  </div>

  {/* CONTAINER */}
  <div
    style={{
      maxWidth: 1100,
      margin: "0 auto",
      marginTop: -30,
      padding: 20,
      display: "flex",
      gap: 20,
      flexWrap: "wrap",
    }}
  >
    {/* PIX CARD */}
    <div
      style={{
        flex: 1,
        minWidth: 340,
        background: "#fff",
        borderRadius: 12,
        padding: 28,
        boxShadow: "0 20px 50px rgba(33, 34, 97, 0.08)",
        textAlign: "center",
      }}
    >
      <div style={{display: "flex", flexDirection: "column", justifyItems: "center", justifyContent: "center", gap: "12px", alignItems: "center", width: "100%", fontSize: 22, fontWeight: 700 }}>
        <img src="/pix.png" width={60} alt="" />
       <span>  Pague com PIX</span>
      </div>

      <p style={{ fontSize: 14, color: "#6b7280", marginTop: 6 }}>
        Copie o código ou escaneie o QR Code
      </p>

      {/* TIMER */}
      <div
        style={{
          marginTop: 14,
          padding: "8px 12px",
          background: "#fff7ed",
          borderRadius: 8,
          fontSize: 13,
          color: "#ea580c",
          fontWeight: 600,
        }}
      >
        ⏱ Expira em 10 minutos
      </div>

      {loading ? (
        <div style={{ marginTop: 30 }}>
          <div className="spinner-circle-checkout"></div>
          <p>Gerando pagamento…</p>
        </div>
      ) : (
        <>
          {/* QR */}
          {qrImage && (
            <img
              src={qrImage}
              style={{
                width: 240,
                margin: "20px auto",
                borderRadius: 12,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            />
          )}

          {/* COPY BOX */}
          <div
            style={{
              marginTop: 10,
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: 12,
            }}
          >
            <textarea
              readOnly
              value={pixData?.pix?.qrcode ?? ""}
              style={{
                width: "100%",
                height: 80,
                border: "none",
                resize: "none",
                background: "transparent",
                fontSize: 12,
              }}
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                pixData?.pix?.qrcode ?? ""
              );
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            style={{
              marginTop: 14,
              width: "100%",
              padding: "16px",
              borderRadius: 12,
              border: "none",
              fontSize: 16,
              fontWeight: 700,
              cursor: "pointer",
              background: copied ? "#16a34a" : "#111827",
              color: "#fff",
            }}
          >
            {copied ? "✅ Código copiado" : "Copiar código PIX"}
          </button>

          {/* STATUS */}
          <div style={{ marginTop: 14 }}>
            {paid ? (
              <span style={{ color: "#16a34a", fontWeight: 700 }}>
                ✔ Pagamento confirmado
              </span>
            ) : (
              <span style={{ color: "#f59e0b", fontWeight: 600 }}>
                Aguardando pagamento…
              </span>
            )}
          </div>

          {/* PROVA SOCIAL */}
          <p
            style={{
              marginTop: 14,
              fontSize: 12,
              color: "#6b7280",
            }}
          >
            🔒 Ambiente seguro • Mais de 10.000 ingressos vendidos hoje
          </p>
        </>
      )}
    </div>

    {/* RESUMO + CONFIANÇA */}
    <div
      style={{
        width: "100%",
        background: "#fff",
        borderRadius: 18,
        padding: 24,
        boxShadow: "0 20px 50px rgba(0,0,0,0.08)",
      }}
    >
      <h3 style={{ fontSize: 20, fontWeight: 700 }}>
        Resumo do pedido
      </h3>

      <div style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 13, color: "#6b7280" }}>
          {cart?.quantity} ingresso(s)
        </div>
      </div>

      <div
        style={{
          marginTop: 18,
          paddingTop: 12,
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          fontWeight: 700,
          fontSize: 18,
        }}
      >
        <span>Total</span>
        <span>R$ {formatBR(amount)}</span>
      </div>

      {/* SEGURANÇA */}
      <div
        style={{
          marginTop: 20,
          background: "#f9fafb",
          padding: 14,
          borderRadius: 10,
          fontSize: 13,
          color: "#374151",
        }}
      >
        🔐 Compra 100% segura  
        <br />📩 Ingresso enviado por e-mail  
        <br />⚡ Confirmação imediata
      </div>

      <button
        onClick={() => router.push("/checkout")}
        style={{
          marginTop: 20,
          width: "100%",
          padding: "12px",
          borderRadius: 10,
          border: "1px solid #d1d5db",
          background: "#fff",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        ← Voltar
      </button>
    </div>
  </div>

  <FooterEventim />
</div>
    </>
  );
}