import { Dispatch, SetStateAction } from "react";
// import CartList from './CartList';
// import CartTotal from './CartTotal';
import { AnimatePresence, motion } from "framer-motion";

// import { useCartStore } from "@/shared/store/cartStore";
import { fadeInAnimation, cartModalVariants } from "@/utils/animationVariants";
import IconButton from "../buttons/IconButton";
import CrossIcon from "../icons/CrossIcon";
import CartIcon from "../icons/CartIcon";

interface CartModalProps {
  isPopUpShown: boolean;
  setIsPopUpShown: Dispatch<SetStateAction<boolean>>;
}

export default function CartModal({
  isPopUpShown,
  setIsPopUpShown,
}: CartModalProps) {
  //   const { cartItems } = useCartStore();

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
                className="flex items-center justify-between mb-10"
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
              {/* <CartList setIsPopUpShown={setIsPopUpShown} /> */}
            </div>
          </div>
          {/* <CartTotal cartItems={cartItems} setIsPopUpShown={setIsPopUpShown} /> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
