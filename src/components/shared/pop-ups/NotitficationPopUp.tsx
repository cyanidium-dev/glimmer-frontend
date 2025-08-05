import { Dispatch, SetStateAction } from "react";
import Modal from "../modals/Modal";

interface NotificationPopUpProps {
  title: string;
  description: string;
  isPopUpShown: boolean;
  setIsPopUpShown: Dispatch<SetStateAction<boolean>>;
}

export default function NotificationPopUp({
  title,
  description,
  isPopUpShown,
  setIsPopUpShown,
}: NotificationPopUpProps) {
  return (
    <Modal isPopUpShown={isPopUpShown} setIsPopUpShown={setIsPopUpShown}>
      <div className="py-10 xl:py-14 px-[38px] mx-auto">
        <h3 className="max-w-[386px] mx-auto mb-4 text-[20px] xl:text-[28px] font-medium leading-[120%] text-center text-main">
          {title}
        </h3>
        <p className="max-w-[386px] mx-auto text-[12px] font-light leading-[120%] text-center">
          {description}
        </p>
      </div>
    </Modal>
  );
}
