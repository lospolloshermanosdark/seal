"use client";

import { useEffect, useState } from "react";
import HeaderCheckout from "@/app/checkout/components/HeaderCheckout";
import FooterEventim from "@/app/checkout/components/FooterEventim";

import "./meus-pedidos.css";

export default function MeusPedidosPage() {
    const [loading, setLoading] = useState(true);
    const [customer, setCustomer] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("auth_customer");

        if (!saved) {
            window.location.href = "/auth/login";
            return;
        }

        const parsed = JSON.parse(saved);
        setCustomer(parsed);

        async function loadOrders() {
            const res = await fetch("/api/orders?customer_id=" + parsed.id);
            const data = await res.json();

            setOrders(data.orders || []);
            setLoading(false);
        }

        loadOrders();
    }, []);

    if (loading) {
        return (
            <div className="mp-loading">
                <p>Carregando seus pedidos...</p>
            </div>
        );
    }

    return (
        <div className="mp-container">
            <link rel="stylesheet" href="/eventim/css/patterns.css" />
            <link rel="stylesheet" href="/eventim/css/checkout.css" />

            <HeaderCheckout />

            <div className="mp-wrapper">
                <h1 className="mp-title">Meus Pedidos</h1>
                <p className="mp-subtitle">
                    Olá, <strong>{customer.name}</strong>. Aqui estão seus ingressos e pedidos.
                </p>

                {orders.length === 0 && (
                    <p className="mp-empty">Você ainda não possui pedidos.</p>
                )}

                <div className="mp-list">
                    {orders
                        .filter((o) => o.payment_status === "paid")
                        .map((order) => (
                            <div className="mp-card" key={order.id}>
                                <div className="mp-card-header">
                                    <h3 className="mp-order-id">Pedido {order.external_ref}</h3>

                                    <span
                                        className={
                                            "mp-status " +
                                            (order.payment_status === "paid"
                                                ? "mp-paid"
                                                : "mp-pending")
                                        }
                                    >
                                        {order.payment_status === "paid"
                                            ? "Pago"
                                            : "Aguardando pagamento"}
                                    </span>
                                </div>

                                <p className="mp-item">
                                    <strong>Ingresso:</strong> {order.title}
                                </p>

                                <p className="mp-item">
                                    <strong>Valor:</strong> R${" "}
                                    {(order.amount / 100).toFixed(2).replace(".", ",")}
                                </p>

                                {order.payment_status === "paid" ? (
                                    <button
                                        className="mp-button"
                                        onClick={() =>
                                            window.open(`/api/ticket/pdf?order=${order.id}`, "_blank")
                                        }
                                    >
                                        Baixar Ingresso (PDF)
                                    </button>

                                ) : (
                                    <button
                                        className="mp-button mp-pay"
                                        onClick={() =>
                                        (window.location.href =
                                            "/checkout/pay?externalRef=" + order.external_ref)
                                        }
                                    >
                                        Finalizar pagamento
                                    </button>
                                )}
                            </div>
                        ))}
                </div>
            </div>

            <FooterEventim />
        </div>
    );
}
