import Image from "next/image";
import Container from "../shared/container/Container";
import CallBackFormWithNotifications from "./CallbackFormWIthNotifications";

export default function CallBack() {
  return (
    <section className="py-8 lg:py-10">
      <Container className="md:flex justify-between items-center">
        <div className="flex flex-col gap-5 md:w-[calc(50%-35px)]">
          <h2 className="text-[14px] lg:text-[18px] font-medium leading-[120%]">
            Залишились питання?
          </h2>
          <p>Заповніть форму — ми відповімо якнайшвидше:</p>
          <CallBackFormWithNotifications />
        </div>
        <Image
          src="/images/contactsPage/callback/logoFull.svg"
          alt="logo"
          width="425"
          height="426"
          className="hidden md:block w-[365px] lg:w-[425px] h-auto"
        />
      </Container>
    </section>
  );
}
