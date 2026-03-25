"use client";

import { gerarTicketHTML } from "@/app/utils/gerarTickets";
import { eventosSeal } from "@/app/utils/setores";
import { useEffect, useState } from "react";

export default function TicketSelector() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [evento, setEvento] = useState<any>(null);
  const [selectedSector, setSelectedSector] = useState<any>(null);

  // 🔥 CAPTURA CIDADE + SETOR
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const cidadeParam = params.get("cidade");

    const cidade = (cidadeParam === "sao-paulo"
      ? "sao-paulo"
      : "rio-de-janeiro") as keyof typeof eventosSeal;
    const setorId = params.get("setor");

    const eventoAtual = eventosSeal[cidade];

    if (!eventoAtual) return;

    setEvento(eventoAtual);

    if (setorId) {
      const found = eventoAtual.setores.find((s: any) => s.id === setorId);
      if (found) {
        setSelectedSector(found);
        return;
      }
    }

    setSelectedSector(eventoAtual.setores[0]);
  }, []);

  // 🎯 GERAR TICKETS
  const gerarTickets = () => {
    if (!selectedSector) return [];

    const { prices, id } = selectedSector;

    return [
      {
        id: `${id}_MEIA`,
        nome: "MEIA ENTRADA",
        preco: prices.meia,
      },
      {
        id: `${id}_ITAU`,
        nome: "CLIENTE ITAÚ",
        preco: prices.itau,
      },
      {
        id: `${id}_INT`,
        nome: "INTEIRA",
        preco: prices.inteira,
      },
    ];
  };

  const ticketsData = gerarTickets();

  // HTML
  const htmlForm = `
<div class="event-list-item" style>
  <div class="event-list-item margin-bottom-s u-shadow standard-gray-shadow">

    <div class="event-list-item-wrapper clearfix">

      <form class="event-list-content" style="
    padding: 23px 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
">

        <!-- 🔥 HEADER EVENTO -->
        <div style="padding:10px 0;border-bottom:1px solid #eee;margin-bottom:10px;width: 100%;">
          <strong>${evento?.nome || ""}</strong> — ${evento?.local || ""}
          <div style="font-size:12px;color:#666;">
            ${evento?.data || ""}
          </div>
        </div>
<div class="event-list-item margin-bottom-s u-shadow standard-gray-shadow js-pc-card" style="width: 100%">
   

${evento?.setores
  .map((setor: any) => {
    const tickets = [
      {
        id: `${setor.id}_MEIA`,
        nome: "MEIA ENTRADA",
        preco: setor.prices.meia,
      },
      {
        id: `${setor.id}_ITAU`,
        nome: "CLIENTE ITAÚ",
        preco: setor.prices.itau,
      },
      {
        id: `${setor.id}_INT`,
        nome: "INTEIRA",
        preco: setor.prices.inteira,
      },
    ];

    return `
      <div style="
        border-radius:18px;
        padding:16px;
        margin-bottom:16px;
        background:#fff;
        box-shadow:0 8px 22px rgba(0,0,0,0.06);
        widht
      ">

        <!-- HEADER -->
        <div style="
          display:flex;
          flex-direction:column;
          gap:6px;
          margin-bottom:12px;
        ">
          <div style="
            font-size:16px;
            font-weight:700;
          ">
            ${setor.nome}
          </div>

          <div style="
            font-size:13px;
            color:#666;
          ">
            A partir de <strong>R$ ${setor.prices.meia.toFixed(2)}</strong>
          </div>

          ${
            setor.highlight
              ? `<div style="
                  align-self:flex-start;
                  background:#ff9800;
                  color:#fff;
                  font-size:11px;
                  padding:3px 8px;
                  border-radius:20px;
                  font-weight:600;
                ">
                  MAIS VENDIDO
                </div>`
              : ""
          }
        </div>

        <!-- TICKETS -->
        <div style="
          display:flex;
          flex-direction:column;
          gap:10px;
        ">
          ${tickets
            .map(
              (ticket) => `
              <div style="
                border-radius:12px;
                background:#f8f9fb;
                padding:12px;
                display:flex;
                flex-direction:column;
                gap:8px;
              ">

                <!-- TOP -->
                <div style="
                  display:flex;
                  justify-content:space-between;
                  align-items:center;
                ">
                  <span style="
                    font-size:14px;
                    font-weight:600;
                  ">
                    ${ticket.nome}
                  </span>

                  <span style="
                    font-size:16px;
                    font-weight:700;
                    color:#111;
                  ">
                    R$ ${ticket.preco.toFixed(2)}
                  </span>
                </div>

                <!-- ACTION -->
                <div style="
                  display:flex;
                  justify-content:flex-end;
                ">
                  ${gerarTicketHTML(ticket)}
                </div>

              </div>
            `
            )
            .join("")}
        </div>

      </div>
    `;
  })
  .join("")}
</div>
  

      </form>
    </div>
  </div>
</div>

<!-- 🔥 SUMMARY FIXO -->
<div style="
  position:fixed;
  bottom:0;
  left:0;
  width:100%;
  background:#fff;
  border-top:1px solid #ddd;
  padding:14px 20px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  box-shadow:0 -4px 12px rgba(0,0,0,0.08);
  z-index:999;
">

  <div>
    <div class="js-stepper-quantity-display" style="
      font-size:14px;
      color:#666;
    ">
      0 Ingressos
    </div>

    <div class="js-stepper-sum-display" style="
      font-size:18px;
      font-weight:700;
      color:#111;
    ">
      R$ 0,00
    </div>
  </div>

  <button class="js-cc-submit-btn" disabled style="
    background:#0B74FF;
    color:#fff;
    border:none;
    padding:14px 22px;
    border-radius:10px;
    font-weight:600;
    cursor:pointer;
    opacity:0.5;
    transition:.2s;
  ">
    Continuar
  </button>

</div>
`;

  // LÓGICA STEP
  useEffect(() => {
    const interval = setInterval(() => {
      const plusButtons = document.querySelectorAll(".btn-stepper-right");
      const minusButtons = document.querySelectorAll(".btn-stepper-left");
      const amounts = document.querySelectorAll(".btn-stepper-amount");
      const items = document.querySelectorAll(".js-ticket-type-item");

      if (plusButtons.length === 0) return;
      clearInterval(interval);

      plusButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
          setSelectedId("ID_" + index);
          updateStepper(index);
        });
      });

      minusButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {
          if (selectedId === "ID_" + index) {
            setSelectedId(null);
            updateStepper(null);
          }
        });
      });

      function updateStepper(activeIndex: number | null) {
        items.forEach((item, i) => {
          const amt = amounts[i];
          const minus = minusButtons[i] as HTMLButtonElement;
          const plus = plusButtons[i] as HTMLButtonElement;

          const isActive = activeIndex === i;

          amt.textContent = isActive ? "1" : "0";
          minus.disabled = !isActive;
          plus.disabled = isActive;

          item.classList.toggle("ticket-selected", isActive);
        });

        const cta = document.querySelector(".js-cc-submit-btn") as HTMLButtonElement;
        const qty = document.querySelector(".js-stepper-quantity-display") as HTMLElement;
        const sum = document.querySelector(".js-stepper-sum-display") as HTMLElement;

        cta.style.opacity = activeIndex !== null ? "1" : "0.5";
        cta.style.pointerEvents = activeIndex !== null ? "auto" : "none";
        if (activeIndex !== null) {

          const allTickets = evento?.setores.flatMap((setor: any) => [
            {
              id: `${setor.id}_MEIA`,
              nome: "MEIA ENTRADA",
              preco: setor.prices.meia,
            },
            {
              id: `${setor.id}_ITAU`,
              nome: "CLIENTE ITAÚ",
              preco: setor.prices.itau,
            },
            {
              id: `${setor.id}_INT`,
              nome: "INTEIRA",
              preco: setor.prices.inteira,
            },
          ]);

          const ticket = allTickets[activeIndex];


          const valorFormatado = ticket.preco.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

          qty.textContent = `1 Ingresso`;
          sum.textContent = `R$ ${valorFormatado}`;

          cta.removeAttribute("disabled");

          cta.onclick = (e) => {
            e.preventDefault();

            const url =
              "/checkout?id=" +
              ticket.id +
              "&nome=" +
              encodeURIComponent(ticket.nome) +
              "&preco=" +
              ticket.preco +
              "&cidade=" +
              encodeURIComponent(evento?.nome || "") +
              "&setor=" +
              encodeURIComponent(selectedSector?.id || "");

            window.location.href = url;
          };
        } else {
          cta.setAttribute("disabled", "");

          qty.textContent = "0 Ingressos";
          sum.textContent = "R$ 0,00";
        }
      }

      if (selectedId) {
        const i = Number(selectedId.replace("ID_", ""));
        updateStepper(i);
      } else {
        updateStepper(null);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [selectedId, selectedSector, evento]);

  return <div dangerouslySetInnerHTML={{ __html: htmlForm }} />;
}