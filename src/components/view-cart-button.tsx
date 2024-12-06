"use client"
import { ShoppingBasket } from "lucide-react"
import { Button } from "./ui/button"
import { useCartStore } from "@/store/cartStore"

export const ViewCartButton = () => {
    const {toggleCart} = useCartStore()
    return (
        <Button
            variant="ghost"
            className="text-white fixed top-5 right-36 m-4"
            onClick={() => toggleCart()}
            >
            <p className="font-semibold">View Cart</p>
            <ShoppingBasket className="size-5" />
        </Button>
    )
}