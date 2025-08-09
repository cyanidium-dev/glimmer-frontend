import MarqueeLine from "@/components/shared/marquee/MarqueeLine";
import TelegramCTA from "@/components/shared/telegramCTA/TelegramCTA";
import {
  allDiscountedProductsQuery,
  allProductsByCategoryQuery,
} from "@/lib/queries";
import { fetchSanityDataServer } from "@/utils/fetchSanityData";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  const res =
    category === "promo"
      ? await fetchSanityDataServer(allDiscountedProductsQuery)
      : await fetchSanityDataServer(allProductsByCategoryQuery, {
          categorySlug: category,
        });

  console.log(res);

  return (
    <div className="pt-[85px]">
      <MarqueeLine />
      <TelegramCTA />
    </div>
  );
}
