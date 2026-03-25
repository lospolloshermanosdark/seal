"use client";

import { useState } from "react";

type Sector = {
  id: string;
  title: string;
  items: string[];
  price: string;
};

const sectors: Sector[] = [
  {
    id: "a",
    title: "Setor A / Largada",
    items: [
      "Visão do grid de largada",
      "Arquibancada premium coberta",
      "Assentos numerados",
      "Incluso finger food e open bar",
      "Acesso à Fanzone",
      "Telão",
    ],
    price: "PREÇO ÚNICO: R$ 3.500,00",
  },
  {
    id: "b",
    title: "Setor B / Reta",
    items: [
      "Localizado na reta principal",
      "Arquibancada descoberta",
      "Acesso à Fanzone",
      "Telão",
    ],
    price: "A partir de R$ 445,00",
  },
];

export default function SectorList() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="sector-list">
      {sectors.map((sector) => {
        const isOpen = openId === sector.id;

        return (
          <div key={sector.id} className="sector-card">
            
            {/* HEADER */}
            <div className="sector-header">
              <h3>{sector.title}</h3>

              <button
                onClick={() => toggle(sector.id)}
                className="sector-toggle"
              >
                <i
                  className={`fa ${
                    isOpen ? "fa-caret-down" : "fa-caret-right"
                  }`}
                />
              </button>
            </div>

            {/* COLLAPSE */}
            <div className={`sector-collapse ${isOpen ? "open" : ""}`}>
              <div className="sector-content">
                <ul>
                  {sector.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>

                <p className="sector-price">{sector.price}</p>

                <button className="sector-button">
                  Garantir meu ingresso
                </button>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}