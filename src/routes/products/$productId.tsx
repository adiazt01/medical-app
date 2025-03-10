import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "@/modules/core/components/Image";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  InfoIcon,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
  Star,
  Truck,
  MapPin,
  Check,
  ArrowLeft,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProduct } from "@/modules/products/services/medicines-api";
import { getBranchsMedicinesByMedicineId } from "@/modules/products/services/branchs-medicines-api";
import { useForm } from "@tanstack/react-form";
import { useToast } from "@/modules/core/hooks/use-toast";
import { addProductToCart } from "@/modules/cart/services/cart-api";
import { FieldInfo } from "@/modules/core/components/input/form-info";

export const Route = createFileRoute("/products/$productId")({
  component: ProductPage,
});

function ProductPage() {
  const { productId } = useParams({ from: "/products/$productId" });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ["products", productId],
    queryFn: async () => {
      const response = await getProduct(Number(productId));
      return response;
    },
  });

  const { data: branchsMedicines, isLoading: branchsMedicinesLoading } =
    useQuery({
      queryKey: ["branchsMedicines", productId],
      queryFn: async () => {
        const response = await getBranchsMedicinesByMedicineId(
          Number(productId),
        );
        return response;
      },
    });

  const mutation = useMutation({
    mutationFn: async ({
      productBranchId,
      quantity,
    }: {
      productBranchId: string;
      quantity: number;
    }) => {
      const response = await addProductToCart(
        Number(productBranchId),
        quantity,
      );
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cart-items"],
        refetchType: "active",
      });
      
      toast({
        title: "Producto agregado al carrito",
        description: "El producto se ha agregado correctamente al carrito.",
      });
    },
  });

  const form = useForm({
    defaultValues: {
      productBranchId: "",
      quantity: 1,
    },
    onSubmit: async ({
      value,
    }: {
      value: { productBranchId: string; quantity: number };
    }) => {
      await mutation.mutateAsync({
        productBranchId: value.productBranchId,
        quantity: value.quantity,
      });
    },
  });

  if (!data || !branchsMedicines) {
    return (
      <div className="bg-background min-h-screen">
        {/* Breadcrumb skeleton */}
        <div className="container px-4 py-4">
          <div className="h-5 w-32 rounded-md bg-muted animate-pulse"></div>
        </div>

        <div className="container px-4 py-6 md:py-8">
          {/* Main content skeleton */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Product image skeleton */}
            <div className="md:col-span-1 space-y-6">
              <div className="overflow-hidden rounded-xl border bg-muted shadow-sm animate-pulse">
                <div className="relative aspect-square"></div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="h-4 w-24 rounded-md bg-muted animate-pulse"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-9 w-9 rounded-full bg-muted animate-pulse"></div>
                  <div className="h-9 w-9 rounded-full bg-muted animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Product information skeleton */}
            <div className="md:col-span-1 lg:col-span-2">
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-20 rounded-full bg-muted animate-pulse"></div>
                    <div className="h-5 w-20 rounded-full bg-muted animate-pulse"></div>
                  </div>
                  <div className="h-10 w-3/4 rounded-md bg-muted animate-pulse"></div>
                  <div className="flex items-baseline gap-2">
                    <div className="h-8 w-24 rounded-md bg-muted animate-pulse"></div>
                    <div className="h-5 w-28 rounded-full bg-muted animate-pulse"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="h-4 w-full rounded-md bg-muted animate-pulse"></div>
                  <div className="h-4 w-5/6 rounded-md bg-muted animate-pulse"></div>
                  <div className="h-4 w-4/6 rounded-md bg-muted animate-pulse"></div>
                </div>

                <div className="rounded-lg bg-muted/30 p-4 border">
                  <div className="h-5 w-40 rounded-md bg-muted animate-pulse mb-3"></div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div>
                    <div className="h-5 w-48 rounded-md bg-muted animate-pulse"></div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="h-6 w-48 rounded-md bg-muted animate-pulse"></div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="rounded-lg border p-4 bg-muted/20 animate-pulse"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="h-5 w-5 rounded-full bg-muted"></div>
                              <div className="h-5 w-32 rounded-md bg-muted"></div>
                            </div>
                            <div className="h-5 w-24 rounded-full bg-muted"></div>
                          </div>
                          <div className="flex items-start gap-1 pl-7">
                            <div className="h-4 w-full rounded-md bg-muted"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
                    <div className="space-y-2">
                      <div className="h-5 w-20 rounded-md bg-muted animate-pulse"></div>
                      <div className="flex items-center">
                        <div className="h-10 w-36 rounded-md bg-muted animate-pulse"></div>
                      </div>
                    </div>

                    <div className="h-12 sm:flex-1 rounded-md bg-muted animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional information tabs skeleton */}
          <div className="mt-12">
            <div className="w-full border-b mb-6">
              <div className="flex gap-4 pb-2">
                <div className="h-6 w-24 rounded-md bg-muted animate-pulse"></div>
                <div className="h-6 w-24 rounded-md bg-muted animate-pulse"></div>
                <div className="h-6 w-24 rounded-md bg-muted animate-pulse"></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-7 w-48 rounded-md bg-muted animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 w-full rounded-md bg-muted animate-pulse"></div>
                <div className="h-4 w-5/6 rounded-md bg-muted animate-pulse"></div>
                <div className="h-4 w-4/6 rounded-md bg-muted animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const hasStock = branchsMedicines.some((branch) => branch.quantity > 0);

  return (
    <div className="bg-background min-h-screen">
      <div className="container px-4 py-6 md:py-8">
        {/* Main content */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Product images */}
          <div className="md:col-span-1 space-y-6">
            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <div className="relative">
                <Image
                  queryKey="productImage"
                  file={data.file}
                  alt={data.name}
                />
              </div>
            </div>
          </div>

          {/* Product information */}
          <div className="md:col-span-1 lg:col-span-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 px-2 py-0.5">
                    {data.therapeuticAction.name}
                  </Badge>
                  {hasStock ? (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-600 border-green-200"
                    >
                      En stock
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-amber-50 text-amber-600 border-amber-200"
                    >
                      Stock limitado
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                  {data.name}
                </h1>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">
                    ${data.price}
                  </span>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 text-green-600 border-green-200"
                  >
                    <Truck className="h-3 w-3" />
                    Envío gratis
                  </Badge>
                </div>
              </div>

              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p>{data.description}</p>
              </div>

              <div className="rounded-lg bg-muted/50 p-4 border">
                <h3 className="font-medium mb-2">Componente principal:</h3>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span>{data.mainComponent.name}</span>
                </div>
              </div>

              <Separator />

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">
                    Seleccione una sucursal
                  </h3>
                  <form.Field
                    name="productBranchId"
                    children={(field) => (
                      <div className="space-y-3">
                        <div className="grid gap-3 sm:grid-cols-2">
                          {branchsMedicines.map((branchsMedicine) => (
                            <div
                              key={branchsMedicine.id}
                              className={`relative rounded-lg border p-4 cursor-pointer transition-all ${
                                field.state.value ===
                                branchsMedicine.id.toString()
                                  ? "border-primary bg-primary/5 ring-1 ring-primary shadow-sm"
                                  : "hover:border-muted-foreground/30 hover:bg-muted/30"
                              } ${branchsMedicine.quantity <= 0 ? "opacity-60" : ""}`}
                              onClick={() => {
                                if (branchsMedicine.quantity > 0) {
                                  field.handleChange(
                                    branchsMedicine.id.toString(),
                                  );
                                }
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`flex h-5 w-5 items-center justify-center rounded-full ${
                                      field.state.value ===
                                      branchsMedicine.id.toString()
                                        ? "bg-primary text-primary-foreground"
                                        : "border border-muted-foreground/30"
                                    }`}
                                  >
                                    {field.state.value ===
                                      branchsMedicine.id.toString() && (
                                      <Check className="h-3 w-3" />
                                    )}
                                  </div>
                                  <span className="font-medium">
                                    {branchsMedicine.branch.name}
                                  </span>
                                </div>
                                {branchsMedicine.quantity > 0 ? (
                                  <Badge
                                    variant="outline"
                                    className="bg-green-50 text-green-600 border-green-200"
                                  >
                                    {branchsMedicine.quantity} disponibles
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="bg-red-50 text-red-600 border-red-200"
                                  >
                                    Agotado
                                  </Badge>
                                )}
                              </div>
                              <div className="mt-2 flex items-start gap-1 text-xs text-muted-foreground pl-7">
                                <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                                <span>{branchsMedicine.branch.address}</span>
                              </div>
                              {branchsMedicine.quantity <= 0 && (
                                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-background/60 backdrop-blur-[1px]">
                                  <p className="rounded-md bg-background/90 px-3 py-1 text-sm font-medium text-muted-foreground shadow-sm">
                                    No disponible
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        {field.state.meta.touchedErrors ? (
                          <p className="text-sm font-medium text-destructive">
                            {field.state.meta.touchedErrors}
                          </p>
                        ) : null}
                      </div>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
                  <div className="space-y-2">
                    <label htmlFor="quantity" className="text-sm font-medium">
                      Cantidad
                    </label>
                    <form.Field
                      name="quantity"
                      children={(field) => (
                        <div className="flex items-center">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-r-none"
                            onClick={() =>
                              field.handleChange(
                                Math.max(1, field.state.value - 1),
                              )
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            id="quantity"
                            type="number"
                            min="1"
                            className="h-10 w-16 rounded-none border-x-0 text-center"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) =>
                              field.handleChange(Number(e.target.value))
                            }
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-l-none"
                            onClick={() =>
                              field.handleChange(field.state.value + 1)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    />
                  </div>

                  <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                      <Button
                        type="submit"
                        disabled={!canSubmit}
                        className="sm:flex-1 gap-2"
                        size="lg"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        {isSubmitting ? "Agregando..." : "Agregar al carrito"}
                      </Button>
                    )}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Additional information tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 mb-6">
              <TabsTrigger
                value="description"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2 pt-1 px-4 text-base"
              >
                Descripción
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-2 pt-1 px-4 text-base"
              >
                Detalles
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-0">
              <Card className="border-none shadow-none">
                <CardContent className="p-0 space-y-4">
                  <h3 className="text-xl font-medium">Descripción detallada</h3>
                  <div className="prose prose-sm max-w-none">
                    <p>
                      {data.description} {data.description}
                    </p>
                    <p>
                      El componente principal de este medicamento es{" "}
                      {data.mainComponent.name}, que actúa directamente sobre{" "}
                      {data.therapeuticAction.name}.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="mt-0">
              <Card className="border-none shadow-none">
                <CardContent className="p-0">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-3">
                      <h3 className="text-xl font-medium">Especificaciones</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="font-medium">Componente principal</div>
                        <div>{data.mainComponent.name}</div>
                        <div className="font-medium">Acción terapéutica</div>
                        <div>{data.therapeuticAction.name}</div>
                        <div className="font-medium">Presentación</div>
                        <div>Caja con 30 tabletas</div>
                        <div className="font-medium">Vía de administración</div>
                        <div>Oral</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-medium">
                        Información adicional
                      </h3>
                      <div className="text-sm space-y-2">
                        <p>
                          Conservar en lugar fresco y seco a temperatura
                          ambiente, protegido de la luz.
                        </p>
                        <p>Manténgase fuera del alcance de los niños.</p>
                        <p>Su venta requiere receta médica.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
