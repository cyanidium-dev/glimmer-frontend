import MainButton from "@/components/shared/buttons/MainButton";
import Counter from "./Counter";
import FavoriteButton from "./FavoriteButton";
import { Product } from "@/types/product";

interface OrderProductProps {
  currentProduct: Product;
}

export default function OrderProduct({ currentProduct }: OrderProductProps) {
  const { price, discountPrice } = currentProduct;

  return (
    <div className="py-4 lg:py-6 border-t border-black/60">
      <div className="flex justify-between mb-4 lg:mb-[18px]">
        {discountPrice && discountPrice < price ? (
          <div className="flex flex-col lg:gap-2 shrink-0">
            <span className="line-through">{price} грн</span>
            <div className="flex items-end gap-4">
              <span className="text-[20px] lg:text-[32px] font-semibold leading-[120%] text-accent">
                {discountPrice} грн
              </span>
              <div className="p-1 text-[18px] lg:text-[24px] font-semibold leading-[120%] text-white bg-accent rounded-[12px]">
                {Math.round(((discountPrice - price) / price) * 100)}%
              </div>
            </div>
          </div>
        ) : (
          <p className="text-[20px] lg:text-[32px] font-semibold shrink-0 leading-none">
            {price} грн
          </p>
        )}
        <Counter />
      </div>
      <div className="flex justify-between gap-4">
        <FavoriteButton currentProduct={currentProduct} />
        <MainButton className="h-[45px] lg:max-w-[170px]">Купити</MainButton>
      </div>
    </div>
  );
}
