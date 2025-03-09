import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { QueryKeys } from "@/config/query-key";
import { getImage } from "@/supabase/supabase";
import { useQuery } from "@tanstack/react-query";
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
                
            </div>
            <CardContent className="p-2 sm:p-4">
                <div className="mb-1 text-xs text-muted-foreground">{brand}</div>
                <h3 className="line-clamp-2 text-xs font-semibold sm:text-sm">{name}</h3>
               
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