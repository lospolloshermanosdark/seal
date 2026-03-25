"use client";

import { useEffect, useRef, useState } from "react";
import ReservationTimer from "../ReservationTimer";
import CartMain from "./CartMain";
import CartSummary from "./CartSummary";
import DeliveryForm, { DeliveryFormRef } from "./DeliveryForm";
import PaymentStep from "./PaymentStep";
import IngressosUsuarioStep from "../IngressosUsuarioStep";
import { eventosSeal } from "@/app/utils/setores";

export default function CartPage() {
  const [cart, setCart] = useState<any>(null);
  const [evento, setEvento] = useState<any>(null);
  const [selectedSector, setSelectedSector] = useState<any>(null);

  const [step, setStep] = useState<
    "carrinho" | "entrega" | "ingressos" | "pagamento"
  >("carrinho");

  const deliveryRef = useRef<DeliveryFormRef>(null);

  // 🔥 CONTROLE DE FLUXO
  const nextStep = () => {
    setStep((prev) => {
      if (prev === "carrinho") return "entrega";
      if (prev === "entrega") return "ingressos";
      if (prev === "ingressos") return "pagamento";
      return prev;
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");
    const nome = params.get("nome");
    const preco = params.get("preco");
    const setorNome = params.get("setor");
    const cidadeParam = params.get("cidade") || "rio-de-janeiro";

    const cidade =
      cidadeParam === "sao-paulo" ? "sao-paulo" : "rio-de-janeiro";

    const eventoAtual = eventosSeal[cidade];
    setEvento(eventoAtual);

    const setorEncontrado =
      eventoAtual?.setores.find((s: any) => s.nome === setorNome) ||
      eventoAtual?.setores[0];

    setSelectedSector(setorEncontrado);

    // 👉 monta cart
    if (id && nome && preco && setorNome) {
      const cartItem = {
        id,
        nome,
        preco: Number(preco),
        setor: setorNome,
        quantity: 1,
        total: Number(preco),
      };

      localStorage.setItem("cart", JSON.stringify(cartItem));
      setCart(cartItem);
      return;
    }

    const saved = localStorage.getItem("cart");
    if (saved) {
      setCart(JSON.parse(saved));
    }
  }, []);

  if (!cart || !evento) {
    return <p style={{ padding: 20 }}>Carregando carrinho…</p>;
  }

  return (
    <main className="main-content container" style={{ minHeight: "73vh" }}>
      <div className="row">
        <div className="col-xs-12">
          <div className="shoppingCartPage">
            <div className="main-ticket-card">
              <div className="row">

                {/* ================= MAIN ================= */}

                {step === "carrinho" && (
                  <CartMain
                    title="Carrinho"
                    quantity={1}
                    total={`R$ ${cart.total.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}`}
                    eventName={`SEAL — ${selectedSector?.nome}`}
                    price={`R$ ${cart.preco.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}`}
                    venue={`${evento.local} — ${evento.nome}`}
                    date={evento.data}
                    promoter="Eventim Brasil"
                    image="https://www.eventim.com.br/obj/media/BR-eventim/galery/kuenstler/s/Seal_PacoteEventim_1242x480.png"
                  />
                )}

                {step === "entrega" && (
                  <DeliveryForm
                    ref={deliveryRef}
                    onContinue={nextStep} // 🔥 DEIXA ASSIM
                    onBack={() => setStep("carrinho")}
                  />
                )}

                {step === "ingressos" && (
                  <IngressosUsuarioStep
                    onNext={nextStep}
                  />
                )}

                {step === "pagamento" && (
                  <PaymentStep
                    onContinue={() => {}}
                    onBack={() => setStep("ingressos")}
                    cart={cart}
                  />
                )}

                {/* ================= SIDEBAR ================= */}

                <div className="col-xs-12 col-md-4 sidebar">
                  <ReservationTimer />

                  <CartSummary
                    quantity={1}
                    eventName={`SEAL — ${selectedSector?.nome}`}
                    hideActions={step === "pagamento"}
                    price={`R$ ${cart.preco.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}`}
                    venue={`${evento.local} — ${evento.nome}`}
                    date={evento.data}
                    subtotal={`R$ ${cart.total.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}`}

                    onContinue={() => {
                      if (step === "carrinho") {
                        nextStep();
                      }

                      else if (step === "entrega") {
                        // 🔥 AQUI ESTAVA O BUG
                        deliveryRef.current?.triggerSubmit();
                        // ❌ NÃO chamar nextStep aqui
                      }

                      else if (step === "ingressos") {
                        nextStep();
                      }
                    }}

                    onBack={
                      step === "entrega"
                        ? () => setStep("carrinho")
                        : step === "ingressos"
                        ? () => setStep("entrega")
                        : step === "pagamento"
                        ? () => setStep("ingressos")
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