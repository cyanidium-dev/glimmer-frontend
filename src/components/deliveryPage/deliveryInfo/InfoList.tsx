import Image from "next/image";

export default function InfoList() {
  const infoList = [
    "Ми здійснюємо доставку по всій Україні та за кордон, щоб ви могли отримати улюблені книги незалежно від вашого місця проживання.",
    "Замовлення обробляються протягом 1–2 робочих днів після підтвердження оплати.",
    "Доставка відбувається у будні дні, відповідно до графіка обраної служби.",
    "Після відправки ви отримаєте номер ТТН, за яким можна перевірити статус доставки на сайті обраної служби.",
  ];

  return (
    <ul className="flex flex-col gap-6 md:flex-row md:flex-wrap md:gap-8 xl:gap-20">
      {infoList.map((infoItem, idx) => (
        <li
          key={idx}
          className="flex gap-5 md:items-center md:w-[calc(50%-16px)] xl:w-[calc(50%-40px)]"
        >
          <Image
            src="/images/deliveryPage/deliveryInfo/star.svg"
            alt="star icon"
            width={23}
            height={24}
            className="shrink-0"
          />
          <p>{infoItem}</p>
        </li>
      ))}
    </ul>
  );
}
