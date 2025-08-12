"use client";

import { useState } from "react";
import MainButton from "@/components/shared/buttons/MainButton";
import WriteReviewFormWithNotifications from "./WriteReviewFormWIthNotifications";
import { Product } from "@/types/product";

interface WriteReviewProps {
  currentProduct: Product;
}

export default function WriteReview({ currentProduct }: WriteReviewProps) {
  const [isWriteReviewModalShown, setIsWriteReviewModalShown] = useState(false);

  return (
    <>
      <MainButton
        onClick={() => setIsWriteReviewModalShown(true)}
        className="h-[45px]"
      >
        Написати відгук
      </MainButton>
      <WriteReviewFormWithNotifications
        currentProduct={currentProduct}
        isWriteReviewModalShown={isWriteReviewModalShown}
        setIsWriteReviewModalShown={setIsWriteReviewModalShown}
      />
    </>
  );
}
