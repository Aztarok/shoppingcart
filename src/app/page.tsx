"use client"

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import StoreItems from "@/components/store-items";

export default function Home() {
    return (
        <MaxWidthWrapper className="h-full">
            <StoreItems />
        </MaxWidthWrapper>
    );
}
