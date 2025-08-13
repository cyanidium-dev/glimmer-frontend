import { Dispatch, SetStateAction } from "react";
import CartTotal from "./CartTotal";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { fadeInAnimation, cartModalVariants } from "@/utils/animationVariants";
import IconButton from "../buttons/IconButton";
import CrossIcon from "../icons/CrossIcon";
import CartIcon from "../icons/CartIcon";
import CartList from "./CartList";
import MarqueeLine from "../marquee/MarqueeLine";

interface CartModalProps {
  isPopUpShown: boolean;
  setIsPopUpShown: Dispatch<SetStateAction<boolean>>;
}

export default function CartModal({
  isPopUpShown,
  setIsPopUpShown,
}: CartModalProps) {
  const { cart, clearCart } = useCartStore();

  return (
    <AnimatePresence>
      {isPopUpShown && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={cartModalVariants}
          className={`fixed z-[70] top-0 right-0 w-dvw h-dvh xs:max-w-[400px] py-4 px-5 lg:px-6
       bg-white max-h-[100dvh]`}
        >
          <div className="flex flex-col justify-between">
            <div className="">
              <motion.div
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeInAnimation({ y: 30, delay: 0.6 })}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex items-center gap-2">
                  <CartIcon fillColor="#94C5E8" />
                  <h3 className="text-[16px] lg:text-[18px] font-medium leading-[120%]">
                    Кошик
                  </h3>
                </div>
                <IconButton
                  handleClick={() => setIsPopUpShown(false)}
                  className="size-6"
                >
                  {<CrossIcon />}
                </IconButton>
              </motion.div>
              {cart?.length ? (
                <div className="flex items-center justify-between  mb-4">
                  <p className="text-[12px] font-light leading-[120%] text-black/60">
                    {cart.length} товари
                  </p>
                  <button
                    onClick={() => clearCart()}
                    type="button"
                    className="cursor-pointer text-[12px] font-light leading-[120%] text-black/60 active:text-main focus-visible:text-main 
                    xl:hover:text-main transition duration-300 ease-in-out"
                  >
                    Видалити все
                  </button>
                </div>
              ) : null}
              <CartList setIsPopUpShown={setIsPopUpShown} />
            </div>
          </div>

          <CartTotal
            cartItems={cart}
            setIsPopUpShown={setIsPopUpShown}
            isPopUpShown={isPopUpShown}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
