import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
    return (
        <Card className="overflow-hidden">
            <div className="relative">
                <Skeleton className="w-full h-full aspect-square object-cover" />
            </div>
            <CardContent className="p-2 sm:p-4">
                <div className="mb-1 text-xs text-muted-foreground">
                    <Skeleton className="w-[100px] h-[20px]" />
                </div>
                <h3 className="line-clamp-2 text-xs font-semibold sm:text-sm">
                <Skeleton className="w-[100px] h-[20px]" />
                </h3>
                <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs font-bold sm:text-sm">
                        <Skeleton className="w-[50px] h-[20px]" />
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                        <Skeleton className="w-[50px] h-[20px]" />
                    </span>
                </div>
                {/* <div className="mt-1 text-[10px] text-muted-foreground">
                    {inStock ? <span className="text-green-600">En stock</span> : <span>Agotado</span>}
                    {availableBranches.length > 0 && inStock && (
                        <span> - Disponible en {availableBranches.length} sucursales</span>
                    )}
                </div> */}
            </CardContent>
            <CardFooter className="p-2 pt-0 sm:p-4 sm:pt-0">
                <Skeleton className="w-full h-10 "  />
            </CardFooter>
        </Card>
    )
}