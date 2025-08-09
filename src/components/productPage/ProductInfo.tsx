"use client";
import { Product } from "@/types/product";
import { useEffect } from "react";
import { useReviewedProductsStore } from "@/store/reviewedProductsStore";

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

  return <div>ProductInfo</div>;
}
