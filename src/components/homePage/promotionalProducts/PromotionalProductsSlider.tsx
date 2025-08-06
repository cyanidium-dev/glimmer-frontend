"use client";
import SwiperWrapper from "@/components/shared/swiper/SwiperWrapper";
import { SwiperSlide } from "swiper/react";
import ProductCard from "@/components/shared/productCard/ProductCard";
import { Product } from "@/types/product";

interface PromotionalProductsSliderProps {
  promotionalProducts: Product[];
}

export default function PromotionalProductsSlider({
  promotionalProducts,
}: PromotionalProductsSliderProps) {
  return (
    <SwiperWrapper
      swiperClassName="newProducts"
      loop
      breakpoints={{
        0: {
          spaceBetween: 16,
          slidesPerView: 2,
        },
        500: { spaceBetween: 16, slidesPerView: 3 },
        768: { spaceBetween: 16, slidesPerView: 4 },
        1280: {
          spaceBetween: 16,
          slidesPerView: 5,
        },
      }}
    >
      {promotionalProducts.map((promotionalProduct, idx) => (
        <SwiperSlide key={idx}>
          <ProductCard product={promotionalProduct} />
        </SwiperSlide>
      ))}
    </SwiperWrapper>
  );
}
