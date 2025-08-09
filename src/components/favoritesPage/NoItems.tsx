import Link from "next/link";
import MainButton from "../shared/buttons/MainButton";

export default function NoItems() {
  return (
    <div className="flex flex-col items-center gap-[30px] py-20 lg:py-30">
      <h2 className="text-[18px] lg:text-[24px] font-medium leading-[120%] text-center">
        Список обраного порожній
      </h2>
      <p className="max-w-[320px] lg:max-w-[416px] text-center">
        Зберігайте книги, які вас зацікавили — натисніть сердечко біля товару.
        Ми збережемо їх тут для вас.
      </p>
      <Link href="/">
        <MainButton className="w-[262px] h-[45px]">
          Повернутись на головну
        </MainButton>
      </Link>
    </div>
  );
}
