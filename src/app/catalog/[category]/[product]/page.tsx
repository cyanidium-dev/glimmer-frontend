import RecommendedProducts from "@/components/productPage/RecommendedProducts";
import ReviewedProducts from "@/components/productPage/ReviewedProducts";
import MarqueeLine from "@/components/shared/marquee/MarqueeLine";
import TelegramCTA from "@/components/shared/telegramCTA/TelegramCTA";
import { fetchSanityDataServer } from "@/utils/fetchSanityData";
import { productBySlugQuery } from "@/lib/queries";
import ProductInfo from "@/components/productPage/ProductInfo";

interface ProductPageProps {
  params: Promise<{ category: string; product: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product, category } = await params;

  const currentProduct = await fetchSanityDataServer(productBySlugQuery, {
    productSlug: product,
  });

  return (
    <div className="pt-[85px]">
      <ProductInfo currentProduct={currentProduct} />
      <RecommendedProducts />
      <ReviewedProducts />
      <MarqueeLine />
      <TelegramCTA />
    </div>
  );
}
