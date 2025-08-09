import RecommendedProducts from "@/components/productPage/RecommendedProducts";
import ReviewedProducts from "@/components/productPage/ReviewedProducts";
import MarqueeLine from "@/components/shared/marquee/MarqueeLine";
import TelegramCTA from "@/components/shared/telegramCTA/TelegramCTA";
import { fetchSanityDataServer } from "@/utils/fetchSanityData";
import { productBySlugQuery } from "@/lib/queries";
import ProductInfo from "@/components/productPage/ProductInfo";
import type { Metadata } from "next";
import { getDefaultMetadata } from "@/utils/getDefaultMetadata";

interface ProductPageProps {
  params: Promise<{ category: string; product: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { product } = await params;

  const currentProduct = await fetchSanityDataServer(productBySlugQuery, {
    productSlug: product,
  });

  const currentPrice =
    currentProduct?.discountPrice &&
    currentProduct?.discountPrice < currentProduct?.price
      ? currentProduct?.discountPrice
      : currentProduct?.price;

  return {
    title:
      `${currentProduct?.title}, ${currentProduct?.author}. Купити книгу за ${currentPrice} грн` ||
      getDefaultMetadata().title,
    description:
      currentProduct?.description || getDefaultMetadata().description,
    openGraph: {
      images: [
        {
          url: currentProduct?.mainImage || "/opengraph-image.jpg",
          width: 1200,
          height: 630,
          alt: "Glimmer",
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { product } = await params;

  const currentProduct = await fetchSanityDataServer(productBySlugQuery, {
    productSlug: product,
  });

  if (!currentProduct) return null;

  return (
    <div className="pt-[85px]">
      <ProductInfo currentProduct={currentProduct} />
      <RecommendedProducts
        currentSlug={product}
        genreSlug={currentProduct?.genreSlug}
      />
      <ReviewedProducts />
      <MarqueeLine />
      <TelegramCTA />
    </div>
  );
}
