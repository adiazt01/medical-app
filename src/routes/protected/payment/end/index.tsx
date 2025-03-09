import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { createFileRoute, Link } from '@tanstack/react-router'
import { CheckCircle2, Download, Home, Package, Printer, ShoppingBag, Truck } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/protected/payment/end/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [orderNumber, setOrderNumber] = useState("")

  // Generar un número de orden aleatorio al cargar la página
  useEffect(() => {
    const randomOrderNumber = Math.floor(100000000 + Math.random() * 900000000).toString()
    const formattedOrderNumber = `ORD-${randomOrderNumber.substring(0, 3)}-${randomOrderNumber.substring(3, 6)}-${randomOrderNumber.substring(6)}`
    setOrderNumber(formattedOrderNumber)
  }, [])

  // Datos de ejemplo del pedido
  const orderSummary = {
    date: new Date().toLocaleDateString(),
    items: [
      {
        id: 1,
        name: "Vitamina C 1000mg con Zinc y Vitamina D",
        quantity: 2,
        price: 24.99,
      },
      {
        id: 2,
        name: "Termómetro Digital",
        quantity: 1,
        price: 12.99,
      },
      {
        id: 3,
        name: "Gel Antibacterial 500ml",
        quantity: 3,
        price: 8.99,
      },
    ],
    subtotal: 89.94,
    discount: 8.99, // 10% de descuento
    shipping: 0, // Envío gratis
    tax: 12.95, // 16% de impuesto
    total: 93.9,
    paymentMethod: "Tarjeta de crédito terminada en 3456",
    shippingAddress: {
      name: "Juan Pérez",
      address: "Calle Principal 123, Colonia Centro",
      city: "Ciudad de México",
      postalCode: "06000",
      country: "México",
      phone: "(55) 1234-5678",
    },
    shippingMethod: "Envío estándar (3-5 días hábiles)",
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  }

  return (
    <div className="container px-4 py-6 md:py-8">
      <div className="mb-8 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold sm:text-3xl">¡Pedido confirmado!</h1>
        <p className="mt-2 text-muted-foreground">
          Gracias por tu compra. Hemos recibido tu pedido y lo estamos procesando.
        </p>
        <p className="mt-1 font-medium">
          Número de pedido: <span className="text-primary">{orderNumber}</span>
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Columna izquierda - Detalles del pedido */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detalles del pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Estado del pedido */}
              <div className="rounded-md bg-muted/50 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    <span className="font-medium">Estado del pedido: Confirmado</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Fecha del pedido: {orderSummary.date}</div>
                </div>
                <div className="mt-4 relative">
                  <div className="flex justify-between mb-2">
                    <div className="text-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>
                      <span className="mt-1 block text-xs">Confirmado</span>
                    </div>
                    <div className="text-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <Package className="h-4 w-4" />
                      </div>
                      <span className="mt-1 block text-xs">Procesando</span>
                    </div>
                    <div className="text-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <Truck className="h-4 w-4" />
                      </div>
                      <span className="mt-1 block text-xs">Enviado</span>
                    </div>
                    <div className="text-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <Home className="h-4 w-4" />
                      </div>
                      <span className="mt-1 block text-xs">Entregado</span>
                    </div>
                  </div>
                  <div className="absolute left-0 right-0 top-4 h-0.5 bg-muted">
                    <div className="h-full w-[12.5%] bg-primary"></div>
                  </div>
                </div>
              </div>

              {/* Productos */}
              <div className="space-y-4">
                <h3 className="font-medium">Productos</h3>
                {orderSummary.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                    <div className="h-16 w-16 overflow-hidden rounded-md border">
                      <img
                        src={`/placeholder.svg?height=64&width=64&text=Producto+${item.id}`}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <div className="mt-1 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Cantidad: {item.quantity}</span>
                        <span className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Información de envío */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="font-medium">Dirección de envío</h3>
                  <div className="rounded-md bg-muted/50 p-3 text-sm">
                    <p>{orderSummary.shippingAddress.name}</p>
                    <p>{orderSummary.shippingAddress.address}</p>
                    <p>
                      {orderSummary.shippingAddress.city}, {orderSummary.shippingAddress.postalCode}
                    </p>
                    <p>{orderSummary.shippingAddress.country}</p>
                    <p>Teléfono: {orderSummary.shippingAddress.phone}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Método de envío</h3>
                  <div className="rounded-md bg-muted/50 p-3 text-sm">
                    <p>{orderSummary.shippingMethod}</p>
                    <p>Entrega estimada: {orderSummary.estimatedDelivery}</p>
                  </div>
                </div>
              </div>

              {/* Método de pago */}
              <div className="space-y-2">
                <h3 className="font-medium">Método de pago</h3>
                <div className="rounded-md bg-muted/50 p-3 text-sm">
                  <p>{orderSummary.paymentMethod}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3 border-t">
              <Button variant="outline" className="w-full sm:w-auto gap-1">
                <Printer className="h-4 w-4" />
                Imprimir recibo
              </Button>
              <Button variant="outline" className="w-full sm:w-auto gap-1">
                <Download className="h-4 w-4" />
                Descargar factura
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Columna derecha - Resumen y acciones */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumen del pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Costos */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                {orderSummary.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Descuento (10%)</span>
                    <span>-${orderSummary.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Envío</span>
                  <span>{orderSummary.shipping > 0 ? `$${orderSummary.shipping.toFixed(2)}` : "Gratis"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Impuestos (16%)</span>
                  <span>${orderSummary.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${orderSummary.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 border-t">
              <Link href="/medicine-ecommerce" className="w-full">
                <Button className="w-full gap-1">
                  <ShoppingBag className="h-4 w-4" />
                  Seguir comprando
                </Button>
              </Link>
              <Link href="#" className="w-full">
                <Button variant="outline" className="w-full">
                  Rastrear pedido
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Información adicional */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <h3 className="font-medium">¿Necesitas ayuda?</h3>
              <div className="space-y-3 text-sm">
                <p>Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos:</p>
                <div className="space-y-1">
                  <p>
                    Email: <span className="font-medium">soporte@medimart.com</span>
                  </p>
                  <p>
                    Teléfono: <span className="font-medium">(800) 123-4567</span>
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Horario de atención: Lunes a Domingo de 8:00 AM a 10:00 PM
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
