import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Link } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, Check, ChevronRight, CreditCard, Lock, ShieldCheck } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/protected/payment/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [savePaymentInfo, setSavePaymentInfo] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Datos de ejemplo del pedido
  const orderSummary = {
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
  }

  // Simular procesamiento de pago
  const processPayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      window.location.href = "/order-confirmation" // Redirección simulada
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="container px-4">
          {/* Indicador de progreso */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                  1
                </div>
                <span className="ml-2">Carrito</span>
                <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
              </div>
              <div className="flex items-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                  2
                </div>
                <span className="ml-2">Envío</span>
                <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />
              </div>
              <div className="flex items-center">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  3
                </div>
                <span className="ml-2 font-medium">Pago</span>
              </div>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: "100%" }}></div>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-6">Finalizar compra</h1>

          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {/* Columna izquierda - Formulario de pago */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Lock className="h-4 w-4" />
                    Información de pago
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Selección de método de pago */}
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                    <div className="flex items-start space-x-3 rounded-md border p-3">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <div className="flex flex-1 items-start justify-between">
                        <Label htmlFor="credit-card" className="flex flex-col cursor-pointer">
                          <span className="font-medium">Tarjeta de crédito/débito</span>
                          <span className="text-sm text-muted-foreground">Pago seguro con tarjeta</span>
                        </Label>
                        <div className="flex gap-1">
                          <img
                            src="/placeholder.svg?height=24&width=36&text=VISA"
                            alt="Visa"
                            className="h-6 w-9 rounded-sm border"
                          />
                          <img
                            src="/placeholder.svg?height=24&width=36&text=MC"
                            alt="Mastercard"
                            className="h-6 w-9 rounded-sm border"
                          />
                          <img
                            src="/placeholder.svg?height=24&width=36&text=AMEX"
                            alt="American Express"
                            className="h-6 w-9 rounded-sm border"
                          />
                        </div>
                      </div>
                    </div>

                    {paymentMethod === "credit-card" && (
                      <div className="rounded-md border p-4 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-holder">Nombre del titular</Label>
                          <Input id="card-holder" placeholder="Como aparece en la tarjeta" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Número de tarjeta</Label>
                          <div className="relative">
                            <Input id="card-number" placeholder="1234 5678 9012 3456" />
                            <CreditCard className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry-date">Fecha de expiración</Label>
                            <Input id="expiry-date" placeholder="MM/AA" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">Código de seguridad (CVV)</Label>
                            <Input id="cvv" placeholder="123" type="password" />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="save-card"
                            checked={savePaymentInfo}
                            onCheckedChange={(checked) => setSavePaymentInfo(checked as boolean)}
                          />
                          <Label htmlFor="save-card" className="text-sm">
                            Guardar esta tarjeta para futuras compras
                          </Label>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start space-x-3 rounded-md border p-3">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <div className="flex flex-1 items-start justify-between">
                        <Label htmlFor="paypal" className="flex flex-col cursor-pointer">
                          <span className="font-medium">PayPal</span>
                          <span className="text-sm text-muted-foreground">Pago rápido y seguro</span>
                        </Label>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-12" fill="#00457C">
                          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.568 4.92-5.75 5.51a14.27 14.27 0 0 1-3.37.366H9.936c-.524 0-.968.382-1.05.9l-.813 5.17a.642.642 0 0 0 .633.739h3.38c.524 0 .968-.382 1.05-.9l.453-2.866a1.16 1.16 0 0 1 1.05-.9h.698c4.297 0 7.664-1.747 8.646-6.797.406-2.08.169-3.73-.762-4.936z" />
                        </svg>
                      </div>
                    </div>

                    {paymentMethod === "paypal" && (
                      <div className="rounded-md border p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-3">
                          Serás redirigido a PayPal para completar tu pago de forma segura.
                        </p>
                        <img
                          src="/placeholder.svg?height=40&width=150&text=PayPal+Checkout"
                          alt="PayPal Checkout"
                          className="mx-auto h-10 w-40"
                        />
                      </div>
                    )}

                    <div className="flex items-start space-x-3 rounded-md border p-3">
                      <RadioGroupItem value="cash-on-delivery" id="cash-on-delivery" />
                      <div className="flex flex-1 items-start justify-between">
                        <Label htmlFor="cash-on-delivery" className="flex flex-col cursor-pointer">
                          <span className="font-medium">Pago contra entrega</span>
                          <span className="text-sm text-muted-foreground">Paga en efectivo al recibir tu pedido</span>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {/* Información de seguridad */}
                  <div className="rounded-md bg-muted/50 p-3">
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Pago 100% seguro</h3>
                        <p className="text-sm text-muted-foreground">
                          Tus datos están protegidos con encriptación SSL de 256 bits. No almacenamos los datos
                          completos de tu tarjeta.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t">
                  <Link href="/checkout-view">
                    <Button variant="outline" className="gap-1">
                      <ArrowLeft className="h-4 w-4" />
                      Volver
                    </Button>
                  </Link>
                  <Button onClick={processPayment} disabled={isProcessing} className="gap-1">
                    {isProcessing ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        Finalizar compra
                        <Check className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Columna derecha - Resumen del pedido */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Resumen del pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Productos */}
                  <div className="space-y-3">
                    {orderSummary.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>
                          {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

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

                  {/* Dirección de envío */}
                  <div className="space-y-2 rounded-md bg-muted/50 p-3">
                    <h3 className="text-sm font-medium">Dirección de envío</h3>
                    <div className="text-xs text-muted-foreground">
                      <p>Juan Pérez</p>
                      <p>Calle Principal 123, Colonia Centro</p>
                      <p>Ciudad de México, 06000</p>
                      <p>México</p>
                      <p>Teléfono: (55) 1234-5678</p>
                    </div>
                    <Link href="/checkout-view" className="text-xs text-primary hover:underline">
                      Cambiar
                    </Link>
                  </div>

                  {/* Método de envío */}
                  <div className="space-y-2 rounded-md bg-muted/50 p-3">
                    <h3 className="text-sm font-medium">Método de envío</h3>
                    <div className="text-xs text-muted-foreground">
                      <p>Envío estándar (3-5 días hábiles)</p>
                      <p>Gratis</p>
                    </div>
                    <Link href="/checkout-view" className="text-xs text-primary hover:underline">
                      Cambiar
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Políticas y ayuda */}
              <Card>
                <CardContent className="p-4 space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-green-600" />
                    <span>Garantía de devolución de 30 días</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-green-600" />
                    <span>Envío gratis en compras mayores a $50</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-green-600" />
                    <span>Atención al cliente 24/7</span>
                  </div>
                  <Separator />
                  <p className="text-xs text-muted-foreground">
                    Al finalizar tu compra, aceptas nuestros{" "}
                    <Link href="#" className="text-primary hover:underline">
                      Términos y Condiciones
                    </Link>{" "}
                    y{" "}
                    <Link href="#" className="text-primary hover:underline">
                      Política de Privacidad
                    </Link>
                    .
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Footer simplificado */}
      <footer className="border-t bg-background mt-8">
        <div className="container px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2025 MediMart. Todos los derechos reservados.</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="#" className="hover:text-foreground">
              Política de Privacidad
            </Link>
            <Link href="#" className="hover:text-foreground">
              Términos de Servicio
            </Link>
            <Link href="#" className="hover:text-foreground">
              Ayuda
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

