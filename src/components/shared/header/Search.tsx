"use client";
import { useEffect, Dispatch, SetStateAction } from "react";
import SearchIcon from "../icons/SearchIcon";
import { AnimatePresence, motion } from "framer-motion";
import Backdrop from "../backdrop/Backdrop";
import { catalogMenuVariants } from "@/utils/animationVariants";
import IconButton from "../buttons/IconButton";
import CrossIcon from "../icons/CrossIcon";

interface SearchProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Search({ isOpen, setIsOpen }: SearchProps) {
  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }

    return () => body.classList.remove("no-scroll");
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="cursor-pointer group"
      >
        <SearchIcon className="text-white xl:group-hover:text-main group-focus-visible:text-main group-active:text-main transition duration-300 ease-in-out" />
      </button>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={catalogMenuVariants}
            className={`absolute z-[100] top-10 -right-2 rounded-[12px] bg-white w-[320px] md:w-[384px] py-4 md:py-6 px-5 md:px-8`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SearchIcon />
                <p className="text-[16px] lg:text-[18px] font-medium">Пошук</p>
              </div>
              <IconButton
                handleClick={() => setIsOpen(false)}
                className="size-6"
              >
                {<CrossIcon />}
              </IconButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Backdrop
        transparent
        isVisible={isOpen}
        onClick={() => setIsOpen(false)}
      />
    </div>
  );
}
