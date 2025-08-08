import MarqueeLine from "@/components/shared/marquee/MarqueeLine";
import TelegramCTA from "@/components/shared/telegramCTA/TelegramCTA";
import { fetchSanityDataServer } from "@/utils/fetchSanityData";
import { homepageCombinedQuery } from "@/lib/queries";
import Instagram from "@/components/shared/instagram/Instagram";
import { Suspense } from "react";
import Loader from "@/components/shared/loader/Loader";
import Bestsellers from "@/components/homePage/bestsellers/Bestsellers";
import PromotionalProducts from "@/components/homePage/promotionalProducts/PromotionalProducts";
import NewProducts from "@/components/homePage/newProducts/NewProducts";
import { Product } from "@/types/product";
import PromoBanner from "@/components/homePage/promoBanner/PromoBanner";
import { HomepageBanner } from "@/types/promoBanner";
import Container from "@/components/shared/container/Container";
import Hero from "@/components/homePage/hero/Hero";

export default async function HomePage() {
  const homePageData = await fetchSanityDataServer(homepageCombinedQuery);
  const allInstagramPosts = homePageData?.instagram;
  const allProducts = homePageData?.products;
  const heroBanners = homePageData?.heroBanners;
  const homePageBanners = homePageData?.homepageBanners;

  const promoBannerFirst = homePageBanners?.find(
    (banner: HomepageBanner) => banner.order === 1
  );

  const promoBannerSecond = homePageBanners?.find(
    (banner: HomepageBanner) => banner.order === 2
  );

  const bestsellers = allProducts?.filter(
    (product: Product) => product.isBestseller
  );

  const promotionalProducts = allProducts?.filter(
    (product: Product) => product.discountPrice
  );

  const newProducts = allProducts?.filter((product: Product) => product.isNew);

  return (
    <div className="pt-[85px] lg:pt-0">
      <Hero banners={heroBanners} />
      <MarqueeLine />
      <Suspense fallback={<Loader />}>
        <Bestsellers bestsellers={bestsellers} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <PromotionalProducts promotionalProducts={promotionalProducts} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Container className="md:flex gap-4">
          <PromoBanner banner={promoBannerFirst} />
          <PromoBanner banner={promoBannerSecond} className="hidden md:block" />
        </Container>
      </Suspense>
      <Suspense fallback={<Loader />}>
        <NewProducts newProducts={newProducts} />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Container>
          <PromoBanner banner={promoBannerSecond} className="md:hidden" />
        </Container>
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Instagram instagramPosts={allInstagramPosts?.posts} />
      </Suspense>
      <MarqueeLine />
      <TelegramCTA />
    </div>
  );
}
