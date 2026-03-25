"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import HeaderCheckout from "../components/HeaderCheckout";
import FooterEventim from "../components/FooterEventim";

export default function SuccessPage() {
  const router = useRouter();

  const [customer, setCustomer] = useState<any>(null);
  const [ready, setReady] = useState(false);

  const orderRef = useRef(`PED-${Date.now().toString().slice(-6)}`);

  // 🔥 pega customer (opcional)
  useEffect(() => {
    try {
      const cust = localStorage.getItem("customer");
      if (cust) setCustomer(JSON.parse(cust));
    } catch {}
    
    setReady(true);
  }, []);

  // 🔥 LIMPEZA SEGURA
  useEffect(() => {
    if (!ready) return;

    const timeout = setTimeout(() => {
      try {
        localStorage.removeItem("cart");
        localStorage.removeItem("currentPixOrder");
        // 🔴 NÃO limpar customer (importante pra retenção)
      } catch {}
    }, 4000); // espera 4s (UX)

    return () => clearTimeout(timeout);
  }, [ready]);

  if (!ready) return null;

  return (
    <>
      <link rel="stylesheet" href="/eventim/css/patterns.css" />
      <link rel="stylesheet" href="/eventim/css/checkout.css" />

      <style>{`
        .success-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 16px;
          background: #f3f4f7;
        }

        .success-card {
          background: #fff;
          border-radius: 20px;
          padding: 32px;
          max-width: 520px;
          width: 100%;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          text-align: center;
        }

        .checkmark {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: #00c851;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        .order-box {
          background: #eef2ff;
          border: 1px solid #d0d7ff;
          padding: 12px;
          border-radius: 10px;
          margin: 20px 0;
          font-weight: bold;
          color: #3347b0;
        }

        .info-box {
          margin-top: 18px;
          padding: 16px;
          background: #f5f7ff;
          border: 1px solid #d6ddff;
          border-radius: 10px;
          text-align: left;
          font-size: 14px;
        }

        .btn-primary {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          background: #0B74FF;
          color: white;
          border: none;
          margin-top: 20px;
          cursor: pointer;
        }

        .btn-outline {
          width: 100%;
          padding: 14px;
          border-radius: 10px;
          border: 2px solid #0B74FF;
          color: #0B74FF;
          background: white;
          margin-top: 12px;
          cursor: pointer;
        }
      `}</style>

      <HeaderCheckout />

      <div className="success-wrapper">
        <div className="success-card">

          <div className="checkmark">
            <svg viewBox="0 0 24 24">
              <path
                d="M20 6L9 17l-5-5"
                stroke="white"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </div>

          <h2 style={{ fontSize: 26, fontWeight: 700 }}>
            Pagamento confirmado!
          </h2>

          <p>Seu pedido foi aprovado com sucesso.</p>

          <div className="order-box">
            Pedido <strong>{orderRef.current}</strong>
          </div>

          {customer?.firstName && (
            <p>
              Cliente:{" "}
              <strong>
                {customer.firstName} {customer.lastName}
              </strong>
            </p>
          )}

          {customer?.email && (
            <p>
              Enviaremos para: <strong>{customer.email}</strong>
            </p>
          )}

          <div className="info-box">
            <strong>📩 Seus ingressos:</strong>
            <ul style={{ marginTop: 8 }}>
              <li>Envio em até <strong>24 a 48 horas</strong></li>
              <li>Verifique spam ou lixo eletrônico</li>
              <li>Use o email cadastrado na compra</li>
            </ul>
          </div>

          <button className="btn-primary" onClick={() => router.push("/")}>
            Voltar ao início
          </button>

          <button
            className="btn-outline"
            onClick={() => window.open("https://wa.me/SEUNUMERO")}
          >
            Falar com suporte
          </button>

        </div>
      </div>

      <FooterEventim />
    </>
  );
}