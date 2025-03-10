import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "@/modules/core/components/Image";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Heart, InfoIcon, Minus, Plus, Share2, ShoppingCart, Star, Truck } from "lucide-react";
import { useState } from "react";
import { useQuery } from '@tanstack/react-query'
import { getProduct } from "@/modules/products/services/medicines-api";


export const Route = createFileRoute('/products/$productId')({
    component: ProductPage,
    loader: async ({ params }) => {
        console.log('Loading product', params.productId);
        return `Product ID: ${params.productId}`;
    }
})


function ProductPage() {
    const {productId} = useParams({from: "/products/$productId"})
    const {data, isFetching} = useQuery({
        queryKey: ["products", productId],
        queryFn: async ()=>{
            const response = await getProduct(Number(productId))
            return response
        }
    });
    
    console.log("HOLA: yo soy el objeto: ",data)
    if(!data){
        return <>Loading...</>
    }

    

    // Sucursales de ejemplo
    const branches = [
        { id: 1, name: "Sucursal Centro", stock: 15, address: "Av. Principal 123, Centro" },
        { id: 2, name: "Sucursal Norte", stock: 8, address: "Blvd. Norte 456, Zona Industrial" },
        { id: 3, name: "Sucursal Sur", stock: 0, address: "Calle Sur 789, Residencial Las Palmas" },
        { id: 4, name: "Sucursal Este", stock: 22, address: "Av. Oriente 234, Plaza Comercial" },
        { id: 5, name: "Sucursal Oeste", stock: 0, address: "Calle Poniente 567, Centro Comercial Oeste" },
    ]


    return (
        <div className="container px-4 py-6 md:py-8">

            {/* Contenido principal */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Galería de imágenes */}
                <div className="md:col-span-1">
                    <div className="mb-3 overflow-hidden rounded-lg border">
                        <Image
                            queryKey="productImage"
                            file={data.file}
                            alt={data.name}
                        />
                    </div>
                    {/* Pestañas de información adicional */}
            <div className="mt-8">
                <Tabs defaultValue="description">
                    <TabsContent value="description" className="mt-4">
                        <Card>
                            <CardContent className="p-4 sm:p-6">
                               
                                    <div>
                                        <h3 className="text-lg font-medium">Descripción detallada</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {data.mainComponent.name}
                                        </p>
                                        
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    
                </Tabs>
            </div>
                </div>

                {/* Información del producto */}
                <div className="md:col-span-1 lg:col-span-2">
                    <div className="space-y-4">
                        <div>
                            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{data.name}</h1>
                            
                        </div>

                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold">${data.price}</span>
                            
                            <Badge variant="outline" className="ml-2 text-xs text-green-600">
                                Envío gratis
                            </Badge>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">{data.description}</p>
                        </div>

                        <div>
                            <h3 className="mb-2 font-medium">Accion Terapeutica:</h3>
                            <p>{data.therapeuticAction.name}</p>
                        </div>

                        <Separator />

                        {/* Información de disponibilidad */}
                        <div className="space-y-3">
                            <h3 className="font-medium">Disponibilidad por sucursal:</h3>
                            <div className="grid gap-2 sm:grid-cols-2">
                                {branches.map((branch) => (
                                    <div key={branch.id} className="rounded-md border p-2">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-sm">{branch.name}</span>
                                            {branch.stock > 0 ? (
                                                <Badge variant="outline" className="bg-green-50 text-green-600">
                                                    {branch.stock} disponibles
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="bg-red-50 text-red-600">
                                                    Agotado
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="mt-1 text-xs text-muted-foreground">{branch.address}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <div className="flex flex-row gap-2 sm:flex-row items-center">
                                <Button className="flex-1 gap-2">
                                    <ShoppingCart className="h-4 w-3" />
                                    Agregar al carrito
                                </Button>

                                <span className="mr-2 text-sm font-medium">Cantidad:</span>

                                <div className="flex items-center">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 rounded-r-none"
                                      
                                    >
                                        <Minus className="h-3 w-3" />
                                    </Button>
                                    <Input
                                        type="number"
                                        min="1"
                                  
                                        className="h-8 w-12 rounded-none border-x-0 text-center"
                                    />
                                    <Button
                                    variant="outline"
                                     size="icon" className="h-8 w-8 rounded-l-none"
                                
                                      >
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
