import AddToCartButton from "@/components/AddToCartButton";
import { BackButton } from "@/components/BackButton";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { storeItems } from "@/constants/constants";
import Image from "next/image";

type PageProps = {
    params: Promise<{
        productId?: string;
    }>;
}

export default async function Page({
    params
}: PageProps) {
    const { productId } = await params;
    
    if (!productId) {
        return <div>This product doesn&apos;t exist</div>
    }
    
    const productInfo = storeItems.find(
        (product) => product.id === parseInt(productId)
    );

    if (!productInfo) {
        return <div>Product not found</div>;
    }

    return (
        <MaxWidthWrapper className="py-10">
            <BackButton />
            <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-start">
                {/* Left Section: Image and Details */}
                <div className="space-y-6">
                    <div className="relative aspect-square">
                        <Image
                            src={productInfo.image}
                            alt={productInfo.name}
                            fill
                            className="object-cover rounded-2xl border-2 border-slate-400"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">
                            Product Details
                        </h2>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            <li>High-quality materials</li>
                            <li>Durable construction</li>
                            <li>Easy to clean and maintain</li>
                            <li>Suitable for everyday use</li>
                        </ul>
                    </div>
                </div>

                {/* Right Section: Product Info and Actions */}
                <div className="flex flex-col ml-auto justify-between space-y-6 h-full">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">
                            {productInfo.name}
                        </h1>
                        <p className="text-2xl font-semibold text-primary mb-4">
                            ${productInfo.price.toFixed(2)}
                        </p>
                        <p className="text-muted-foreground">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                        </p>
                    </div>
                    <AddToCartButton
                        productId={productInfo.id}
                        productName={productInfo.name}
                        productPrice={productInfo.price}
                    />
                </div>
            </div>
        </MaxWidthWrapper>
    );
}
