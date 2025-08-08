"use client";
import { useState, useEffect } from "react";
import { useFavoritesStore } from "@/store/favoritesStore";
import Loader from "../shared/loader/Loader";
import Container from "../shared/container/Container";
import NoItems from "./NoItems";
import Pagination from "../shared/pagination/Pagination";
import { useFavoritesItemsPerPage } from "@/hooks/useFavoritesItemsPerPage";
import ProductCard from "../shared/productCard/ProductCard";
import FiltersSortPanel from "../shared/filtersSortPanel/FiltersSortPanel";

const SECTION_ID = "favorites-page-list";

export default function FavoritesList() {
  const { favorites } = useFavoritesStore();

  const itemsPerPage = useFavoritesItemsPerPage();

  console.log(favorites);

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return <Loader />;

  return (
    <Container>
      <FiltersSortPanel />
      {!favorites || !favorites?.length ? (
        <NoItems />
      ) : (
        <div>
          <Pagination
            items={favorites}
            scrollTargetId={SECTION_ID}
            useItemsPerPage={() => itemsPerPage}
            renderItems={(currentItems) => (
              <ul
                id={SECTION_ID}
                className="flex flex-row flex-wrap gap-x-4 gap-y-8 lg:gap-y-10"
              >
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
