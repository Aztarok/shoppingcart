"use client"

import { useCartStore } from "@/store/cartStore"
import { ChevronLeft} from "lucide-react"
import Link from "next/link"

export function BackButton() {
    const {toggleCart} = useCartStore()
    return (
        <Link
            href="/"
            className="flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
            onClick={() => toggleCart(false)}
        >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Products
        </Link>
    )
}