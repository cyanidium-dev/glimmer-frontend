import MarqueeLine from "@/components/shared/marquee/MarqueeLine";
import TelegramCTA from "@/components/shared/telegramCTA/TelegramCTA";

interface ProductPageProps {
  params: Promise<{ category: string; product: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product, category } = await params;

  return (
    <div className="pt-[85px]">
      <MarqueeLine />
      <TelegramCTA />
    </div>
  );
}
