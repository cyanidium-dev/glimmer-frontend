import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AddToCartAnimation() {
  const { isCartAnimating, cartAnimationKey, animatingImage } = useCartStore();

  const cartButton = document.getElementById("cart-button");

  const cartButtonTop = cartButton?.getBoundingClientRect()?.top;
  const cartButtonLeft = cartButton?.getBoundingClientRect()?.left;

  const addToCartButton = document.getElementById("add-to-cart-button");

  const addToCartButtonTop = addToCartButton?.getBoundingClientRect()?.top;
  const addToCartButtonLeft = addToCartButton?.getBoundingClientRect()?.left;

  return (
    <>
      {isCartAnimating && (
        <motion.div
          key={cartAnimationKey} // змінюємо ключ, щоб перезапустити анімацію
          className="fixed z-[100]"
          style={{
            top: addToCartButtonTop,
            left: addToCartButtonLeft,
          }}
          initial={{ scale: 1 }}
          animate={{
            scale: 0.3,
            y:
              cartButtonTop !== undefined && addToCartButtonTop !== undefined
                ? cartButtonTop - addToCartButtonTop
                : 0,
            x: [
              0,
              -54,
              cartButtonLeft !== undefined && addToCartButtonLeft !== undefined
                ? cartButtonLeft - addToCartButtonLeft
                : 0,
            ],
            opacity: 0,
            transition: {
              duration: 1.5,
              ease: "easeInOut",
              times: [0, 0.4, 1],
            },
          }}
        >
          <div className="relative w-[50px] lg:w-[70px] h-[50px] lg:h-[70px] overflow-hidden rounded-[12px]">
            {" "}
            <Image
              src={animatingImage?.url || ""}
              alt={animatingImage?.alt || ""}
              fill
              className="w-full h-hull object-cover"
            />
          </div>
        </motion.div>
      )}
    </>
  );
}
