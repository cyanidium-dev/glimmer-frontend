"use client";
import { Product } from "@/types/product";
import { useEffect } from "react";
import { useReviewedProductsStore } from "@/store/reviewedProductsStore";
import Container from "@/components/shared/container/Container";

interface ProductInfoProps {
  currentProduct: Product;
}

export default function ProductInfo({ currentProduct }: ProductInfoProps) {
  const { addReviewedProduct } = useReviewedProductsStore();

  console.log(currentProduct);

  useEffect(() => {
    if (currentProduct) {
      addReviewedProduct(currentProduct);
    }
  }, [currentProduct, addReviewedProduct]);

  return (
    <section className="pb-8 lg:pb-10">
      <Container></Container>
    </section>
  );
}
