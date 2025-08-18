import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

interface CartItem {
  product: Product;
  quantity: number;
}

interface PromoCode {
  code: string;
  discountPercent: number;
  publishers: { id: string; name: string }[];
}

interface CartStore {
  cart: CartItem[];
  promoCode: PromoCode | null;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  applyPromoCode: (
    code: string,
    discountPercent: number,
    publishers: { id: string; name: string }[]
  ) => void;
  removePromoCode: () => void;
  getCartTotal: () => number;
  getPromoDiscountTotal: () => number;
  getItemFinalPrice: (productId: string) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      promoCode: null,

      addToCart: (product, quantity = 1) => {
        const cart = get().cart.slice();
        const existingItem = cart.find(
          (item) => item.product.id === product.id
        );
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.push({ product, quantity });
        }
        set({ cart });
      },

      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter((item) => item.product.id !== productId),
        });
      },

      updateQuantity: (productId, quantity) => {
        const cart = get().cart.slice();
        const item = cart.find((i) => i.product.id === productId);
        if (item) {
          item.quantity = quantity;
          set({ cart });
        }
      },

      increaseQuantity: (productId) => {
        const cart = get().cart.slice();
        const item = cart.find((i) => i.product.id === productId);
        if (item) {
          item.quantity += 1;
          set({ cart });
        }
      },

      decreaseQuantity: (productId) => {
        const cart = get().cart.slice();
        const item = cart.find((i) => i.product.id === productId);
        if (item && item.quantity > 1) {
          item.quantity -= 1;
          set({ cart });
        }
      },

      clearCart: () => set({ cart: [], promoCode: null }),

      applyPromoCode: (code, discountPercent, publishers) => {
        set({ promoCode: { code, discountPercent, publishers } });
      },

      removePromoCode: () => set({ promoCode: null }),

      getCartTotal: () => {
        const { cart, promoCode } = get();
        return cart.reduce((sum, item) => {
          const basePrice = item.product.discountPrice ?? item.product.price;

          const publisherFeature = item.product.features?.find(
            (f) => f.featureName.toLowerCase() === "видавництво"
          );
          const publisherValue = publisherFeature?.value;

          const isEligible =
            promoCode &&
            publisherValue &&
            promoCode.publishers.some(
              (pub) => pub.name.toLowerCase() === publisherValue.toLowerCase()
            );

          const finalPrice = isEligible
            ? basePrice * (1 - promoCode.discountPercent / 100)
            : basePrice;

          return sum + finalPrice * item.quantity;
        }, 0);
      },

      getPromoDiscountTotal: () => {
        const { cart, promoCode } = get();
        if (!promoCode) return 0;

        return cart.reduce((sum, item) => {
          const basePrice = item.product.discountPrice ?? item.product.price;

          const publisherFeature = item.product.features?.find(
            (f) => f.featureName.toLowerCase() === "видавництво"
          );
          const publisherValue = publisherFeature?.value;

          const isEligible =
            publisherValue &&
            promoCode.publishers.some(
              (pub) => pub.name.toLowerCase() === publisherValue.toLowerCase()
            );

          if (!isEligible) return sum;

          const discount = basePrice * (promoCode.discountPercent / 100);
          return sum + discount * item.quantity;
        }, 0);
      },

      getItemFinalPrice: (productId) => {
        const { cart, promoCode } = get();
        const item = cart.find((i) => i.product.id === productId);
        if (!item) return 0;

        const basePrice = item.product.discountPrice ?? item.product.price;

        const publisherFeature = item.product.features?.find(
          (f) => f.featureName.toLowerCase() === "видавництво"
        );

        const publisherValue = publisherFeature?.value;

        const isEligible =
          promoCode &&
          publisherValue &&
          promoCode.publishers.some(
            (pub) => pub.name.toLowerCase() === publisherValue.toLowerCase()
          );

        return isEligible
          ? basePrice * (1 - promoCode.discountPercent / 100)
          : basePrice;
      },
    }),
    {
      name: "glimmer-cart-storage",
    }
  )
);
