"use client";

import { useState } from "react";
import "./login.css";
import HeaderCheckout from "@/app/checkout/components/HeaderCheckout";
import FooterEventim from "@/app/checkout/components/FooterEventim";

export default function LoginPage() {
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async (e: any) => {
  e.preventDefault();
  setLoading(true);

  const cleanCPF = cpf.replace(/\D/g, "");

  const res = await fetch("/api/auth/send-link", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cpf: cleanCPF, email }),
  });

  const data = await res.json();

  setLoading(false);

  if (data.ok) {
    alert("Link enviado com sucesso! Verifique seu e-mail.");
  } else {
    alert(data.error || "Erro ao enviar link.");
  }
};

  function maskCPF(value: string) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  }


  return (
    <div className="login-container">
      <link rel="stylesheet" href="/eventim/css/patterns.css" />
      <link rel="stylesheet" href="/eventim/css/checkout.css" />

      <HeaderCheckout />

      <main className="login-wrapper">
        <section className="login-card" role="form" aria-label="Formulário de acesso">
          <h1 className="login-title">Acesse sua conta</h1>
          <p className="login-subtitle">Use seu CPF e e-mail para entrar com segurança.</p>

          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="cpf-input">CPF</label>
            <input
              id="cpf-input"
              type="text"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(maskCPF(e.target.value))}
              aria-required="true"
            />

            <label htmlFor="email-input">E-mail</label>
            <input
              id="email-input"
              type="email"
              placeholder="seuemail@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-required="true"
            />

     <button
  type="submit"
  className={`login-button ${loading ? "loading" : ""}`}
  aria-label="Enviar link de acesso para o e-mail informado"
>
  {loading ? <div className="login-spinner"></div> : "Enviar link de acesso"}
</button>


            <p className="login-info">
              Você receberá um link seguro no e-mail informado.
            </p>
          </form>
        </section>
      </main>

      <FooterEventim />
    </div>
  );
}
