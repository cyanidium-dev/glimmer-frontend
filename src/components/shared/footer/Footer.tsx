import Image from "next/image";
import Container from "../container/Container";
import MainButton from "../buttons/MainButton";
import Link from "next/link";
import NavMenu from "./NavMenu";
import Info from "./Info";

export default function Footer() {
  return (
    <footer className="w-dvw bg-black py-8 lg:pt-[72px] lg:pb-[67px]">
      <Container className="flex flex-col gap-8 lg:gap-22 lg:flex-row">
        <div className="w-[267px]">
          {" "}
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
