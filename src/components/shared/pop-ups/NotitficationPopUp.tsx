import { Dispatch, SetStateAction } from "react";
import Modal from "../modals/Modal";
import MainButton from "../buttons/MainButton";

interface NotificationPopUpProps {
  title: string;
  description: string;
  isPopUpShown: boolean;
  isError: boolean;
  setIsPopUpShown: Dispatch<SetStateAction<boolean>>;
}

export default function NotificationPopUp({
  title,
  description,
  isPopUpShown,
  isError,
  setIsPopUpShown,
}: NotificationPopUpProps) {
  return (
    <Modal
      isPopUpShown={isPopUpShown}
      setIsPopUpShown={setIsPopUpShown}
      isError={isError}
    >
      <div className="md:pt-10">
        <h3 className="mb-8 lg:mb-10 text-[24px] lg:text-[32px] font-semibold leading-[120%] text-center text-main uppercase">
          {title}
        </h3>
        <p className="mb-10 md:mb-14 text-center">{description}</p>
        <MainButton
          onClick={() => setIsPopUpShown(false)}
          className="h-[45px] w-[199px] md:w-[291px] mx-auto"
        >
          Повернутись
        </MainButton>
      </div>
    </Modal>
  );
}
