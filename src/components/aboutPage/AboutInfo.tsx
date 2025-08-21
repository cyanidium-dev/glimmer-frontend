import Image from "next/image";
import * as motion from "motion/react-client";
import { fadeInAnimation } from "@/utils/animationVariants";

export default function AboutInfo() {
  return (
    <div className="flex flex-col gap-6 xl:gap-8">
      <div className="flex flex-col md:flex-row-reverse gap-6 xl:gap-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInAnimation({ scale: 0.95 })}
          className="relative w-full md:w-[calc(50%-12px)] xl:w-[calc(50%-16px)] h-[146px] md:min-h-full md:h-auto rounded-[12px] overflow-hidden"
        >
          <Image
            src="/images/aboutPage/aboutInfo/imageOne.webp"
            alt="background"
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="flex flex-col md:flex-row gap-6 xl:gap-8 md:w-[calc(50%-12px)] xl:w-[calc(50%-16px)]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ x: -20 })}
            className="md:w-[calc(50%-12px)] xl:w-[calc(50%-16px)] py-3 px-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] rounded-[12px]"
          >
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
              найсміливіші мрії. Саме тому ми дбаємо про кожну деталь — від
              вибору асортименту до зручності вашого замовлення.
            </p>
          </motion.div>
          <div className="flex gap-6 md:w-[calc(50%-12px)] xl:w-[calc(50%-16px)]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInAnimation({ x: 20 })}
              className="w-[calc(50%-12px)] md:w-full py-3 pl-5 pr-1 shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] rounded-[12px]"
            >
              <h3 className="mb-4 text-[14px] lg:text-[24px] font-medium leading-[120%]">
                Як усе почалося
              </h3>
              <p className="pr-5 mb-3 text-[10px] lg:text-[12px] font-light leading-[110%]">
                Ми прагнемо зробити читання доступним, зручним і захопливим для
                кожного. Для нас важливо не просто продавати книги, а допомагати
                знаходити ті історії, що залишають слід у серці.
              </p>
              <p className="pr-5 text-[10px] lg:text-[12px] font-light leading-[110%]">
                Ми підтримуємо культуру читання й мріємо, щоб кожна книга
                ставала особливим супутником на вашому життєвому шляху.
              </p>
            </motion.div>
            <div className="md:hidden flex flex-col gap-4 w-[calc(50%-12px)]">
              <motion.div
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInAnimation({ scale: 0.95, delay: 0.3 })}
                className="relative w-full h-[140px] rounded-[12px] overflow-hidden"
              >
                <Image
                  src="/images/aboutPage/aboutInfo/imageTwo.webp"
                  alt="background"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.1 }}
                variants={fadeInAnimation({ scale: 0.95, delay: 0.3 })}
                className="relative w-full h-[140px] rounded-[12px] overflow-hidden"
              >
                <Image
                  src="/images/aboutPage/aboutInfo/imageThree.webp"
                  alt="background"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 xl:gap-8">
        <div className="hidden md:flex gap-4 md:w-[calc(50%-12px)] xl:w-[calc(50%-16px)]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ scale: 0.95 })}
            className="relative w-full xl:w-[calc(75%-8px)] min-h-full rounded-[12px] overflow-hidden"
          >
            <Image
              src="/images/aboutPage/aboutInfo/imageFour.webp"
              alt="background"
              fill
              className="object-cover object-top"
            />
          </motion.div>
          <div className="hidden xl:flex flex-col gap-4 xl:w-[calc(25%-8px)]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInAnimation({ scale: 0.95, delay: 0.3 })}
              className="relative w-full h-[156px] rounded-[12px] overflow-hidden"
            >
              <Image
                src="/images/aboutPage/aboutInfo/imageTwo.webp"
                alt="background"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInAnimation({ scale: 0.95, delay: 0.6 })}
              className="relative w-full h-[156px] rounded-[12px] overflow-hidden"
            >
              <Image
                src="/images/aboutPage/aboutInfo/imageThree.webp"
                alt="background"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col gap-6 xl:gap-8 md:w-[calc(50%-12px)] xl:w-[calc(50%-16px)]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInAnimation({ x: -20 })}
            className="py-3 px-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] rounded-[12px]"
          >
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
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInAnimation({ scale: 0.9 })}
            className="md:hidden relative w-full h-[240px] sm:h-[300px] rounded-[12px] overflow-hidden"
          >
            <Image
              src="/images/aboutPage/aboutInfo/imageFour.webp"
              alt="background"
              fill
              className="object-cover object-top"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInAnimation({ x: 20 })}
            className="py-3 px-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] rounded-[12px]"
          >
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}
