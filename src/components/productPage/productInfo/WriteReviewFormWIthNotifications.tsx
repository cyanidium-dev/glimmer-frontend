"use client";

import { useState } from "react";
import WriteReviewForm from "@/components/shared/forms/WriteReviewForm";
import NotificationPopUp from "@/components/shared/pop-ups/NotitficationPopUp";
import Backdrop from "@/components/shared/backdrop/Backdrop";

interface WriteReviewFormWithNotificationsProps {
  className?: string;
}

export default function WriteReviewFormWithNotifications({
  className,
}: WriteReviewFormWithNotificationsProps) {
  const [isError, setIsError] = useState(false);
  const [isNotificationShown, setIsNotificationShown] = useState(false);

  return (
    <>
      <div className="">
        <WriteReviewForm
          setIsError={setIsError}
          setIsNotificationShown={setIsNotificationShown}
          className={className}
        />
      </div>
      <NotificationPopUp
        isError={isError}
        title={
          isError ? "На жаль, щось пішло не так" : "Дякуємо за ваш відгук!"
        }
        description={
          isError
            ? "Спробуйте відправити форму ще раз"
            : "Після модерації він з’явиться на сторінці товару."
        }
        isPopUpShown={isNotificationShown}
        setIsPopUpShown={setIsNotificationShown}
      />
      <Backdrop
        isVisible={isNotificationShown}
        onClick={() => setIsNotificationShown(false)}
      />
    </>
  );
}
