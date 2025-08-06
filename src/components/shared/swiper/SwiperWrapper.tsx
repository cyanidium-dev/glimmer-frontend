"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ReactNode } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import { createPagination } from "./CustomPagination";

interface SwiperWrapperProps {
  children: ReactNode;
  slidesPerView?: number | "auto" | undefined;
  breakpoints: SwiperOptions["breakpoints"];
  swiperClassName: string;
  loop?: boolean;
  isPagination?: boolean;
}

export default function SwiperWrapper({
  children,
  slidesPerView = "auto",
  breakpoints,
  swiperClassName,
  loop = false,
  isPagination = true,
}: SwiperWrapperProps) {
  return (
    <Swiper
      slidesPerView={slidesPerView}
      pagination={isPagination ? createPagination(3) : false}
      breakpoints={breakpoints}
      navigation={true}
      loop={loop}
      speed={1000}
      modules={[Navigation, Pagination]}
      className={swiperClassName}
    >
      {children}
    </Swiper>
  );
}
