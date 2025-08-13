"use client";
import { Dispatch, SetStateAction } from "react";
import BurgerMenuButton from "./BurgerMenuButton";
import BurgerMenuContent from "./BurgerMenuContent";
import Backdrop from "../../backdrop/Backdrop";
import { Category } from "@/types/category";

interface BurgerMenuProps {
  categories: Category[];
  isOpenBurgerMenu: boolean;
  setIsOpenBurgerMenu: Dispatch<SetStateAction<boolean>>;
  //   setIsOpenCatalogMenu: Dispatch<SetStateAction<boolean>>;
  //   setIsCartModalOpened: Dispatch<SetStateAction<boolean>>;
}

export default function BurgerMenu({
  categories,
  isOpenBurgerMenu,
  setIsOpenBurgerMenu,
  //   setIsOpenCatalogMenu,
  //   setIsCartModalOpened,
}: BurgerMenuProps) {
  const sortedCategories = categories.sort((a, b) => a.order - b.order);

  const catalogList = [{ title: "Акції", slug: "promo" }, ...sortedCategories];
  return (
    <>
      <BurgerMenuButton
        onOpen={() => {
          setIsOpenBurgerMenu(true);
          //   setIsOpenCatalogMenu(false);
          //   setIsCartModalOpened(false);
        }}
      />
      <BurgerMenuContent
        catalogList={catalogList}
        isOpen={isOpenBurgerMenu}
        onClose={() => setIsOpenBurgerMenu(false)}
      />
      <Backdrop
        isVisible={isOpenBurgerMenu}
        onClick={() => setIsOpenBurgerMenu(false)}
      />
    </>
  );
}
