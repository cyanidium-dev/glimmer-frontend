import Link from "next/link";
import MainButton from "../shared/buttons/MainButton";
import Container from "../shared/container/Container";
import Image from "next/image";

export default function Confirmation() {
  return (
    <section className="relative py-[116px] lg:py-50">
      <Image
        src="/images/confirmationPage/bgTopMob.svg"
        alt="background"
        width="105"
        height="62"
        className="lg:hidden absolute top-0 left-0"
      />
      <Image
        src="/images/confirmationPage/bgBottomMob.svg"
        alt="background"
        width="91"
        height="96"
        className="lg:hidden absolute bottom-0 right-0"
      />
      <Image
        src="/images/confirmationPage/bgTopDesk.svg"
        alt="background"
        width="250"
        height="247"
        className="hidden lg:block absolute top-[-70px] left-0"
      />
      <Image
        src="/images/confirmationPage/bgBottomDesk.svg"
        alt="background"
        width="320"
        height="344"
        className="hidden lg:block absolute bottom-[-104px] right-0"
      />
      <Container>
        <h1
          className={`mb-4 text-[24px] lg:text-[32px] leading-[120%] font-semibold uppercase text-main text-center`}
        >
          Дякуємо за замовлення!
        </h1>
        <p className="mb-8 text-[12px] lg:text-[15px] font-medium leading-[120%] text-center">
          Ваше замовлення №123456 прийнято в обробку.
        </p>
        <p className="mb-10 text-center">
          Ми вже надіслали квитанцію на вашу електронну пошту. Якщо бажаєте, ви
          можете також завантажити її зараз.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-[199px] sm:w-[540px] mx-auto">
          <MainButton
            variant="bordered"
            className="sm:w-[calc(50%-6px)] h-[45px] text-[12px] lg:text-[14px] font-normal"
          >
            Завантажити квитанцію
          </MainButton>
          <Link href="/" className="sm:w-[calc(50%-6px)]">
            <MainButton className="h-[45px] text-[12px] lg:text-[14px] font-normal">
              На головну
            </MainButton>
          </Link>
        </div>
      </Container>
    </section>
  );
}
