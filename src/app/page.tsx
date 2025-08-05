import MarqueeLine from "@/components/shared/marquee/MarqueeLine";
import TelegramCTA from "@/components/shared/telegramCTA/TelegramCTA";
import { fetchSanityDataServer } from "@/utils/fetchSanityData";
import { allInstagramPostsQuery } from "@/lib/queries";
import Instagram from "@/components/shared/instagram/Instagram";
import { Suspense } from "react";
import Loader from "@/components/shared/loader/Loader";
import Bestsellers from "@/components/homePage/bestsellers/Bestsellers";
import PromotionalProducts from "@/components/homePage/promotionalProducts/PromotionalProducts";
import NewProducts from "@/components/homePage/newProducts/NewProducts";

export default async function HomePage() {
  const allInstagramPosts = await fetchSanityDataServer(allInstagramPostsQuery);

  return (
    <>
      <Bestsellers />
      <PromotionalProducts />
      <NewProducts />
      <Suspense fallback={<Loader />}>
        <Instagram instagramPosts={allInstagramPosts?.posts} />
      </Suspense>
      <MarqueeLine />
      <TelegramCTA />
    </>
  );
}
