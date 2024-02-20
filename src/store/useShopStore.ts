import axios from 'axios';
import { create } from "zustand";

export type ProductType = {
  title: string;
  price: number;
  img: string;
  picked: boolean;
  id: number;
};

type Items = ProductType[];

interface ShopStore {
    items: Items;
    addProduct: (items: Items) => void;
    getProductList: () => void;
    resetPicked: () => void;
}

export const useShopStore = create<ShopStore>((set) => ({
  items: [],
  addProduct: (items) => {
    set((state) => ({
      items: [...state.items, ...items],
    }));
  },
  getProductList: () => {
      axios
        .get("data/inventory.json")
        .then((res : any) =>  set({ items: res.data.products }))
        .catch((err :any) => console.log(err));
  },
  resetPicked: () => {
    set((state) => ({
      items: state.items.map((item) => ({ ...item, picked: false })),
    }));
  },


})





);
