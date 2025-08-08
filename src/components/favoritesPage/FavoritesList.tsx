"use client";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useFavoritesStore } from "@/store/favoritesStore";
import Loader from "../shared/loader/Loader";
import Container from "../shared/container/Container";
import NoItems from "./NoItems";
import Pagination from "../shared/pagination/Pagination";
import { useFavoritesItemsPerPage } from "@/hooks/useFavoritesItemsPerPage";
import ProductCard from "../shared/productCard/ProductCard";
import FiltersSortPanel from "../shared/filtersSortPanel/FiltersSortPanel";
import { Product } from "@/types/product";

export default function FavoritesList() {
  const { favorites } = useFavoritesStore();
  const itemsPerPage = useFavoritesItemsPerPage();
  const [hydrated, setHydrated] = useState(false);

  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter") || "all";
  const sortParam = searchParams.get("sort") || "default";

  useEffect(() => {
    setHydrated(true);
  }, []);

  // фільтрація
  const filteredFavorites = useMemo(() => {
    if (!favorites) return [];

    switch (filterParam) {
      case "bestseller":
        return favorites.filter((p) => p.isBestseller);
      case "new":
        return favorites.filter((p) => p.isNew);
      case "discount":
        return favorites.filter((p) => p.discountPrice);
      case "pre-order":
        return favorites.filter((p) => p.status === "preOrder");
      case "in-stock":
        return favorites.filter((p) => p.status === "inStock");
      default:
        return favorites;
    }
  }, [favorites, filterParam]);

  // сортування
  const sortedFavorites = useMemo(() => {
    const items = [...filteredFavorites];

    const getFinalPrice = (product: Product) => {
      if (product.discountPrice) {
        return product.discountPrice;
      }
      return product.price || 0;
    };

    switch (sortParam) {
      case "price-ascending":
        return items.sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
      case "price-descending":
        return items.sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
      default:
        return items;
    }
  }, [filteredFavorites, sortParam]);

  if (!hydrated) return <Loader />;

  return (
    <Container>
      <FiltersSortPanel />
      {!sortedFavorites.length ? (
        <NoItems />
      ) : (
        <div className="pt-8 lg:pt-10">
          <Pagination
            items={sortedFavorites}
            useItemsPerPage={() => itemsPerPage}
            renderItems={(currentItems) => (
              <ul className="flex flex-row flex-wrap gap-x-4 gap-y-8 lg:gap-y-10">
                {currentItems.map((product) => (
                  <li
                    key={product?.id}
                    className="h-full w-[calc(50%-8px)] sm:w-[calc(33.33%-10.67px)] md:w-[calc(25%-12px)] xl:w-[calc(20%-12.8px)]"
                  >
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            )}
          />
        </div>
      )}
    </Container>
  );
}
