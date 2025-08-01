import Image from "next/image";
import Container from "../container/Container";
import MainButton from "../buttons/MainButton";
import Link from "next/link";
import NavMenu from "./NavMenu";
import Info from "./Info";

export default function Footer() {
  return (
    <footer className="relative w-dvw bg-black py-8 lg:pt-[72px] lg:pb-[67px]">
      <Image
        src="/images/footer/logoDesk.svg"
        alt="logo"
        width="219"
        height="312"
        className="absolute left-0 top-8 w-[186px] h-auto"
      />
      <Container className="flex flex-col gap-8 lg:gap-22 lg:flex-row lg:pl-[310px]">
        <div className="w-[267px] lg:order-3">
          <Image
            src="/images/footer/logo.svg"
            alt="logo"
            width={267}
            height={76}
            className="mb-8 lg:mb-[58px]"
          />
          <Link href="/catalog">
            <MainButton variant="secondary" className="h-[53px]">
              Переглянути каталог
            </MainButton>
          </Link>
        </div>
        <NavMenu />
        <Info />
      </Container>
    </footer>
  );
}
