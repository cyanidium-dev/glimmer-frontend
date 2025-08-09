"use client";
import SwiperWrapper from "@/components/shared/swiper/SwiperWrapper";
import { SwiperSlide } from "swiper/react";
import ProductCard from "@/components/shared/productCard/ProductCard";
import { useReviewedProductsStore } from "@/store/reviewedProductsStore";

export default function ReviewedSlider() {
  const { reviewedProducts } = useReviewedProductsStore();

  console.log(reviewedProducts);

  if (!reviewedProducts) return null;

  return (
    <SwiperWrapper
      swiperClassName="reviewedProducts"
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
      {reviewedProducts.map((product, idx) => (
        <SwiperSlide key={idx}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </SwiperWrapper>
  );
}
