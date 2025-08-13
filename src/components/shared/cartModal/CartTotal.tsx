"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import MainButton from "../buttons/MainButton";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { fadeInAnimation } from "@/utils/animationVariants";
import { CartItem } from "@/types/cartItem";
import MarqueeLine from "../marquee/MarqueeLine";

interface CartTotalProps {
  cartItems: CartItem[];
  isPopUpShown: boolean;
  setIsPopUpShown: Dispatch<SetStateAction<boolean>>;
}

export default function CartTotal({
  isPopUpShown,
  setIsPopUpShown,
  cartItems,
}: CartTotalProps) {
  const [total, setTotal] = useState(0);
  const [discountTotal, setDiscountTotal] = useState(0);

  const { getCartTotal, getPromoDiscountTotal } = useCartStore();

  const sum = getCartTotal();
  const promodIscountTotal = getPromoDiscountTotal();

  useEffect(() => {
    setTotal(sum);
    setDiscountTotal(promodIscountTotal);
  }, [sum, promodIscountTotal]);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeInAnimation({ y: 30, delay: 1.1 })}
      className="absolute bottom-0 right-0 w-full max-w-[400px] bg-white"
    >
      {isPopUpShown ? <MarqueeLine /> : null}
      <div className="px-6 py-4 flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <p className="text-[12px] lg:text-[15px] font-medium leading-[120%]">
            Загальна вартість
          </p>
          <p className="text-[12px] lg:text-[15px] font-medium leading-[120%]">
            {total}&nbsp;грн
          </p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <p className="">Загальна сума знижки</p>
          <p className="text-[12px] lg:text-[15px] font-medium leading-[120%] text-accent">
            {discountTotal}&nbsp;грн
          </p>
        </div>
        <p className="text-[10px] lg:text-[12px] font-normal leading-[120%] text-black/60">
          Безкоштовна доставка від 999 грн
        </p>
        <Link href="/checkout" onClick={() => setIsPopUpShown(false)}>
          <MainButton
            disabled={!cartItems?.length}
            className="w-full h-9 xl:h-12"
          >
            Оформити замовлення
          </MainButton>
        </Link>
      </div>
    </motion.div>
  );
}
