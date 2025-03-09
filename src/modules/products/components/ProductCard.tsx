import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { QueryKeys } from "@/config/query-key";
import { getImage } from "@/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
import { Heart, ShoppingCart } from "lucide-react";
import { IProduct } from "../interface/product-interface";
import { Link } from "@tanstack/react-router";

export function ProductCard({ id, file, name, brand, rating, reviewCount, price, originalPrice, discount, inStock, availableBranches }: IProduct) {
    const { path: image } = file

    // Image component - Supabase
    const { data, isLoading } = useQuery({
        queryKey: [QueryKeys.products, 'image', id],
        queryFn: () => {
            return getImage(image);
        },
    })

    if (isLoading) {
        return (
            <>
                Loading...
            </>
        )
    }

    return (
        <Card key={id} className="overflow-hidden">
            <div className="relative">
                <img
                    src={data?.publicUrl || "/placeholder.svg"}
                    alt={name}
                    className="aspect-square w-full object-cover"
                    width={200}
                    height={200}
                />
                {discount && (
                    <Badge className="absolute left-2 top-2 bg-primary text-xs">{discount}</Badge>
                )}
                {!inStock && (
                    <Badge variant="secondary" className="absolute left-2 top-2 text-xs">
                        Agotado
                    </Badge>
                )}
                <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-1 top-1 h-7 w-7 rounded-full sm:right-2 sm:top-2 sm:h-8 sm:w-8"
                >
                    <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="sr-only">Agregar a favoritos</span>
                </Button>
            </div>
            <CardContent className="p-2 sm:p-4">
                <div className="mb-1 text-xs text-muted-foreground">{brand}</div>
                <h3 className="line-clamp-2 text-xs font-semibold sm:text-sm">{name}</h3>
                <div className="mt-1 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={`h-3 w-3 ${i < rating ? "text-yellow-500" : "text-muted-foreground opacity-25"
                                }`}
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                            />
                        </svg>
                    ))}
                    <span className="text-[10px] text-muted-foreground">({reviewCount})</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs font-bold sm:text-sm">${price}</span>
                    {originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">${originalPrice}</span>
                    )}
                </div>
            </CardContent>
            <CardFooter className="p-2 pt-0 sm:p-4 sm:pt-0">
                <Button asChild>
                    <Link to="/products/$productId" params={{
                        productId: id.toString()
                    }}>
                        Ver detalles
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}