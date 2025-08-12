"use client";

import { useState } from "react";
import MainButton from "@/components/shared/buttons/MainButton";
import WriteReviewFormWithNotifications from "./WriteReviewFormWIthNotifications";

export default function WriteReview() {
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
        isWriteReviewModalShown={isWriteReviewModalShown}
        setIsWriteReviewModalShown={setIsWriteReviewModalShown}
      />
    </>
  );
}
