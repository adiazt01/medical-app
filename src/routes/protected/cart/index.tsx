import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeftIcon, ChevronRight, Heart, Info, Minus, Package, Plus, ShieldCheck, ShoppingBag, Trash2, Truck } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/protected/cart/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Vitamina C 1000mg con Zinc y Vitamina D",
      price: 24.99,
      originalPrice: 29.99,
      quantity: 2,
      image: "/placeholder.svg?height=120&width=120&text=Vitamina+C",
      stock: 15,
      brand: "NutriHealth",
    },
    {
      id: 2,
      name: "Termómetro Digital",
      price: 12.99,
      quantity: 1,
      image: "/placeholder.svg?height=120&width=120&text=Termómetro",
      stock: 8,
      brand: "MediTech",
    },
    {
      id: 3,
      name: "Gel Antibacterial 500ml",
      price: 8.99,
      quantity: 3,
      image: "/placeholder.svg?height=120&width=120&text=Gel",
      stock: 20,
      brand: "CleanHands",
    },
  ])

  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)

  // Calcular totales
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const discount = couponApplied ? subtotal * 0.1 : 0 // 10% de descuento si hay cupón
  const shipping = subtotal >= 50 ? 0 : 4.99 // Envío gratis en compras mayores a $50
  const tax = (subtotal - discount) * 0.16 // 16% de impuesto
  const total = subtotal - discount + shipping + tax

  // Actualizar cantidad
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    const item = cartItems.find((item) => item.id === id)
    if (item && newQuantity > item.stock) return // No permitir más que el stock disponible

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // Eliminar producto
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  // Mover a favoritos (simulado)
  const moveToWishlist = (id: number) => {
    alert(`Producto añadido a favoritos`)
    removeItem(id)
  }

  // Aplicar cupón
  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "discount10") {
      setCouponApplied(true)
    } else {
      alert("Cupón inválido")
    }
  }

  // Limpiar carrito
  const clearCart = () => {
    if (confirm("¿Estás seguro de que deseas vaciar el carrito?")) {
      setCartItems([])
    }
  }

  return (
    <div className="container px-4 py-6 md:py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold sm:text-3xl">Mi carrito</h1>
        <span className="text-sm text-muted-foreground">{cartItems.length} productos</span>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Tu carrito está vacío</h2>
          <p className="text-center text-muted-foreground">
            Parece que aún no has añadido ningún producto a tu carrito.
          </p>
          <Link href="/products-listing">
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
                  <Button variant="ghost" size="sm" onClick={clearCart} className="h-8 text-xs text-muted-foreground">
                    Vaciar carrito
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b last:border-0 last:pb-0"
                    >
                      <div className="h-24 w-24 overflow-hidden rounded-md border">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div>
                            <h3 className="font-medium line-clamp-2">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">Marca: {item.brand}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <Input
                              type="number"
                              min="1"
                              max={item.stock}
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                              className="h-8 w-16 text-center"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.stock}
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
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="mr-1 h-3 w-3" />
                              Eliminar
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 text-xs text-muted-foreground"
                              onClick={() => moveToWishlist(item.id)}
                            >
                              <Heart className="mr-1 h-3 w-3" />
                              Guardar
                            </Button>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              {item.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  ${item.originalPrice.toFixed(2)}
                                </span>
                              )}
                              <span className="font-medium">${item.price.toFixed(2)}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Subtotal: ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-green-600">
                          {item.stock <= 5 ? (
                            <span>¡Solo quedan {item.stock} unidades!</span>
                          ) : (
                            <span>En stock ({item.stock} disponibles)</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t px-4 py-4 sm:px-6">
                <Link href="/products-listing">
                  <Button variant="outline" size="sm" className="gap-1">
                    <ArrowLeftIcon className="h-4 w-4" />
                    Seguir comprando
                  </Button>
                </Link>
                <Link href="/checkout-view">
                  <Button size="sm" className="gap-1">
                    Proceder al pago
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Productos recomendados */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Productos recomendados</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {[1, 2, 3, 4].map((item) => (
                  <Card key={item} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={`/placeholder.svg?height=120&width=120&text=Producto+${item}`}
                        alt={`Producto recomendado ${item}`}
                        className="aspect-square w-full object-cover"
                      />
                    </div>
                    <CardContent className="p-3">
                      <h3 className="line-clamp-2 text-sm font-medium">Producto recomendado {item}</h3>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-bold">${(9.99 + item * 2).toFixed(2)}</span>
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                          <ShoppingBag className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Columna derecha - Resumen */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="px-4 py-4 sm:px-6">
                <CardTitle className="text-lg">Resumen del pedido</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 space-y-4">
                {/* Cupón de descuento */}
                <div className="space-y-2">
                  <Label htmlFor="coupon">Cupón de descuento</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="coupon"
                      placeholder="Ingresa tu código"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={couponApplied}
                    />
                    <Button variant="outline" onClick={applyCoupon} disabled={couponApplied || !couponCode}>
                      Aplicar
                    </Button>
                  </div>
                  {couponApplied && (
                    <p className="text-xs text-green-600">¡Cupón DISCOUNT10 aplicado! 10% de descuento.</p>
                  )}
                </div>

                <Separator />

                {/* Resumen de costos */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} productos)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Descuento</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Envío estimado</span>
                    <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : "Gratis"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Impuestos (16%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 border-t px-4 py-4 sm:px-6">
                <Link href="/checkout-view" className="w-full">
                  <Button className="w-full">Proceder al pago</Button>
                </Link>
                <div className="text-center text-xs text-muted-foreground">
                  o{" "}
                  <Link href="/products-listing" className="text-primary hover:underline">
                    continuar comprando
                  </Link>
                </div>
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
