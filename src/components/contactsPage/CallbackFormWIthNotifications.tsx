"use client";

import { useState } from "react";
import CallBackForm from "../shared/forms/CallBackForm";
import NotificationPopUp from "../shared/pop-ups/NotitficationPopUp";
import Backdrop from "../shared/backdrop/Backdrop";

interface CallBackFormWithNotificationsProps {
  className?: string;
}

export default function CallBackFormWithNotifications({
  className,
}: CallBackFormWithNotificationsProps) {
  const [isError, setIsError] = useState(false);
  const [isNotificationShown, setIsNotificationShown] = useState(false);

  return (
    <>
      <div className="">
        <CallBackForm
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
