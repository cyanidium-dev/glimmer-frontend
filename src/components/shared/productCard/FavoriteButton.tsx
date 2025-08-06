"use client";
import { useState, useEffect } from "react";
import EmptyHeartIcon from "../icons/EmptyHeartIcon";
import { useFavoritesStore } from "@/store/favoritesStore";
import { Product } from "@/types/product";

interface FavoriteButtonProps {
  currentProduct: Product;
}

export default function FavoriteButton({
  currentProduct,
}: FavoriteButtonProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const toggleFavorite = () => {
    if (isFavorite(currentProduct.slug)) {
      removeFavorite(currentProduct.slug);
    } else {
      addFavorite(currentProduct);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      aria-label="add to favorites"
      className="group cursor-pointer flex items-center justify-center shrink-0  active:scale-95 transition duration-300 ease-in-out"
    >
      <EmptyHeartIcon
        className={` ${
          isFavorite(currentProduct.slug)
            ? "text-main xl:hover:brightness-110 focus-visible:brightness-110"
            : "text-white xl:group-hover:text-main focus-visible:text-main"
        } transition duration-300 ease-in-out`}
      />
    </button>
  );
}
