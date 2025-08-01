import Image from "next/image";
import Container from "../container/Container";

export default function Footer() {
  return (
    <footer className="w-dvw bg-black py-8 lg:pt-[72px] lg:pb-[67px]">
      <Container>
        <Image
          src="/images/footer/logo.svg"
          alt="logo"
          width={267}
          height={76}
        />
      </Container>
    </footer>
  );
}
