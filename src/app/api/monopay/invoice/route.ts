import { NextRequest, NextResponse } from "next/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const MONOPAY_TOKEN = process.env.MONOPAY_TOKEN;
const MONOBANK_API_URL = "https://api.monobank.ua/api/merchant/invoice/create";

export async function POST(req: NextRequest) {
  if (!MONOPAY_TOKEN) {
    throw new Error("MERCHANT_SECRET_KEY не визначено в середовищі!");
  }

  try {
    const body = await req.json();

    const invoicePayload = {
      amount: body.amount, // у копійках: 10000 = 100 грн
      ccy: 980, // UAH
      merchantPaymInfo: {
        reference: body.orderNumber,
        basketOrder: body.basketOrder,
        destination: "Покупка товару",
        comment: "Покупка товару",
      },
      redirectUrl: `${SITE_URL}/confirmation`,
      webHookUrl: `${SITE_URL}/api/monopay/webhook`,
      validity: 3600, // 1 година
      paymentType: "debit",
    };

    const response = await fetch(MONOBANK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Token": MONOPAY_TOKEN!,
      },
      body: JSON.stringify(invoicePayload),
    });

    // const data = await response.json();

    const raw = await response.text();
    let data;
    try {
      data = JSON.parse(raw);
    } catch (err) {
      alert(err);
      console.error("Invalid JSON from Monobank:", raw);
      return NextResponse.json(
        { error: "Invalid response from Monobank" },
        { status: 500 }
      );
    }

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: response.status });
    }

    return NextResponse.json({ pageUrl: data.pageUrl }); // URL куди переадресовувати
  } catch (error) {
    console.error("Monopay error:", error);
    return NextResponse.json(
      { error: "Помилка при створенні рахунку" },
      { status: 500 }
    );
  }
}
