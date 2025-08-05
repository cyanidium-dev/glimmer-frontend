import Link from "next/link";
import Container from "../container/Container";
import LogoIcon from "../icons/LogoIcon";
import CartButton from "../buttons/CartButton";
import HeartIcon from "../icons/HeartIcon";
import Search from "./Search";
import NavMenu from "./NavMenu";

export default function Header() {
  return (
    <header className="fixed z-30 top-0 left-0 w-dvw py-6 bg-black">
      <Container className="flex items-center justify-between">
        <Link href="/" className="group">
          <LogoIcon className="text-white xl:group-hover:text-main group-focus-visible:text-main group-active:text-main transition duration-300 ease-in-out" />
        </Link>
        <div className="flex items-center gap-[72px]">
          <NavMenu />
          <div className="flex items-center gap-[22px]">
            <Search />
            <Link href="favorites" className="group">
              <HeartIcon className="text-white xl:group-hover:text-main group-focus:text-main group-active:text-main transition duration-300 ease-in-out" />
            </Link>
            <CartButton />
          </div>
        </div>
      </Container>
    </header>
  );
}
