"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AccessPage({ searchParams }: any) {
  const router = useRouter();
  const token = searchParams.token;

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
      return;
    }

    async function validate() {
      const res = await fetch("/api/auth/validate-token?token=" + token);
      const data = await res.json();

      if (data.ok) {
        localStorage.setItem("auth_customer", JSON.stringify(data.customer));
        router.push("/meus-pedidos");
      } else {
        alert("Link expirado ou inválido");
        router.push("/auth/login");
      }
    }

    validate();
  }, []);

  return <div>Validando acesso...</div>;
}
