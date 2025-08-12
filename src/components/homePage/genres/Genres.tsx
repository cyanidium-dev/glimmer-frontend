"use client";
import SwiperWrapper from "@/components/shared/swiper/SwiperWrapper";
import { SwiperSlide } from "swiper/react";
import { Genre } from "@/types/genre";
import GenreCard from "./GenreCard";

interface GenresProps {
  genres: Genre[];
}

export default function Genres({ genres }: GenresProps) {
  return (
    <section className="py-8 lg:py-10">
      <SwiperWrapper
        swiperClassName="genres"
        loop
        breakpoints={{
          0: {
            spaceBetween: 20,
            slidesPerView: "auto",
          },
          1280: {
            spaceBetween: 19.5,
            slidesPerView: 6,
          },
        }}
      >
        {genres.map((genre, idx) => (
          <SwiperSlide key={idx}>
            <GenreCard genre={genre} />
          </SwiperSlide>
        ))}
      </SwiperWrapper>
    </section>
  );
}
