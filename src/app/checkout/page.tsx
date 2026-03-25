// src/app/checkout/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import HeaderCheckout from "./components/HeaderCheckout";
import { Accessibility } from "../event/components/accessibility";
import AccessibilityScript from "../event/components/AccessibilityScript";
import CartPage from "./components/Cart/CartPage";
import FooterEventim from "./components/FooterEventim";
import ProgressBar from "./components/ProgressBar";

export default function CheckoutPage() {
  const searchParams = useSearchParams();

  const ticketId = searchParams.get("ticketId");
  const nome = searchParams.get("nome");
  const preco = searchParams.get("preco");
  const qtd = searchParams.get("qtd");

  // formata preço
  const precoFormatado = preco
    ? (Number(preco) / 100).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    : "R$ 0,00";

  const subtotal =
    qtd && preco
      ? ((Number(preco) * Number(qtd)) / 100).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })
      : "R$ 0,00";

  return (
    <>
      {/* CSS padrão local */}
   

      {/* CSS contraste local */}
      <link
        id="contrast-style"
        rel="stylesheet"
        href="/eventim/css/patterns-contrast.css"
        // @ts-ignore

        disabled
      />
      <link rel="stylesheet" href="/eventim/css/checkout.css" />
   <link
        id="ev-style-sheet"
        rel="stylesheet"
        href="/eventim/css/patterns.css"
      />
      {/* Acessibilidade */}
      <Accessibility />

      {/* Script original em React -> controla zoom/contraste */}
      <AccessibilityScript />

      <div
        className="checkout-wrapper-container"
        style={{ background: "#e5e5e5" }}
      >
        <div className="wrapper wrapper-container">
          <div className="wrapper max-container-width">
            {/* HEADER */}
            <HeaderCheckout />

            {/* MAIN */}
            <CartPage />

            {/* FOOTER */}
            <FooterEventim />
          </div>
        </div>
      </div>
    </>
  );
}
