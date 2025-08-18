import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types/cartItem";
import { PromoCode } from "./cartStore";

interface OrderData {
  orderNumber: string;
  orderDate: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  deliveryService: string;
  deliveryType: string;
  city: string;
  branchNumber?: string;
  address?: string;
  payment: string;
  message?: string;
  cart: CartItem[];
  promoCode: PromoCode | null;
  totalOrderSum: number;
}

interface OrderStore {
  order: OrderData | null;
  setOrder: (order: OrderData) => void;
  clearOrder: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      order: null,
      setOrder: (order) => set({ order }),
      clearOrder: () => set({ order: null }),
    }),
    {
      name: "glimmer-order-storage",
    }
  )
);
