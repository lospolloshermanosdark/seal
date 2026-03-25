"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PaymentStep({ onBack, cart }: any) {
  const router = useRouter();

  const [method, setMethod] = useState<"pix" | "card" | null>(null);
  const [loading, setLoading] = useState(false);

  function handlePix() {
    setMethod("pix");
  }

  function handleCard() {
    setMethod("card");
  }

  function handleProceed() {
    if (method !== "pix") return;

    setLoading(true);

    const params = new URLSearchParams({
      amount: String(cart.total),
      title: cart.setor,
      unitPrice: String(cart.preco),
      quantity: "1",
      name: cart.nome ?? "Cliente",
      email: cart.email ?? "cliente@email.com",
      phone: cart.phone ?? "00000000000",
      cpf: cart.cpf ?? "00000000000",
    });

    setTimeout(() => {
      router.push("/checkout/pix?" + params.toString());
    }, 300);
  }

  return (
    <div className="payment-container">

      <h2 className="payment-title">
        Escolha sua forma de pagamento
      </h2>

      {/* PIX */}
      <div
        className={`payment-card ${method === "pix" ? "active pix" : ""}`}
        onClick={handlePix}
      >
        <div className="payment-row">

          <input type="radio" checked={method === "pix"} readOnly />

          <div className="payment-info">
            <div className="payment-header">
              <strong>PIX</strong>
              <span className="badge-green">Mais rápido</span>
            </div>

            <p>Pagamento instantâneo. Liberação imediata.</p>

            <div className="payment-benefits">
              ✔ Confirmação em segundos  
              ✔ Sem risco de falha
            </div>
          </div>

          {method === "pix" && <span className="check">✓</span>}
        </div>
      </div>

      {/* CARTÃO */}
      <div
        className={`payment-card ${method === "card" ? "active card" : ""}`}
        onClick={handleCard}
      >
        <div className="payment-row">

          <input type="radio" checked={method === "card"} readOnly />

          <div className="payment-info">
            <div className="payment-header">
              <strong>Cartão de crédito</strong>
              <span className="badge-gray">até 12x</span>
            </div>

            <p>Parcelamento disponível.</p>

            <div className="payment-warning">
              Indisponível no momento
            </div>
          </div>
        </div>
      </div>

      {/* AVISO */}
      {method === "card" && (
        <div className="alert-warning">
          O pagamento com cartão está indisponível no momento. Utilize PIX.
        </div>
      )}

      {/* SEGURANÇA */}
      <div className="security-box">
        🔒 Ambiente seguro • Criptografia SSL
      </div>

      {/* BOTÃO */}
      <button
        className="btn-primary"
        disabled={method !== "pix" || loading}
        onClick={handleProceed}
      >
        {loading ? "Processando..." : "Finalizar com PIX"}
      </button>

      <button className="btn-secondary" onClick={onBack}>
        Voltar
      </button>

      {/* CSS */}
      <style>{`
        .payment-container {
          background: #fff;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .payment-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .payment-card {
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
          cursor: pointer;
          transition: 0.2s;
        }

        .payment-card:hover {
          box-shadow: 0 4px 10px rgba(0,0,0,0.08);
        }

        .payment-card.active {
          border: 2px solid #000;
        }

        .payment-card.pix.active {
          border-color: #00a86b;
          background: #f2fff8;
        }

        .payment-card.card.active {
          border-color: #333;
        }

        .payment-row {
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }

        .payment-info {
          flex: 1;
        }

        .payment-header {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .badge-green {
          background: #e6fff3;
          color: #008f5a;
          padding: 2px 8px;
          border-radius: 999px;
          font-size: 12px;
        }

        .badge-gray {
          background: #eee;
          padding: 2px 8px;
          border-radius: 999px;
          font-size: 12px;
        }

        .payment-benefits {
          font-size: 12px;
          margin-top: 6px;
          color: #666;
        }

        .payment-warning {
          color: #c00;
          font-size: 12px;
          margin-top: 6px;
          font-weight: 600;
        }

        .alert-warning {
          background: #fff3cd;
          border: 1px solid #ffeeba;
          padding: 12px;
          border-radius: 8px;
          margin-top: 10px;
          font-size: 14px;
        }

        .security-box {
          background: #f7f7f7;
          padding: 12px;
          border-radius: 8px;
          margin-top: 12px;
          font-size: 13px;
          color: #666;
        }

        .btn-primary {
          width: 100%;
          background: #00a86b;
          color: white;
          padding: 14px;
          border-radius: 10px;
          margin-top: 20px;
          border: none;
          font-weight: bold;
          cursor: pointer;
        }

        .btn-primary:disabled {
          background: #ccc;
        }

        .btn-secondary {
          width: 100%;
          margin-top: 10px;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #ddd;
          background: #fff;
          cursor: pointer;
        }

        .check {
          color: green;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
}