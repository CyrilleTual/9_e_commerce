"use client";
import { useShopStore } from "@/store/useShopStore";
import { useCartStore } from "@/store/useCartStore";
import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import Cart from "@/components/Cart";

export default function ProductsList() {
  const items = useShopStore((state) => state.items);
  const getProductList = useShopStore((state) => state.getProductList);
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.cartItems);

  useEffect(() => {
    if (items.length === 0) {
      getProductList();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, cartItems]);

  return (
    <>
      <div className="relative px-6">
        <h1 className="text-slate-100 text-2xl mb-6">Here are our products</h1>
        <div className=" fixed top-3 right-3">
               <Cart/>
        </div>
     
        <ul className="grid min-[500px]:grid-cols-2 md:grid-cols-3 gap-4">
          {items.length > 0 &&
            items.map((item, index) => (
              <li
                key={index}
                className="flex flex-col items-center justify-center bg-slate-300 p-4 rounded-lg"
              >
                <Image
                  src={`/images/${item.img}.png`}
                  alt={item.title}
                  width={200}
                  height={200}
                />
                <div className="flex  w-full flex-row justify-between items-center mb-6">
                  <h2 className=" inline-block text-slate-700 text-lg mt-4">
                    {item.title}
                  </h2>
                  <p className=" text-slate-900 font-bold  mt-4">
                    ${item.price}
                  </p>
                </div>
                <Button
                  className={`${
                    item.picked
                      ? "bg-green-600 hover:bg-green700"
                      : "bg-slate-600"
                  } " flex w-full  text-center mt-4 cursor-pointer "`}
                  onClick={() => addToCart(item)}
                >
                  {!item.picked ? (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add to cart
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Item picked
                    </>
                  )}
                </Button>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
