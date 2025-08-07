"use client";
import SwiperWrapper from "@/components/shared/swiper/SwiperWrapper";
import { SwiperSlide } from "swiper/react";
import HeroSlide from "./HeroSlide";

interface HeroProps {
  banners: {
    title: string;
    description: string;
    image: string;
    button: {
      label: string;
      link: string;
      position: string;
    };
    order: number;
  }[];
}

export default function Hero({ banners }: HeroProps) {
  console.log(banners);
  return (
    <section>
      <SwiperWrapper
        swiperClassName="newProducts"
        loop
        breakpoints={{
          1280: {
            slidesPerView: 1,
          },
        }}
      >
        {banners.map((banner, idx) => (
          <SwiperSlide key={idx}>
            <HeroSlide banner={banner} />
          </SwiperSlide>
        ))}
      </SwiperWrapper>
    </section>
  );
}
