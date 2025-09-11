import { NextResponse } from "next/server";

const MONOPAY_TOKEN = process.env.MONOPAY_TOKEN!;

export async function GET() {
  try {
    const response = await fetch(
      "https://api.monobank.ua/api/merchant/pubkey",
      {
        headers: {
          "X-Token": MONOPAY_TOKEN,
        },
        cache: "no-store", // щоб завжди брати свіжі дані
      }
    );

    if (!response.ok) {
      throw new Error(`Monobank error: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({ pubkey: data.key });
  } catch (error) {
    console.error("Failed to fetch pubkey:", error);
    return new NextResponse("Error fetching pubkey", { status: 500 });
  }
}
