"use client";
import { Dispatch, SetStateAction } from "react";
import { useCartStore } from "@/store/cartStore";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInAnimation, cartItemVariants } from "@/utils/animationVariants";
import CartListItem from "./CartListItem";

interface CartListProps {
  setIsPopUpShown: Dispatch<SetStateAction<boolean>>;
}

export default function CartList({ setIsPopUpShown }: CartListProps) {
  const { cart } = useCartStore();

  return (
    <AnimatePresence mode="wait">
      {cart.length > 0 ? (
        <motion.ul
          layout
          initial="hidden"
          animate="visible"
          exit="exit"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInAnimation({ y: 30, delay: 0.9, duration: 1 })}
          className="flex flex-col gap-y-4 h-[calc(100dvh-320px)] xl:h-[calc(100dvh-390px)] pr-1 overflow-x-hidden overflow-y-auto
           scrollbar scrollbar-w-[3px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-main/50 scrollbar-track-transparent"
        >
          <AnimatePresence mode="sync">
            {cart.map((cartItem) => (
              <motion.li
                variants={cartItemVariants}
                key={cartItem?.product?.id}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className=""
              >
                <CartListItem
                  cartItem={cartItem}
                  setIsPopUpShown={setIsPopUpShown}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay: 0.4 },
          }}
          exit={{ opacity: 0, y: 30, transition: { duration: 0.3 } }}
          className="h-[calc(100dvh-320px)] xl:h-[calc(100dvh-390px)] text-[14px] lg:text-[18px] font-normal leading-[120%] text-center py-[140px] text-black/50"
        >
          Ваш кошик порожній
        </motion.div>
      )}
    </AnimatePresence>
  );
}
