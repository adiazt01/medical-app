import { Button } from "@/components/ui/button";
import { CartItem } from "../interface/cart";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "@/modules/core/components/Image";
import { useToast } from "@/modules/core/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCartItem, updateCartItem } from "../services/cart-api";
import { useState } from "react";
import { IMetaDataFindAll } from "@/modules/core/interface/meta-interface";

export const ProductRowCard = (cartItem: CartItem) => {
    const { branchMedicine, quantity: quantityItems, id } = cartItem;
    const { medicine, quantity: stock } = branchMedicine;
    const { file, name, laboratory } = medicine;
    const queryClient = useQueryClient();
    const [quantity, setQuantity] = useState(quantityItems);

    const { toast } = useToast();

    const { mutate, isPending } = useMutation({
        mutationKey: ['cart-items'],
        mutationFn: async (newQuantity: number) => {
            return updateCartItem(id, newQuantity);
        },
        onError: (error) => {
            toast({
                title: 'Error al actualizar cantidad',
                description: error?.response?.data?.message || 'Intente nuevamente',
                variant: 'destructive',
            });
        },
        onSuccess: async ({ quantity }) => {
            await queryClient.fetchQuery({
                queryKey: ['cart-items']
            });
            setQuantity(quantity);
            toast({
                title: 'Cantidad actualizada',
                description: 'La cantidad del producto ha sido actualizada exitosamente',
            });
        },
    });

    const { mutateAsync: removeItemMutate, isPending: isPendingRemoveItem } = useMutation({
        mutationKey: ['cart-items'],
        mutationFn: async () => {
            return removeCartItem(id);
        },
        onMutate: async () => {
            console.log('onMutate')
            await queryClient.cancelQueries({
                queryKey: ['cart-items']
            });
            console.log('onMutate')
            const previousCartItems = queryClient.getQueryData<{
                data: CartItem[]
                meta: IMetaDataFindAll
            }>(['cart-items']);
            console.log(previousCartItems)
            queryClient.setQueryData(['cart-items'], previousCartItems?.data.filter((item) => item.id !== id));

            return { previousCartItems };
        },
        onError: (error, variables, context) => {
            toast({
                title: 'Error al eliminar producto',
                description: error?.response?.data?.message || 'Intente nuevamente',
                variant: 'destructive',
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ['cart-items']
            });
        },
        onSuccess: () => {
            toast({
                title: 'Producto eliminado',
                description: 'El producto ha sido eliminado del carrito',
            });
        },
    });

    return (
        <div
            key={id}
            className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b last:border-0 last:pb-0"
        >
            <div className="rounded-md border border-gray-200 overflow-hidden sm:min-w-36">
                <Image queryKey="cart-items" file={file} alt={name} />
            </div>
            <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                        <h3 className="font-medium line-clamp-2">{name}</h3>
                        <p className="text-sm text-muted-foreground">Laboratorio: {laboratory?.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => mutate(quantity - 1)}
                            disabled={quantity <= 1 || isPending || isPendingRemoveItem}
                        >
                            <Minus className="h-3 w-3" />
                        </Button>
                        <Input
                            type="number"
                            min="1"
                            max={stock}
                            value={quantity}
                            disabled
                            onChange={(e) => mutate(Number.parseInt(e.target.value) || 1)}
                            className="h-8 w-16 text-center"
                        />
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => mutate(quantity + 1)}
                            disabled={quantity >= stock || isPending || isPendingRemoveItem}
                        >
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs text-muted-foreground hover:text-destructive"
                            onClick={() => removeItemMutate()}
                            disabled={isPendingRemoveItem || isPending}
                        >
                            <Trash2 className="mr-1 h-3 w-3" />
                            Eliminar
                        </Button>
                    </div>
                </div>
                <div className="text-xs text-green-600">
                    {stock <= 5 ? (
                        <span>¡Solo quedan {stock} unidades!</span>
                    ) : (
                        <span>En stock en ({stock} disponibles)</span>
                    )}
                </div>
            </div>
        </div>
    )
}