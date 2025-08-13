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
}

interface CartStore {
  cart: CartItem[];
  promoCode: PromoCode | null;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string, discountPercent: number) => void;
  removePromoCode: () => void;
  getCartTotal: () => number;
  getPromoDiscountTotal: () => number;
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

      clearCart: () => set({ cart: [], promoCode: null }),

      // Застосування промокоду
      applyPromoCode: (code: string, discountPercent: number) => {
        set({ promoCode: { code, discountPercent } });
      },

      removePromoCode: () => set({ promoCode: null }),

      getCartTotal: () => {
        const { cart, promoCode } = get();
        return cart.reduce((sum, item) => {
          const price = item.product.discountPrice ?? item.product.price;
          const discountedPrice = promoCode
            ? price * (1 - promoCode.discountPercent / 100)
            : price;
          return sum + discountedPrice * item.quantity;
        }, 0);
      },

      getPromoDiscountTotal: () => {
        const { cart, promoCode } = get();
        if (!promoCode) return 0;
        return cart.reduce((sum, item) => {
          const price = item.product.discountPrice ?? item.product.price;
          const discount = price * (promoCode.discountPercent / 100);
          return sum + discount * item.quantity;
        }, 0);
      },
    }),
    {
      name: "glimmer-cart-storage",
    }
  )
);
