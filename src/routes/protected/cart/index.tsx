import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { ProductRowCard } from '@/modules/cart/components/ProductRowCard'
import { getCartItems } from '@/modules/cart/services/cart-api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeftIcon, ChevronRight, Heart, Info, Minus, Package, Plus, ShieldCheck, ShoppingBag, Trash2, Truck } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/protected/cart/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, isFetching } = useQuery({
    queryKey: ['cart-items'],
    queryFn: async () => {
      const response = await getCartItems()
      return response;
    },
  })

  return (
    <div className="px-4 py-6 md:py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold sm:text-3xl">Mi carrito</h1>
        {/* <span className="text-sm text-muted-foreground">{data.length} productos</span> */}
      </div>

      {data?.data?.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Tu carrito está vacío</h2>
          <p className="text-center text-muted-foreground">
            Parece que aún no has añadido ningún producto a tu carrito.
          </p>
          <Link to='/products'>
            <Button>Explorar productos</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Columna izquierda - Productos */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Productos</CardTitle>
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground">
                    Vaciar carrito
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="space-y-6">
                  {data?.data?.map((item) => (
                    <ProductRowCard key={item.id} {...item} />
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t px-4 py-4 sm:px-6">
                <Link to="/products">
                  <Button variant="outline" size="sm" className="gap-1">
                    <ArrowLeftIcon className="h-4 w-4" />
                    Seguir comprando
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* Columna derecha - Resumen */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="px-4 py-4 sm:px-6">
                <CardTitle className="text-lg">Resumen del pedido</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 space-y-4">
                {/* Resumen de costos */}
                <div className="space-y-2">
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${data?.meta?.total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 border-t px-4 py-4 sm:px-6">
                <Button disabled={isFetching} className="w-full">
                  <Link to="/protected/payment" className="w-full">
                    Proceder al pago
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Información adicional */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-2 text-sm">
                    <Truck className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="font-medium">Envío gratis</span>
                      <p className="text-xs text-muted-foreground">En compras mayores a $50</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 text-sm">
                    <Package className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="font-medium">Devoluciones gratuitas</span>
                      <p className="text-xs text-muted-foreground">Dentro de los 30 días</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 text-sm">
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="font-medium">Compra segura</span>
                      <p className="text-xs text-muted-foreground">Pago seguro y encriptado</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 text-sm">
                    <Info className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="font-medium">¿Necesitas ayuda?</span>
                      <p className="text-xs text-muted-foreground">Llama al (800) 123-4567</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
