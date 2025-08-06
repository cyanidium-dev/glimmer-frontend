import MarqueeLine from "@/components/shared/marquee/MarqueeLine";
import TelegramCTA from "@/components/shared/telegramCTA/TelegramCTA";
import { fetchSanityDataServer } from "@/utils/fetchSanityData";
import { allInstagramPostsQuery, allProductsQuery } from "@/lib/queries";
import Instagram from "@/components/shared/instagram/Instagram";
import { Suspense } from "react";
import Loader from "@/components/shared/loader/Loader";
import Bestsellers from "@/components/homePage/bestsellers/Bestsellers";
import PromotionalProducts from "@/components/homePage/promotionalProducts/PromotionalProducts";
import NewProducts from "@/components/homePage/newProducts/NewProducts";
import { Product } from "@/types/product";

export default async function HomePage() {
  const allInstagramPosts = await fetchSanityDataServer(allInstagramPostsQuery);
  const allProducts = await fetchSanityDataServer(allProductsQuery);

  const bestsellers = allProducts?.filter(
    (product: Product) => product.isBestseller
  );

  const promotionalProducts = allProducts?.filter(
    (product: Product) => product.discountPrice
  );

  const newProducts = allProducts?.filter((product: Product) => product.isNew);

  return (
    <>
      <MarqueeLine />
      <Suspense fallback={<Loader />}>
        <Bestsellers bestsellers={bestsellers} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <PromotionalProducts promotionalProducts={promotionalProducts} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <NewProducts newProducts={newProducts} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Instagram instagramPosts={allInstagramPosts?.posts} />
      </Suspense>
      <MarqueeLine />
      <TelegramCTA />
    </>
  );
}
