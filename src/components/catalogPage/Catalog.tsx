"use client";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/product";
import Container from "../shared/container/Container";
import FiltersSortPanel from "../shared/filtersSortPanel/FiltersSortPanel";
import TabMenu from "./TabMenu";
import CatalogList from "./CatalogList";
import Image from "next/image";
import { filterProducts } from "@/utils/filterProducts";
import { sortProducts } from "@/utils/sortProducts";

interface CatalogProps {
  catalogBanner?: { imageCatalog: string; link?: string };
  allProducts: Product[];
  subcategories?: {
    genreSlug: string;
    genreTitle: string;
    products: Product[];
  }[];
}

export default function Catalog({
  catalogBanner,
  allProducts,
  subcategories,
}: CatalogProps) {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter") || "all";
  const sortParam = searchParams.get("sort") || "default";

  const currentProducts = subcategories ? allProducts : allProducts;

  const filteredProducts = useMemo(() => {
    return filterProducts(currentProducts, filterParam);
  }, [currentProducts, filterParam]);

  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortParam);
  }, [filteredProducts, sortParam]);

  return (
    <section className="pb-8 lg:pb-10">
      <Container>
        <div className="xl:pl-[268px]">
          {subcategories ? <TabMenu /> : null}
          <FiltersSortPanel />
        </div>
        <div className="flex xl:gap-7 pt-8 lg:pt-10">
          {catalogBanner ? (
            <div className="hidden xl:block shrink-0">
              <Image
                src={catalogBanner?.imageCatalog}
                alt="banner"
                width={240}
                height={619}
              />
            </div>
          ) : null}
          <CatalogList currentProducts={sortedProducts} />
        </div>
      </Container>
    </section>
  );
}
