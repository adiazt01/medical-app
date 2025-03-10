import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { Link, redirect, useNavigate } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowLeft, Check, ChevronRight, CreditCard, Lock, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import pagoMovil from "@/assets/pago-movil.jpeg"
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getCartItems } from '@/modules/cart/services/cart-api'
import { createPayment } from '@/modules/payments/services/payments-api'
import { PaymentMethod } from '@/modules/payments/enum/payments'
import { useForm } from '@tanstack/react-form'
import { useToast } from '@/modules/core/hooks/use-toast'

export const Route = createFileRoute('/protected/payment/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CASH)
  const { toast } = useToast()
  const navigate = useNavigate()

  const mutate = useMutation({
    mutationKey: ['create-payment'],
    mutationFn: async (data: any) => {
      const response = await createPayment(data)
      return response;
    },
    onError: (error) => {
      toast({
        title: 'Error al crear pago',
        variant: 'destructive',
    });
    }
  })

  const { data, isFetching } = useQuery({
    queryKey: ['cart-items'],
    queryFn: async () => {
      const response = await getCartItems()
      return response;
    },
  })

  if (data?.data.length === 0) {
    toast({
      title: 'Carrito vacío',
      description: 'No hay productos en el carrito',
      variant: 'destructive',
    });

    navigate({
      to: '/protected/cart',
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-8">
        <div className="px-4">
          <h1 className="text-2xl font-bold mb-6">Finalizar compra</h1>
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
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
                  <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)} className="space-y-3">
                    <div className="flex items-start space-x-3 rounded-md border p-3">
                      <RadioGroupItem   disabled={isFetching || mutate.isPending} value="pago-movil" id="pago-movil" />
                      <div className="flex flex-1 items-start justify-between">
                        <Label htmlFor="pago-movil" className="flex flex-col cursor-pointer">
                          <span className="font-medium">Pago movil</span>
                          <span className="text-sm text-muted-foreground">Pago rápido y seguro</span>
                        </Label>
                      </div>
                    </div>

                    {paymentMethod === PaymentMethod.PAYMENT_MOBILE && (
                      <div className="rounded-md relative overflow-hidden border p-4 text-center">
                        <AspectRatio ratio={7 / 3} >
                          <img src={pagoMovil}
                            alt="PayPal Checkout"
                            className="mx-auto h-full w-auto"
                          />
                        </AspectRatio>
                      </div>
                    )}

                    <div className="flex items-start space-x-3 rounded-md border p-3">
                      <RadioGroupItem 
                        disabled={isFetching || mutate.isPending}
                      value={PaymentMethod.CASH} id={PaymentMethod.PAYMENT_MOBILE} />
                      <div className="flex flex-1 items-start justify-between">
                        <Label htmlFor={PaymentMethod.PAYMENT_MOBILE} className="flex flex-col cursor-pointer">
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
                <CardFooter className="flex justify-between border-t pt-4">
                  <Link to="/protected/cart">
                    <Button variant="outline" className="gap-1">
                      <ArrowLeft className="h-4 w-4" />
                      Volver
                    </Button>
                  </Link>
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
                    {data?.data?.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>
                          {item.branchMedicine.medicine.name} <span className="text-muted-foreground">x{item.quantity}</span>
                        </span>
                        <span>${(item.branchMedicine.medicine.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>


                  {/* Costos */}
                  <div className="space-y-2">
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${data?.meta.total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button disabled={isFetching || mutate.isPending} onClick={() => mutate.mutate({ method: paymentMethod })} className="w-full">
                    Proceder al pago
                  </Button>
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

