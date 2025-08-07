import { HomepageBanner } from "@/types/promoBanner";
import Image from "next/image";

interface PromoBanner {
  banner: HomepageBanner;
  className?: string;
}

export default function PromoBanner({ banner, className = "" }: PromoBanner) {
  const { imageSmall, imageLarge } = banner;

  return (
    <div className={`${className} md:w-[calc(50%-8px)]`}>
      <Image
        src={imageSmall}
        alt="promo banner"
        width={320}
        height={268}
        className="w-full h-auto xs:hidden"
      />
      <Image
        src={imageLarge}
        alt="promo banner"
        width={320}
        height={268}
        className="w-full h-auto hidden xs:block"
      />
    </div>
  );
}
