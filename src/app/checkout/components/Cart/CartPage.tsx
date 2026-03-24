// src/app/checkout/components/Cart/CartPage.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import ReservationTimer from "../ReservationTimer";
import CartMain from "./CartMain";
import CartSummary from "./CartSummary";
import FooterEventim from "../FooterEventim";
import DeliveryForm, { DeliveryFormRef } from "./DeliveryForm";
import PaymentStep from "./PaymentStep";

export default function CartPage() {
  const [cart, setCart] = useState<any>(null);
  const [step, setStep] = useState<
    "carrinho" | "entrega" | "pagamento" | "validacao"
  >("carrinho");
  const deliveryRef = useRef<DeliveryFormRef>(null);

  useEffect(() => {
    // 1. Ler parâmetros da URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const nome = params.get("nome");
    const preco = params.get("preco");
    const setor = params.get("setor");

    // 2. Se veio da URL → salva no storage
    if (id && nome && preco && setor) {
      const cartItem = {
        id,
        nome,
        preco: Number(preco),
        setor,
        quantity: 1,
        total: Number(preco),
      };

      localStorage.setItem("cart", JSON.stringify(cartItem));
      setCart(cartItem);
      return;
    }

    // 3. Caso não tenha URL → busca no localStorage
    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  if (!cart) {
    return <p style={{ padding: 20 }}>Carregando carrinho…</p>;
  }
  const nextStep = () => {
    setStep((prev) => {
      if (prev === "carrinho") return "entrega";
      if (prev === "entrega") return "pagamento";
      if (prev === "pagamento") return "validacao";
      return prev;
    });
  };

  return (
    <main className="main-content container" style={{ minHeight: "73vh" }}>
      <div className="row">
        <div className="col-xs-12">
          <div className="shoppingCartPage">
            <div className="main-ticket-card">
              <div className="row">
                {/* etapa inicial - sem o <ProgressBar /> */}

                {step === "carrinho" && (
                  <CartMain
                    title="Carrinho"
                    quantity={1}
                    total={`R$ ${cart.total.toLocaleString("pt-BR")},00`}
                    eventName={cart.setor}
                    price={`R$ ${cart.preco.toLocaleString("pt-BR")},00`}
                    venue="Autódromo de São Paulo — F1 2026"
                    date="31 de Outubro a 02 de Novembro"
                    promoter="Fórmula 1 Brasil"
                    image="/eventim/imgs/Dominguinho_Eventim_1240x480.png"
                  />
                )}

                {step === "entrega" && (
                  <DeliveryForm
                    ref={deliveryRef}
                    onContinue={nextStep}
                    onBack={() => setStep("carrinho")}
                  />
                )}

                {step === "pagamento" && (
                  <PaymentStep
                    onContinue={nextStep}
                    onBack={() => setStep("entrega")}
                    cart={cart}
                  />
                )}

                {/* {step === "validacao" && (
                  <PaymentValidation />
                )} */}

                <div className="col-xs-12 col-md-4 sidebar">
                  <ReservationTimer />
                  <CartSummary
                    quantity={1}
                    eventName={cart.setor}
                    hideActions={step === "pagamento"}
                    price={`R$ ${cart.preco.toLocaleString("pt-BR")},00`}
                    venue="Autódromo de São Paulo — F1 2026"
                    date="31 de Outubro a 02 de Novembro"
                    subtotal={`R$ ${cart.total.toLocaleString("pt-BR")},00`}
                    onContinue={() => {
                      if (step === "carrinho") setStep("entrega");

                      if (step === "entrega") {
                        const ok = deliveryRef.current?.triggerSubmit();
                        if (ok) setStep("pagamento");
                      }
                    }}
                    onBack={
                      step === "entrega"
                        ? () => setStep("carrinho")
                        : step === "pagamento"
                          ? () => setStep("entrega")
                          : undefined
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
