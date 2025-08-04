import MarqueeLine from "@/components/shared/marquee/MarqueeLine";
import TelegramCTA from "@/components/shared/telegramCTA/TelegramCTA";
import { fetchSanityData } from "@/utils/fetchSanityData";
import { allInstagramPostsQuery } from "@/lib/queries";
import Instagram from "@/components/homePage/instagram/Instagram";
import { Suspense } from "react";

export default async function HomePage() {
  const allInstagramPosts = await fetchSanityData(allInstagramPostsQuery);

  return (
    <>
      <Suspense>
        <Instagram instagramPosts={allInstagramPosts.posts} />
      </Suspense>
      <MarqueeLine />
      <TelegramCTA />
    </>
  );
}
