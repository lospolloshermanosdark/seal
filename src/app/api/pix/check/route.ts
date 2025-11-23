import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const txId = url.searchParams.get("id");

    if (!txId) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const PUBLIC_KEY = process.env.PAYLOOP_PUBLIC_KEY!;
    const SECRET_KEY = process.env.PAYLOOP_SECRET_KEY!;

    const credentials = Buffer.from(`${PUBLIC_KEY}:${SECRET_KEY}`).toString("base64");

    const res = await fetch(`https://api.pagloop.com/v1/transactions/${txId}`, {
      method: "GET",
      headers: {
        "Authorization": `Basic ${credentials}`,
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();

    return NextResponse.json({
      id: data.id,
      status: data.status,
      paid: data.status === "paid",
      amount: data.amount,
      paidAmount: data.paidAmount,
    });

  } catch (e) {
    console.error("CHECK ERROR:", e);
    return NextResponse.json({ error: true }, { status: 500 });
  }
}
