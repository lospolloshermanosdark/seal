// src/app/utils/setores.ts

const MAX_PRICE = 990;

function capPrice(price: number) {
  return Math.min(price, MAX_PRICE);
}

export const eventosSeal = {
  "rio-de-janeiro": {
    nome: "Rio de Janeiro",
    local: "Qualistage",
    data: "26/11/2026",

    setores: [
      {
        id: "pista",
        nome: "Pista",
        prices: {
          meia: capPrice(297.5),
          itau: capPrice(505.75),
          inteira: capPrice(595),
        },
      },
      {
        id: "poltronas",
        nome: "Poltronas",
        prices: {
          meia: capPrice(197.5),
          itau: capPrice(335.75),
          inteira: capPrice(395),
        },
      },
      {
        id: "pista-premium",
        nome: "Pista Premium",
        highlight: true,
        prices: {
          meia: capPrice(497.5),
          itau: capPrice(815.75),
          inteira: capPrice(995), // 🔥 vira 990
        },
      },
      {
        id: "camarote-a",
        nome: "Camarote A",
        prices: {
          meia: capPrice(647.5),
          itau: capPrice(880), // 🔥 vira 990
          inteira: capPrice(1295), // 🔥 vira 990
        },
      },
    ],
  },

  "sao-paulo": {
    nome: "São Paulo",
    local: "Allianz Parque",
    data: "28/11/2026",

    setores: [
      {
        id: "cadeira-superior",
        nome: "Cadeira Superior",
        prices: {
          meia: capPrice(172.5),
          itau: capPrice(293.25),
          inteira: capPrice(345),
        },
      },
      {
        id: "cadeira-gold",
        nome: "Cadeira Gold",
        prices: {
          meia: capPrice(347.5),
          itau: capPrice(590.75),
          inteira: capPrice(695),
        },
      },
      {
        id: "cadeira-diamond",
        nome: "Cadeira Diamond",
        highlight: true,
        prices: {
          meia: capPrice(445),
          itau: capPrice(769),
          inteira: capPrice(890), // 🔥 vira 990
        },
      },
      {
        id: "cadeira-vip",
        nome: "Cadeira VIP",
        highlight: true,
        prices: {
          meia: capPrice(495),
          itau: capPrice(890), // 🔥 vira 990
          inteira: capPrice(1795), // 🔥 vira 990
        },
      },
    ],
  },
};