"use client";

import { useEffect } from "react";

export function Accordion() {
  const html = `
<div style="
    padding: 23px 26px;
" class="card card-default-text info-accordion js-accordion standard-gray-shadow margin-bottom-s">

  <div class="info-accordion-section theme-element-border js-accordion-slide">
    <div class="info-accordion-item js-accordion-trigger" aria-expanded="false" role="button" tabindex="0">
      <div class="info-accordion-name">
        <div class="u-flex u-flex-justify-between">
          <h2 class="headline3 no-margin">Informações sobre seleção de ingressos</h2>
          <div class="info-accordion-icon">
            <i class="icon icon-expand-less" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="info-accordion-content js-accordion-content" style="display:none;">
      <h4 class="modal-title">Informações sobre seleção de ingressos</h4>
      <hr class="modal-horizontal-dividing">

      <div class="modal-description">
        <h5 class="modal-subtitle">Melhores Assentos</h5>
        <p>De acordo com o setor e número de ingressos selecionados inicialmente, o “Melhores Assentos” escolhe automaticamente as melhores opções disponíveis para o seu evento.</p>
      </div>

      <div class="modal-description">
        <h5 class="modal-subtitle">Mapa de Assentos</h5>
        <p>No “Mapa de Assentos”, você pode selecionar exatamente a localização do ingresso desejado dentro das opções disponíveis.</p>
      </div>

      <div class="modal-description">
        <h5 class="modal-subtitle">Esgotado no momento</h5>
        <p>Se um evento, preço ou setor estiver marcado como "esgotado no momento", significa que todos os ingressos daquele setor foram vendidos ou estão em processo de compra.</p>
      </div>

      <div class="modal-description">
        <h5 class="modal-subtitle">Entrega indisponível</h5>
        <p>A opção “Entrega em Domicílio” não estará disponível caso você realize a compra poucos dias antes do evento acontecer.</p>
      </div>

      <div class="modal-description">
        <h5 class="modal-subtitle">Apenas assentos avulsos disponíveis</h5>
        <p>Somente assentos avulsos estão disponíveis no setor selecionado.</p>
      </div>

      <div class="modal-description">
        <h5 class="modal-subtitle">Promocionais</h5>
        <p>Fique atento caso você comprar um ingresso promocional, para saber o tipo de comprovação necessária.</p>
      </div>
    </div>
  </div>

  <div class="info-accordion-section theme-element-border js-accordion-slide">
    <div class="info-accordion-item js-accordion-trigger" aria-expanded="false" role="button" tabindex="0">
      <div class="info-accordion-name">
        <div class="u-flex u-flex-justify-between">
          <h2 class="headline3 no-margin">Informações sobre o promotor</h2>
          <div class="info-accordion-icon">
            <i class="icon icon-expand-less" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="info-accordion-content js-accordion-content" style="display:none;">
      <div class="headline3">Atenção:</div>
      <p class="paragraph">
        A EVENTIM Brasil não promove ou organiza eventos, mas vende ingressos para produtores.
      </p>

      <div class="headline3">Promotor:</div>
      <p class="paragraph">
        Fundação Clovis Salgado - 17.498.205/0001-41, Avenida Afonso Pena, 1537 - CENTRO, Belo Horizonte, Brasil<br>
        <span>Tax number: 17.498.205/0001-41</span>
      </p>
    </div>
  </div>

</div>
`;

  // -----------------------------------------------------
  // JS do Accordion — idêntico ao comportamento Eventim
  // -----------------------------------------------------
  useEffect(() => {
    const triggers = document.querySelectorAll(".js-accordion-trigger");

    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const isOpen = trigger.getAttribute("aria-expanded") === "true";
        const content = trigger.nextElementSibling as HTMLElement;
        const icon = trigger.querySelector(".info-accordion-icon i");

        // Fecha todos
        document.querySelectorAll(".js-accordion-trigger").forEach((t) => {
          t.setAttribute("aria-expanded", "false");
        });

        document.querySelectorAll(".js-accordion-content").forEach((c) => {
          (c as HTMLElement).style.maxHeight = "0px";
          (c as HTMLElement).style.display = "none";
        });

        document.querySelectorAll(".info-accordion-icon i").forEach((i) => {
          i.classList.remove("rotate-180");
        });

        // Se clicou o que já estava aberto → fecha e para
        if (isOpen) return;

        // Abrir o clicado
        trigger.setAttribute("aria-expanded", "true");

        if (content) {
          content.style.display = "block";

          setTimeout(() => {
            content.style.maxHeight = content.scrollHeight + "px";
          }, 15);
        }

        if (icon) {
          icon.classList.add("rotate-180");
        }
      });
    });
  }, []);

  // CSS da animação — você pode mover para seu CSS global se quiser
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .js-accordion-content {
        overflow: hidden;
        transition: max-height 0.35s ease, opacity 0.25s ease;
        opacity: 1;
      }

      .rotate-180 {
        transform: rotate(180deg);
        transition: transform .25s ease;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
