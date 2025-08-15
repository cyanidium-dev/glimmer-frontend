"use client";
import { Product } from "@/types/product";
import ProductCard from "../shared/productCard/ProductCard";
import Pagination from "../shared/pagination/Pagination";
import { useCatalogItemsPerPage } from "@/hooks/useCatalogItemsPerPage";

interface CatalogListProps {
  currentProducts: Product[];
}

export default function CatalogList({ currentProducts }: CatalogListProps) {
  const itemsPerPage = useCatalogItemsPerPage();
  console.log(currentProducts);
  return (
    <div className="w-full">
      <Pagination
        items={currentProducts}
        useItemsPerPage={() => itemsPerPage}
        renderItems={(currentItems) => (
          <ul className="flex flex-row flex-wrap gap-x-4 gap-y-8 lg:gap-y-10 xl:gap-y-15">
            {currentItems.map((product) => (
              <li
                key={product?.id}
                className="h-full w-[calc(50%-8px)] sm:w-[calc(33.33%-10.67px)] md:w-[calc(25%-12px)]"
              >
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      />
    </div>
  );
}
