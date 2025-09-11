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
      amount: body.amount, // у копійках
      ccy: 980, // UAH
      merchantPaymInfo: {
        reference: body.orderNumber,
        basketOrder: body.basketOrder,
        destination: "Покупка товару",
        comment: "Покупка товару",
      },
      redirectUrl: `${SITE_URL}/confirmation`,
      webHookUrl: `${SITE_URL}/api/monopay/webhook`,
      validity: 3600,
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

    const data = await response.json();

    if (!response.ok || !data.pageUrl) {
      return NextResponse.json({ error: data }, { status: response.status });
    }

    // Повертаємо HTML з формою для POST на Monobank
    const html = `
      <html>
        <body>
          <form id="monopayForm" action="${data.pageUrl}" method="POST"></form>
          <script>document.getElementById('monopayForm').submit();</script>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("Monopay error:", error);
    return NextResponse.json(
      { error: "Помилка при створенні рахунку" },
      { status: 500 }
    );
  }
}
