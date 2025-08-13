"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Product } from "@/types/product";
import Link from "next/link";
import Container from "../shared/container/Container";
import FiltersSortPanel from "../shared/filtersSortPanel/FiltersSortPanel";
import TabMenu from "./TabMenu";
import CatalogList from "./CatalogList";
import Image from "next/image";
import { filterProducts } from "@/utils/filterProducts";
import { sortProducts } from "@/utils/sortProducts";
import NoItems from "./NoItems";

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
  const hasSubcategories = subcategories && subcategories?.length > 0;

  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter") || "all";
  const sortParam = searchParams.get("sort") || "default";

  const defaultSubcategory = hasSubcategories
    ? subcategories[0]?.genreSlug
    : "";

  const [activeTab, setActiveTab] = useState(defaultSubcategory || "");

  useEffect(() => {
    if (!hasSubcategories) return;

    const currentParam = searchParams.get("subcategory");
    if (currentParam && currentParam !== activeTab) {
      setActiveTab(currentParam);
    }
  }, [searchParams, activeTab, hasSubcategories]);

  useEffect(() => {
    if (!hasSubcategories) return;

    const currentParam = searchParams.get("subcategory");
    if (!currentParam && defaultSubcategory) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("subcategory", defaultSubcategory);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, defaultSubcategory, router, hasSubcategories]);

  const currentSubcategory = subcategories
    ? subcategories?.find((subcategory) => subcategory.genreSlug === activeTab)
    : null;

  const currentProducts = currentSubcategory?.products || allProducts;

  const filteredProducts = useMemo(() => {
    return filterProducts(currentProducts, filterParam);
  }, [currentProducts, filterParam]);

  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, sortParam);
  }, [filteredProducts, sortParam]);

  return (
    <section className="pb-8 lg:pb-10">
      <Container className="relative">
        {sortedProducts?.length > 8 ? (
          <Image
            src="/images/catalogPage/bgImage.svg"
            alt="background"
            width="784"
            height="739"
            className="hidden xl:block absolute top-[940px] left-[-536px] opacity-10 -z-10"
          />
        ) : null}
        <div className="xl:pl-[268px] flex flex-col gap-4">
          {subcategories ? (
            <TabMenu
              subcategories={subcategories}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ) : null}
          <FiltersSortPanel />
        </div>
        <div className="flex xl:gap-7 pt-8 lg:pt-10">
          {catalogBanner ? (
            catalogBanner?.link ? (
              <Link href={catalogBanner?.link}></Link>
            ) : (
              <div className="hidden xl:block shrink-0">
                <Image
                  src={catalogBanner?.imageCatalog}
                  alt="banner"
                  width={240}
                  height={619}
                />
              </div>
            )
          ) : null}
          {sortedProducts?.length ? (
            <CatalogList currentProducts={sortedProducts} />
          ) : (
            <NoItems />
          )}
        </div>
      </Container>
    </section>
  );
}
