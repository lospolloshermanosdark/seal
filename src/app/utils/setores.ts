// src/app/utils/setores.ts

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
          meia: 297.5,
          itau: 505.75,
          inteira: 595,
        },
      },
      {
        id: "poltronas",
        nome: "Poltronas",
        prices: {
          meia: 197.5,
          itau: 335.75,
          inteira: 395,
        },
      },
      {
        id: "pista-premium",
        nome: "Pista Premium",
        highlight: true,
        prices: {
          meia: 497.5,
          itau: 845.75,
          inteira: 995,
        },
      },
      {
        id: "camarote-a",
        nome: "Camarote A",
        prices: {
          meia: 647.5,
          itau: 1100.75,
          inteira: 1295,
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
          meia: 172.5,
          itau: 293.25,
          inteira: 345,
        },
      },
      {
        id: "cadeira-gold",
        nome: "Cadeira Gold",
        prices: {
          meia: 347.5,
          itau: 590.75,
          inteira: 695,
        },
      },
      {
        id: "cadeira-diamond",
        nome: "Cadeira Diamond",
        highlight: true,
        prices: {
          meia: 547.5,
          itau: 930.75,
          inteira: 1095,
        },
      },
      {
        id: "cadeira-vip",
        nome: "Cadeira VIP",
        highlight: true,
        prices: {
          meia: 897.5,
          itau: 1525.75,
          inteira: 1795,
        },
      },
    ],
  },
};