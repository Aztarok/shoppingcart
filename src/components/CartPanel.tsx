'use client';

import { useCartStore } from "@/store/cartStore";
import { X } from "lucide-react";
import { toast as sonner } from "sonner";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function CartPanel() {
  
  const { items, isCartOpen, toggleCart, clearCart, removeItemToggle, removeItem, removeFromCart } = useCartStore();
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const removeFromCartHandler = (id: number) => {
    removeFromCart(id)
    removeItemToggle()
  }
  const handleCheckout = () => {
    if (items.length > 0) {
      sonner.success("Purchase Successful!");
    } else {
      sonner.error("No items in cart!");
    }
    clearCart()
  };

  
  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full bg-slate-900 shadow-lg transform ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="p-4 h-[80%] flex flex-col">
        <button onClick={() => toggleCart()} className="text-right right-0 w-full text-slate-400 hover:text-white">
          Close
        </button>
        <h2 className="text-xl font-bold mb-4">Cart Items</h2>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="flex-grow overflow-auto">
            {items.map((item) => (
              <li key={item.id} className="mb-2">
                <div className="flex justify-between items-center">
                  <span>{item.name}</span>
                  {removeItem ? 
                  
                  <Button asChild className="bg-transparent ml-auto cursor-pointer hover:bg-gray-700"
                  onClick={() => removeFromCartHandler(item.id)}>
                    <span>
                      <X className="text-slate-400 hover:text-white" />
                    </span>
                  </Button>
                  : null}

                  <span>{item.quantity} x ${item.price.toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
        {
          items.length > 0 ? 
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="mb-4 bg-blue-800 text-white font-bold tracking-wider hover:bg-blue-600"
            >Cancel Items</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-2">
            <DropdownMenuItem asChild>
              <Button className="cursor-pointer bg-transparent hover:bg-blue-800 text-white" onClick={(() => removeItemToggle())}>
                Cancel One Item
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Button className="cursor-pointer bg-transparent hover:bg-blue-800 text-white" onClick={() => clearCart()}>
                Cancel All Items
              </Button>  
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> : null
        }

        
        <div className="mt-auto flex text-xl justify-between border-t border-slate-700 pt-4">
            <span>
              Cart Total:
            </span>
            <span className="flex font-bold gap-1">
              <p>
                $
              </p>
              {total}
            </span>
          </div>
      </div>
      <div className="mt-20 flex justify-center">
            <Button
            className="bg-green-700 w-[90%] text-white text-lg font-bold p-8 rounded-md hover:bg-green-500"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
      </div>
    </div>
  );
} 