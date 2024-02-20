import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { useCartStore } from "@/store/useCartStore";
import { useShopStore } from "@/store/useShopStore";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";

export default function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const resetPicked = useShopStore((state) => state.resetPicked);

  const items = useShopStore((state) => state.items);

  const clearCart = useCartStore((state) => state.clearCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const total = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  //function to handle the change of quantity of an item in the cart
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>, item: any) => {
    //change the quantity of the item in the cart
    const newCartItems = cartItems.map((i) => {
      if (i.id === item) {
        return { ...i, quantity: parseInt(e.target.value) };
      }
      return i;
    });
    useCartStore.setState({ cartItems: newCartItems });
  };

  // function to calcualte the total of the cart
  const calculateTotal = () => {
    const total = cartItems.reduce((acc, curr) => {
      const item = items.find((i) => i.id === curr.id);
      if (item) {
        return acc + item.price * curr.quantity;
      }
      return acc;
    }, 0);
    return total;
  };

  // function to handle the checkout

  const handleCheckOut = () => {
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
    });
    clearCart();
    resetPicked();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-slate-600 text-white p-2 rounded-lg">
          <ShoppingCart className="pr-2" /> Vue your cart : {total}
        </Button>
      </DialogTrigger>

      <DialogContent className=" bg-slate-300 text-slate-900 min-w-[400px] md:min-w-[700px] px-10 pt-10 pb-6 border-slate-600">
        <DialogClose asChild>
          <Button className="absolute top-2 right-2 w-7 h-7 bg-red-600 text-slate-100 flex justify-center items-center z-40">
            X
          </Button>
        </DialogClose>

        <DialogHeader>
          <DialogTitle>Here is your cart</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        {/* ici on affiche les articles du cart */}

        {cartItems.length > 0 ? (
          <>
            <ul>
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center mb-2"
                >
                  <div className="flex   items-center w-[250px] overflow-x-clip">
                    <Image
                      src={`/images/${
                        items.find((i) => i.id === item.id)?.img
                      }.png`}
                      alt={items.find((i) => i.id === item.id)?.title || ""}
                      width={100}
                      height={100}
                      className="rounded-lg w-16 h-16 mr-2"
                    />
                    <p>{items.find((i) => i.id === item.id)?.title}</p>
                  </div>

                  <div className="">
                    <span>quantity : </span>
                    <select
                      className="bg-slate-600 text-right text-slate-100 px-1 min-w-[50px] rounded-lg"
                      name="quantity"
                      onChange={(e) => handleChange(e, item.id)}
                      value={item.quantity}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>

                  <Button
                    className="bg-red-600 text-slate-100 px-2 rounded-lg"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove from cart
                  </Button>
                </li>
              ))}
            </ul>

            <div className="  font-bold">
              Your total : {String(calculateTotal().toFixed(2))} ${" "}
            </div>

            <Button
              className="w-[200px] m-auto "
              onClick={() => handleCheckOut()}
            >
              CheckOut
            </Button>
          </>
        ) : (
          <p>Your cart is empty</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
