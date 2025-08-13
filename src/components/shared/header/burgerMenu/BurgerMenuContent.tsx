"use client";

import { useState } from "react";
import IconButton from "../../buttons/IconButton";
import ArrowIcon from "../../icons/ArrowIcon";
import CrossIcon from "../../icons/CrossIcon";
import Link from "next/link";
import { navList } from "../NavMenu";
import { CatalogItem } from "@/types/catalogItem";

interface BurgerMenuContentProps {
  catalogList: CatalogItem[];
  isOpen: boolean;
  onClose: () => void;
}

type MenuLevel = "main" | "catalog" | "genres";

export default function BurgerMenuContent({
  catalogList,
  isOpen,
  onClose,
}: BurgerMenuContentProps) {
  const [menuLevel, setMenuLevel] = useState<MenuLevel>("main");
  const [selectedCatalog, setSelectedCatalog] = useState<CatalogItem | null>(
    null
  );

  const handleBack = () => {
    if (menuLevel === "genres") {
      setMenuLevel("catalog");
      setSelectedCatalog(null);
    } else if (menuLevel === "catalog") {
      setMenuLevel("main");
    } else {
      onClose();
    }
  };

  const handleCatalogClick = (item: CatalogItem) => {
    if (item.genres && item.genres.length > 0) {
      setSelectedCatalog(item);
      setMenuLevel("genres");
    } else {
      onClose();
      window.location.href = `/catalog/${item.slug}`;
    }
  };

  return (
    <div
      className={`${
        isOpen
          ? "translate-x-0 opacity-100"
          : "translate-x-full pointer-events-none opacity-0"
      } lg:hidden fixed right-0 top-0 transform transition duration-[600ms] ease-out z-[70] w-[280px] h-dvh max-h-dvh
      px-5 py-[30px] overflow-y-auto bg-white scrollbar scrollbar-w-[3px] scrollbar-thumb-rounded-full 
      scrollbar-track-rounded-full scrollbar-thumb-transparent scrollbar-track-main popup-scroll`}
    >
      {/* Header */}
      <div className="flex justify-between items-center pb-4">
        <IconButton handleClick={handleBack} className="size-6">
          <ArrowIcon className="rotate-90" />
        </IconButton>
        <IconButton handleClick={onClose} className="size-6">
          <CrossIcon />
        </IconButton>
      </div>

      {/* Main Menu */}
      {menuLevel === "main" && (
        <ul className="flex flex-col gap-10 pt-10">
          <li>
            <button
              type="button"
              onClick={() => setMenuLevel("catalog")}
              className="group cursor-pointer flex items-center gap-2"
            >
              <span className="text-[18px] font-light leading-[120%] group-active:text-main group-focus-visible:text-main transition duration-300 ease-in-out">
                Каталог
              </span>
              <ArrowIcon className="-rotate-90 group-active:text-main xl:group-hover:text-main group-focus-visible:text-main transition duration-300 ease-in-out" />
            </button>
          </li>
          {navList.map(({ title, link }, idx) => (
            <li key={idx}>
              <Link
                onClick={onClose}
                href={link}
                className="block text-[18px] font-light leading-[120%] active:text-main focus-visible:text-main transition duration-300 ease-in-out"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Catalog Menu */}
      {menuLevel === "catalog" && (
        <ul className="flex flex-col gap-10 pt-10">
          {catalogList.map((item, idx) => (
            <li key={idx}>
              <button
                type="button"
                onClick={() => handleCatalogClick(item)}
                className="flex items-center gap-2 w-full text-[18px] font-light leading-[120%] active:text-main focus-visible:text-main transition duration-300 ease-in-out"
              >
                {item.title}
                {item.genres && item.genres.length > 0 ? (
                  <ArrowIcon className="-rotate-90 group-active:text-main xl:group-hover:text-main group-focus-visible:text-main transition duration-300 ease-in-out" />
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Genres Menu */}
      {menuLevel === "genres" && selectedCatalog && (
        <ul className="flex flex-col gap-10 pt-10">
          {selectedCatalog.genres?.map((genre, idx) => (
            <li key={idx}>
              <Link
                onClick={onClose}
                href={`/catalog/${selectedCatalog.slug}?subcategory=${genre.slug}`}
                className="block text-[18px] font-light leading-[120%] active:text-main focus-visible:text-main transition duration-300 ease-in-out"
              >
                {genre.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
