"use client";
import { HomepageBanner } from "@/types/promoBanner";
import Image from "next/image";
import Link from "next/link";

interface PromoBanner {
  banner: HomepageBanner;
  className?: string;
}

export default function PromoBanner({ banner, className = "" }: PromoBanner) {
  const { imageSmall, imageLarge, link } = banner;

  const content = (
    <>
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
    </>
  );

  return link ? (
    <Link href={link} className={`${className} md:w-[calc(50%-8px)] block`}>
      {content}
    </Link>
  ) : (
    <div className={`${className} md:w-[calc(50%-8px)]`}>{content}</div>
  );
}
