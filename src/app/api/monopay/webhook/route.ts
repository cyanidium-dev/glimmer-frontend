import { NextRequest, NextResponse } from "next/server";
import { createVerify } from "crypto";
import axios from "axios";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;
const MONOPAY_PUBKEY = process.env.MONOPAY_PUBKEY!; // Base64 ECDSA pubkey

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text(); // Важливо: отримаємо тіло як рядок для перевірки підпису
    const signature = req.headers.get("x-sign");

    if (!signature) {
      return new NextResponse("Missing X-Sign header", { status: 400 });
    }

    // Перевірка підпису
    const verify = createVerify("SHA256");
    verify.write(rawBody);
    verify.end();

    const signatureBuf = Buffer.from(signature, "base64");
    const publicKeyBuf = Buffer.from(MONOPAY_PUBKEY, "base64");

    const isValid = verify.verify(publicKeyBuf, signatureBuf);

    if (!isValid) {
      return new NextResponse("Invalid signature", { status: 403 });
    }

    const data = JSON.parse(rawBody);

    if (data.status === "success") {
      const message = `✅ Оплата через MonoPay успішна!\nСума: ${data.finalAmount / 100} грн\nЗамовлення: #${data.reference}`;

      await axios({
        method: "post",
        url: `${SITE_URL}api/telegram`,
        data: message,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return NextResponse.json({ ok: true, status: data.status });
  } catch (error) {
    console.error("Webhook error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
