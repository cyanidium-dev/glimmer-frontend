import Image from "next/image";

export default function AboutInfo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="relative w-full h-[146px] rounded-[12px] overflow-hidden">
        <Image
          src="/images/aboutPage/aboutInfo/imageOne.webp"
          alt="background"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-6">
        <div className="p-3 shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] rounded-[12px]">
          <h3 className="mb-4 text-[14px] lg:text-[24px] font-medium leading-[120%]">
            Ми — Glimmer
          </h3>
          <p className="mb-3 text-[10px] lg:text-[12px] font-light leading-[120%]">
            Glimmer — це місце, де книги оживають і стають частиною вашої
            історії. Ми створюємо простір для тих, хто шукає в літературі не
            просто сюжет, а глибокі емоції, нові ідеї та натхнення.
          </p>
          <p className="text-[10px] lg:text-[12px] font-light leading-[120%]">
            Ми віримо, що книга здатна змінювати світогляд і надихати на
            найсміливіші мрії. Саме тому ми дбаємо про кожну деталь — від вибору
            асортименту до зручності вашого замовлення.
          </p>
        </div>
        <div className="flex gap-6">
          <div className="w-[calc(50%-12px)] p-3 shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] rounded-[12px]">
            <h3 className="mb-4 text-[14px] lg:text-[24px] font-medium leading-[120%]">
              Як усе почалося
            </h3>
            <p className="mb-3 text-[10px] lg:text-[12px] font-light leading-[120%]">
              Ми прагнемо зробити читання доступним, зручним і захопливим для
              кожного. Для нас важливо не просто продавати книги, а допомагати
              знаходити ті історії, що залишають слід у серці.
            </p>
            <p className="text-[10px] lg:text-[12px] font-light leading-[120%]">
              Ми підтримуємо культуру читання й мріємо, щоб кожна книга ставала
              особливим супутником на вашому життєвому шляху.
            </p>
          </div>
          <div className="flex flex-col gap-4 w-[calc(50%-12px)]">
            <div className="relative w-full h-[140px] rounded-[12px] overflow-hidden">
              <Image
                src="/images/aboutPage/aboutInfo/imageTwo.webp"
                alt="background"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-full h-[140px] rounded-[12px] overflow-hidden">
              <Image
                src="/images/aboutPage/aboutInfo/imageThree.webp"
                alt="background"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="p-3 shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] rounded-[12px]">
            <h3 className="mb-4 text-[14px] lg:text-[24px] font-medium leading-[120%]">
              Наша місія
            </h3>
            <p className="mb-3 text-[10px] lg:text-[12px] font-light leading-[120%]">
              Ми прагнемо зробити читання доступним, зручним і захопливим для
              кожного. Для нас важливо не просто продавати книги, а допомагати
              знаходити ті історії, що залишають слід у серці.
            </p>
            <p className="text-[10px] lg:text-[12px] font-light leading-[120%]">
              Ми підтримуємо культуру читання й мріємо, щоб кожна книга ставала
              особливим супутником на вашому життєвому шляху.
            </p>
          </div>
          <div className="relative w-full h-[240px] rounded-[12px] overflow-hidden">
            <Image
              src="/images/aboutPage/aboutInfo/imageFour.webp"
              alt="background"
              fill
              className="object-cover"
            />
          </div>
          <div className="p-3 shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] rounded-[12px]">
            <h3 className="mb-4 text-[14px] lg:text-[24px] font-medium leading-[120%]">
              Чому обирають нас
            </h3>
            <p className="mb-3 text-[10px] lg:text-[12px] font-light leading-[120%]">
              Ми не просто магазин — ми спільнота однодумців, де кожен читач
              важливий. Для нас важливо створювати сервіс, до якого хочеться
              повертатися знову.
            </p>
            <p className="text-[10px] lg:text-[12px] font-light leading-[120%]">
              Ми обираємо лише якісні книги, дбаємо про швидку доставку й завжди
              відкриті до ваших відгуків і побажань. Glimmer — це місце, де
              книги знаходять своїх читачів.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
