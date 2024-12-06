'use client';

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";

interface AddToCartButtonProps {
    productId: number;
    productName: string;
    productPrice: number;
}


export default function AddToCartButton({
    productId,
    productName,
    productPrice
}: AddToCartButtonProps) {
    const addToCart = useCartStore((state) => state.addToCart);
    const {toast} = useToast()
    const addToCartHandler = () => {
        addToCart({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        })
        toast({
            title: `${productName} added to cart`,
            description: "Successfully added to your checkout"
        })
    }
    
    return (
        <Button
            size="lg"
            className="w-full md:w-auto text-md font-semibold py-8"
            onClick={() => {addToCartHandler()}}
        >
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
        </Button>
    );
} 