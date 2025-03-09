import { IProduct } from "../../interface/product-interface";
import { ProductCard } from "../ProductCard";
import { ProductCardSkeleton } from "../skeletons/ProductCardSkeleton";

interface IProductCardListProps {
    products: IProduct[] | undefined;
    isLoading: boolean;
}

export function ProductCardList({ products, isLoading }: IProductCardListProps) {
    const isShowLoading = !products && isLoading;

    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {!isShowLoading && products?.map((product) => (
                <ProductCard key={product.id} {...product} />
            ))}
            {isShowLoading && (
                Array.from({ length: 1 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))
            )}
        </div>
    )
}