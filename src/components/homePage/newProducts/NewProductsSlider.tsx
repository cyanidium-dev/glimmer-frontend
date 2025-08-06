"use client";
import SwiperWrapper from "@/components/shared/swiper/SwiperWrapper";
import { SwiperSlide } from "swiper/react";
import ProductCard from "@/components/shared/productCard/ProductCard";
import { Product } from "@/types/product";

interface NewProductsSliderProps {
  newProducts: Product[];
}

export default function NewProductsSlider({
  newProducts,
}: NewProductsSliderProps) {
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
      {newProducts.map((newProduct, idx) => (
        <SwiperSlide key={idx}>
          <ProductCard product={newProduct} />
        </SwiperSlide>
      ))}
    </SwiperWrapper>
  );
}
