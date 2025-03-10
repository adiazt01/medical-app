import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  Lock,
  PartyPopper,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useState } from "react";
import pagoMovil from "@/assets/pago-movil.jpeg";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCartItems } from "@/modules/cart/services/cart-api";
import { createPayment } from "@/modules/payments/services/payments-api";
import { PaymentMethod } from "@/modules/payments/enum/payments";
import { useToast } from "@/modules/core/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Confetti from "react-confetti";
import { useWindowSize } from "@/modules/core/hooks/use-resize";

export const Route = createFileRoute("/protected/payment/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.CASH,
  );
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  const { data, isFetching } = useQuery({
    queryKey: ["cart-items"],
    queryFn: async () => {
      const response = await getCartItems();
      return response;
    },
  });

  const mutate = useMutation({
    mutationKey: ["create-payment"],
    mutationFn: async (data: any) => {
      if (!data.method) {
        throw new Error("No se ha seleccionado un método de pago");
      }
      const response = await createPayment(data);
      return response;
    },
    onError: (error) => {
      toast({
        title: "Error al crear pago",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      // Mostrar confeti y diálogo en lugar de redireccionar
      setShowConfetti(true);
      setShowSuccessDialog(true);

      // Ocultar el confeti después de 5 segundos
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    },
  });

  useEffect(() => {
    if (data?.data?.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "No hay productos en el carrito",
        variant: "destructive",
      });

      navigate({
        to: "/protected/cart",
      });
    }
  }, [data, navigate, toast]);

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value as PaymentMethod);
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    navigate({ to: '/products' });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.15}
        />
      )}

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
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">
                      Selecciona un método de pago
                    </h3>

                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={handlePaymentMethodChange}
                      className="space-y-3"
                    >
                      <div
                        className={`flex items-start space-x-3 rounded-md border p-3 ${paymentMethod === PaymentMethod.PAYMENT_MOBILE ? "border-primary bg-primary/5" : ""}`}
                      >
                        <RadioGroupItem
                          disabled={isFetching || mutate.isPending}
                          value={PaymentMethod.PAYMENT_MOBILE}
                          id="payment-mobile"
                        />
                        <div className="flex flex-1 items-start justify-between">
                          <Label
                            htmlFor="payment-mobile"
                            className="flex flex-col cursor-pointer"
                          >
                            <span className="font-medium">Pago móvil</span>
                            <span className="text-sm text-muted-foreground">
                              Pago rápido y seguro
                            </span>
                          </Label>
                        </div>
                      </div>

                      {paymentMethod === PaymentMethod.PAYMENT_MOBILE && (
                        <div className="rounded-md relative overflow-hidden border p-4 text-center ml-7">
                          <AspectRatio ratio={7 / 3}>
                            <img
                              src={pagoMovil || "/placeholder.svg"}
                              alt="Pago Móvil"
                              className="mx-auto h-full w-auto"
                            />
                          </AspectRatio>
                        </div>
                      )}

                      <div
                        className={`flex items-start space-x-3 rounded-md border p-3 ${paymentMethod === PaymentMethod.CASH ? "border-primary bg-primary/5" : ""}`}
                      >
                        <RadioGroupItem
                          disabled={isFetching || mutate.isPending}
                          value={PaymentMethod.CASH}
                          id="cash"
                        />
                        <div className="flex flex-1 items-start justify-between">
                          <Label
                            htmlFor="cash"
                            className="flex flex-col cursor-pointer"
                          >
                            <span className="font-medium">
                              Pago contra entrega
                            </span>
                            <span className="text-sm text-muted-foreground">
                              Paga en efectivo al recibir tu pedido
                            </span>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Información de seguridad */}
                  <div className="rounded-md bg-muted/50 p-3">
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Pago 100% seguro</h3>
                        <p className="text-sm text-muted-foreground">
                          Tus datos están protegidos con encriptación SSL de 256
                          bits. No almacenamos los datos completos de tu
                          tarjeta.
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
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span>
                          {item.branchMedicine.medicine.name}{" "}
                          <span className="text-muted-foreground">
                            x{item.quantity}
                          </span>
                        </span>
                        <span>
                          $
                          {(
                            item.branchMedicine.medicine.price * item.quantity
                          ).toFixed(2)}
                        </span>
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
                  <Button
                    disabled={isFetching || mutate.isPending}
                    onClick={() => mutate.mutate({ method: paymentMethod })}
                    className="w-full"
                  >
                    {mutate.isPending ? "Procesando..." : "Proceder al pago"}
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

      {/* Diálogo de confirmación de compra */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-center">
              <PartyPopper className="h-5 w-5 text-primary" />
              ¡Compra realizada con éxito!
            </DialogTitle>
            <DialogDescription className="text-center">
              Tu pedido ha sido procesado correctamente
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-center gap-2 mb-3">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h3 className="font-medium">Detalles de tu compra</h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fecha:</span>
                  <span>{formatDate(new Date())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Método de pago:</span>
                  <span>
                    {paymentMethod === PaymentMethod.CASH
                      ? "Pago contra entrega"
                      : "Pago móvil"}
                  </span>
                </div>
                <Separator className="my-2" />

                <div className="space-y-2">
                  <h4 className="font-medium">Productos:</h4>
                  {data?.data?.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>
                        {item.branchMedicine.medicine.name}{" "}
                        <span className="text-muted-foreground">
                          x{item.quantity}
                        </span>
                      </span>
                      <span>
                        $
                        {(
                          item.branchMedicine.medicine.price * item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>${data?.meta.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-3">
            <Button variant="outline" onClick={handleCloseSuccessDialog}>
              Cerrar
            </Button>
            <Button className="w-full sm:w-auto" asChild>
              <Link to="/products">Ver mas productos</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
