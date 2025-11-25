
// src/app/checkout/success/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatBR } from "@/app/utils/format";
import HeaderCheckout from "../components/HeaderCheckout";
import FooterEventim from "../components/FooterEventim";

export default function SuccessPage() {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);

useEffect(() => {
  const saved = localStorage.getItem("currentOrder");
  if (!saved) {
    router.push("/checkout");
    return;
  }

  setOrder(JSON.parse(saved));
}, []);

// Agora vamos limpar DEPOIS que a página carregou corretamente
useEffect(() => {
  if (order) {
    localStorage.removeItem("cart");
    localStorage.removeItem("customer");
    localStorage.removeItem("currentOrder");
  }
}, [order]);

  if (!order) return null;

  return (
    <>
      <link rel="stylesheet" href="/eventim/css/patterns.css" />
      <link rel="stylesheet" href="/eventim/css/checkout.css" />

      <style>{`
        .success-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 48px 24px;
          background: #f3f4f7;
        }

        .success-card {
          background: #fff;
          border-radius: 20px;
          padding: 32px;
          max-width: 520px;
          width: 100%;
          box-shadow: 0 8px 22px rgba(0,0,0,0.08);
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .checkmark {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: #00c851;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 22px;
          animation: scaleIn 0.4s ease-out;
        }

        @keyframes scaleIn {
          0% { transform: scale(0.2); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        .checkmark svg {
          width: 58px;
          height: 58px;
          color: white;
        }

        .order-box {
          background: #eef2ff;
          border: 1px solid #d0d7ff;
          padding: 12px 18px;
          border-radius: 10px;
          margin: 20px 0;
          font-weight: bold;
          font-size: 16px;
          color: #3347b0;
        }

        .success-btn {
          width: 100%;
          padding: 14px 0;
          border-radius: 10px;
          background: #0B74FF;
          color: white;
          font-size: 18px;
          margin-top: 20px;
          border: none;
          cursor: pointer;
        }

        .success-btn:hover {
          background: #005ed6;
        }

        .outline-btn {
          width: 100%;
          padding: 14px 0;
          border-radius: 10px;
          border: 2px solid #0B74FF;
          color: #0B74FF;
          background: white;
          font-size: 17px;
          margin-top: 12px;
          cursor: pointer;
        }

        .outline-btn:hover {
          background: #eef4ff;
        }
      `}</style>

      <HeaderCheckout />

      <div className="wrapper success-wrapper">
        <div className="success-card">

          <div className="checkmark">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17l-5-5"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h2 style={{ fontWeight: 700, fontSize: 26 }}>Pagamento Confirmado!</h2>
          <p style={{ marginTop: 8, fontSize: 16, color: "#333" }}>
            Seu pedido foi processado com sucesso.
          </p>

          <div className="order-box">
            Pedido <strong>{order.externalRef}</strong>
          </div>

          <p style={{ marginTop: 12, fontSize: 17 }}>
            {order.title} — <strong>R$ {formatBR(order.amount)}</strong>
          </p>

          <button
            className="success-btn"
            onClick={() => router.push("/")}
          >
            Voltar ao Início
          </button>

          <button
            className="outline-btn"
            onClick={() => router.push("/meus-pedidos")}
          >
            Ver meus pedidos
          </button>
        </div>
      </div>

      <FooterEventim />
    </>
  );
}
