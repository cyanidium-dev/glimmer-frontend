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
        title={isError ? "На жаль, щось пішло не так" : "Дякуємо за звернення!"}
        description={
          isError
            ? "Спробуйте відправити форму ще раз"
            : "Наш менеджер скоро зв'яжеться з вами"
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
