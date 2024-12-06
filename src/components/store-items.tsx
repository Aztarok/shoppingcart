"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "./ui/card";
import { useState } from "react";
import ChangePages from "./change-pages";
import Link from "next/link";
import { storeItems } from "@/constants/constants";
import { useCartStore } from "@/store/cartStore";
import { usePaginationStore } from "@/store/paginationStore";
import Image from "next/image";

type ItemProps = {
    id: number,
    name: string,
    price: number,
    image: string
}

// Function to filter items based on search query
const filterItems = (items: ItemProps[], query: string) => {
    
    return items.filter((item: ItemProps) =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );
};

export default function StoreItems() {
    const {toggleCart} = useCartStore()
    const [searchQuery, setSearchQuery] = useState("");
    const [items, setItems] = useState(storeItems);
    // const [currentPage, setCurrentPage] = useState(1);
    const {currentPage, setCurrentPage} = usePaginationStore()
    const itemsPerPage = 15

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const filteredItems = filterItems(storeItems, searchQuery);
        setItems(filteredItems);
        setCurrentPage(1);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="container mx-auto px-4 py-8 h-full relative flex flex-col">
            <form onSubmit={handleSearch} className="mb-8">
                <div className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Search for items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-grow"
                    />
                    <Button type="submit">
                        <SearchIcon className="mr-2 h-4 w-4" /> Search
                    </Button>
                </div>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {currentItems.map((item) => (
                    <Link key={item.id} href={`/product/${item.id}`} onClick={() => toggleCart(false)}>
                        <Card className="flex flex-col justify-between">
                            <CardHeader>
                                <CardTitle className="text-sm truncate">
                                    {item.name}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative my-2 mx-5 h-40">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    objectFit="cover"
                                    className="border-2 border-slate-400 rounded-md"
                                />
                            </CardContent>
                            <CardFooter>
                                <p className="font-bold">${item.price}</p>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
            <div className="mt-auto py-4 flex w-full justify-center">
                <ChangePages
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalItems={items.length}
                    itemsPerPage={itemsPerPage}
                />
            </div>
        </div>
    );
}
