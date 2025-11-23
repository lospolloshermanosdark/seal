import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Logo Eventim (oficial branco)
const EVENTIM_LOGO =
  "https://res.cloudinary.com/dwzxp5mdz/image/upload/v1763884679/logo_01_new_1_pnco7t.png";

// Textura azul escura Eventim
const EVENTIM_BG =
  "https://res.cloudinary.com/dwzxp5mdz/image/upload/v1732917348/eventim_bg_dark_vg9pzm.png";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("order");

    if (!orderId)
      return NextResponse.json({ error: "missing order" }, { status: 400 });

    // Buscar order
    const { data: order } = await supabaseAdmin
      .from("orders")
      .select("*, customers(*)")
      .eq("id", orderId)
      .single();

    if (!order)
      return NextResponse.json({ error: "Order not found" }, { status: 404 });

    // Dados
    const customerName = order.customers?.name || "Cliente";
    const orderNumber = order.external_ref;
    const productName = order.title;
    const totalAmount = (order.amount / 100).toFixed(2).replace(".", ",");

    // Criar PDF (formato de ingresso vertical Eventim)
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([600, 1100]);

    // CORES EVENTIM
    const eventimBlue = rgb(0.05, 0.11, 0.40);
    const eventimYellow = rgb(1, 0.8, 0.05);
    const white = rgb(1, 1, 1);

    // FUNDO - Azul texturizado
    try {
      const bgReq = await fetch(EVENTIM_BG);
      const bgBuf = await bgReq.arrayBuffer();
      const bgImg = await pdf.embedPng(bgBuf);

      page.drawImage(bgImg, {
        x: 0,
        y: 0,
        width: 600,
        height: 1100,
        opacity: 1,
      });
    } catch {
      // fallback azul sólido
      page.drawRectangle({
        x: 0,
        y: 0,
        width: 600,
        height: 1100,
        color: eventimBlue,
      });
    }

    // LOGO EVENTIM
    const logoReq = await fetch(EVENTIM_LOGO);
    const logoBuf = await logoReq.arrayBuffer();
    const logoImg = await pdf.embedPng(logoBuf);

    page.drawImage(logoImg, {
      x: 190,
      y: 960,
      width: 220,
      height: 80,
    });

    // Faixa amarela premium
    page.drawRectangle({
      x: 0,
      y: 920,
      width: 600,
      height: 6,
      color: eventimYellow,
    });

    // Fonts
    const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);
    const fontThin = await pdf.embedFont(StandardFonts.Helvetica);

    // Cabeçalho do ingresso
    page.drawText("INGRESSO OFICIAL", {
      x: 60,
      y: 880,
      size: 20,
      color: eventimYellow,
      font: fontBold,
    });

    page.drawText("EVENTIM • ACESSO DIGITAL", {
      x: 60,
      y: 850,
      size: 14,
      color: white,
      font: fontThin,
    });

    // Informações do ingresso
    const infoY = 780;

    const lines = [
      { label: "Nome:", value: customerName },
      { label: "Pedido:", value: orderNumber },
      { label: "Ingresso:", value: productName },
      { label: "Valor Pago:", value: `R$ ${totalAmount}` },
    ];

    let y = infoY;
    lines.forEach((l) => {
      page.drawText(l.label, {
        x: 60,
        y,
        size: 12,
        color: eventimYellow,
        font: fontBold,
      });

      page.drawText(l.value, {
        x: 160,
        y,
        size: 14,
        color: white,
        font: fontThin,
      });

      y -= 35;
    });

    // QR CODE
    const qrData = await QRCode.toDataURL(orderNumber);
    const qrBytes = Buffer.from(qrData.split(",")[1], "base64");
    const qrImg = await pdf.embedPng(qrBytes);

    // Moldura branca premium
    page.drawRectangle({
      x: 170,
      y: 430,
      width: 260,
      height: 260,
      color: white,
      opacity: 0.15,
    });

    page.drawImage(qrImg, {
      x: 200,
      y: 460,
      width: 200,
      height: 200,
    });

    // Rodapé
    page.drawText("• Apresente este ingresso na entrada do evento.", {
      x: 60,
      y: 330,
      size: 11,
      color: white,
      font: fontThin,
    });

    page.drawText("• Documento oficial com foto é obrigatório.", {
      x: 60,
      y: 310,
      size: 11,
      color: white,
      font: fontThin,
    });

    page.drawText("Eventim Ingressos — 2026", {
      x: 60,
      y: 280,
      size: 13,
      color: eventimYellow,
      font: fontBold,
    });

    // Exportar PDF
    const pdfBytes = await pdf.save();

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="ticket-${orderNumber}.pdf"`,
      },
    });
  } catch (err) {
    console.error("PDF ERROR:", err);
    return NextResponse.json({ error: "PDF error" }, { status: 500 });
  }
}
