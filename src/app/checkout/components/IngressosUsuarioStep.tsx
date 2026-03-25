"use client";

import { useEffect, useState } from "react";

type Props = {
  onNext: () => void;
};

function parseDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-");
  return new Date(Number(y), Number(m) - 1, Number(d));
}

export default function IngressosUsuarioStep({ onNext }: Props) {
  const [cart, setCart] = useState<any>(null);
  const [customer, setCustomer] = useState<any>(null);

  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [useBuyerData, setUseBuyerData] = useState<boolean[]>([]);

  // 🔥 CARREGA CART + CUSTOMER
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedCustomer = localStorage.getItem("customer");

    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);

      // cria lista baseada na quantidade
      const quantidade = parsedCart.quantity || 1;

      setUsuarios(
        Array.from({ length: quantidade }, () => ({
          nome: "",
          email: "",
        }))
      );

      setUseBuyerData(Array.from({ length: quantidade }, () => false));
    }

    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer));
    }
  }, []);

  if (!cart) {
    return <p style={{ padding: 20 }}>Carregando...</p>;
  }

  const updateField = (index: number, field: "nome" | "email", value: string) => {
    const updated = [...usuarios];
    updated[index][field] = value;
    setUsuarios(updated);
  };

  const handleCheckbox = (index: number, checked: boolean) => {
    const updatedChecks = [...useBuyerData];
    updatedChecks[index] = checked;
    setUseBuyerData(updatedChecks);

    const updatedUsuarios = [...usuarios];

    if (checked && customer) {
      updatedUsuarios[index] = {
        nome: `${customer.firstName} ${customer.lastName}`,
        email: customer.email,
      };
    } else {
      updatedUsuarios[index] = {
        nome: "",
        email: "",
      };
    }

    setUsuarios(updatedUsuarios);
  };

  return (
    <div className="seal-container">

      {/* HEADER */}
      <div className="seal-header">
        <h2>Atribuição de ingressos</h2>
        <p>{cart.quantity} ingresso{cart.quantity > 1 && "s"}</p>
      </div>

      {/* LISTA */}
      {usuarios.map((_, index) => {

        return (
          <div key={index} className="seal-card">

            {/* DATA (fixo ou depois você pode puxar do evento) */}
            <div className="seal-date">
              <span className="day">26</span>
              <span className="month">nov</span>
            </div>

            {/* CONTEÚDO */}
            <div className="seal-content">

              <div className="seal-info">
                <strong>{cart.setor}</strong>
                <span>
                  {cart.nome} • R$ {cart.preco.toFixed(2)}
                </span>
              </div>

              {/* INPUT EMAIL */}
              <input
                placeholder="Email do participante"
                value={usuarios[index]?.email || ""}
                onChange={(e) =>
                  updateField(index, "email", e.target.value)
                }
                disabled={useBuyerData[index]}
                className="seal-input"
              />

              <p className="seal-note">
                O destinatário não pode ser o mesmo email do comprador.
              </p>

              {/* CHECKBOX */}
              <label 

              className="seal-checkbox">
                <input
                  type="checkbox"
                  checked={useBuyerData[index]}
                  onChange={(e) =>
                    handleCheckbox(index, e.target.checked)
                  }
                />
                Este ingresso é para mim
              </label>

            </div>
          </div>
        );
      })}

    

      {/* CSS */}
      <style>{`
        .seal-container {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
        }

        .seal-header h2 {
          font-size: 18px;
          font-weight: bold;
        }

        .seal-header p {
          font-size: 13px;
          color: #666;
          margin-top: 4px;
        }

        .seal-card {
          display: flex;
          gap: 15px;
          border: 1px solid #e5e5e5;
          border-radius: 10px;
          padding: 15px;
          margin-top: 15px;
        }

        .seal-date {
          background: #f5f5f5;
          border-radius: 8px;
          padding: 10px;
          text-align: center;
          min-width: 60px;
        }

        .seal-date .day {
          font-size: 20px;
          font-weight: bold;
          display: block;
        }

        .seal-date .month {
          font-size: 12px;
          color: #777;
        }

        .seal-content {
          flex: 1;
        }

        .seal-info strong {
          display: block;
        }

        .seal-info span {
          font-size: 13px;
          color: #666;
        }

        .seal-input {
          width: 100%;
          margin-top: 10px;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        .seal-input:focus {
          border-color: #000;
        }

        .seal-note {
          font-size: 12px;
          color: #777;
          margin-top: 5px;
        }

        .seal-checkbox {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          margin-top: 8px;
          color: #1d64b4
        }

        .seal-btn {
          width: 100%;
          margin-top: 20px;
          padding: 14px;
          background: #000;
          color: #fff;
          border-radius: 8px;
          border: none;
          font-weight: bold;
          cursor: pointer;
        }

        .seal-btn:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
}