import { create } from "zustand";
import { useShopStore } from "./useShopStore";

type Item = {
  id: number;
  quantity: number;
};

interface CartStore {
  cartItems: Item[] | [];
  addToCart: (item: any) => void;
  removeFromCart: (item: any) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cartItems: [],
  addToCart: (item) => {
    // check if item is already in cart
    const isItemInCart = get().cartItems.some((i) => i.id === item.id);

    // if item is in cart, do nothing else add it to cart
    if (isItemInCart) {
      return; // do nothing;
    } else {
      const toAdd = { id: item.id, quantity: 1 };
      set((state) => ({
        cartItems: [...state.cartItems, toAdd],
      }));

      // update status of item to picked in the shopStore
      useShopStore.setState((state) => {
        const itemIndex = state.items.findIndex((i) => i.id === item.id);
        state.items[itemIndex].picked = true;
        return state; // Return the updated state
      });
    }
  },
  removeFromCart: (item) => {
    set((state) => ({
      cartItems: state.cartItems.filter((i) => i.id !== item.id),
    }));
    // update status of item to picked in the shopStore
    useShopStore.setState((state) => {
      const itemIndex = state.items.findIndex((i) => i.id === item.id);
      state.items[itemIndex].picked = false;
      return state; // Return the updated state
    });
  },
  clearCart: () => {
    set({ cartItems: [] });
  },
}));
