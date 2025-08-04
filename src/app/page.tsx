import MarqueeLine from "@/components/shared/marquee/MarqueeLine";
import TelegramCTA from "@/components/shared/telegramCTA/TelegramCTA";
import { fetchSanityData } from "@/utils/fetchSanityData";
import { allInstagramPostsQuery } from "@/lib/queries";
import Instagram from "@/components/homePage/instagram/Instagram";
import { Suspense } from "react";
import Loader from "@/components/shared/loader/Loader";

export default async function HomePage() {
  const allInstagramPosts = await fetchSanityData(allInstagramPostsQuery);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Instagram instagramPosts={allInstagramPosts?.posts} />
      </Suspense>
      <MarqueeLine />
      <TelegramCTA />
    </>
  );
}
