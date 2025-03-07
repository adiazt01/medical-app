import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Heart, InfoIcon, Minus, Plus, Share2, ShoppingCart, Star, Truck } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute('/products/$productId')({
    component: ProductPage,
    loader: async ({ params }) => {
        console.log('Loading product', params.productId);
        return `Product ID: ${params.productId}`;
    }
})

function ProductPage() {
    const [quantity, setQuantity] = useState(1)
    const [activeImage, setActiveImage] = useState(0)

    const incrementQuantity = () => {
        setQuantity((prev) => prev + 1)
    }

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1)
        }
    }

    // Producto de ejemplo
    const product = {
        id: 1,
        name: "Vitamina C 1000mg con Zinc y Vitamina D",
        price: "$24.99",
        originalPrice: "$29.99",
        discount: "17% OFF",
        rating: 4.8,
        reviewCount: 124,
        description:
            "Suplemento de Vitamina C de alta potencia con Zinc y Vitamina D para fortalecer el sistema inmunológico. Cada tableta proporciona 1000mg de Vitamina C, 15mg de Zinc y 1000 UI de Vitamina D3.",
        features: [
            "Fortalece el sistema inmunológico",
            "Antioxidante potente",
            "Ayuda a la absorción de hierro",
            "Contribuye a la formación de colágeno",
            "Apoya la salud ósea",
        ],
        images: [
            "/placeholder.svg?height=500&width=500&text=Vitamina+C",
            "/placeholder.svg?height=500&width=500&text=Frasco",
            "/placeholder.svg?height=500&width=500&text=Tabletas",
            "/placeholder.svg?height=500&width=500&text=Ingredientes",
        ],
        stock: "En stock",
        brand: "NutriHealth",
        category: "Vitaminas y Suplementos",
        sku: "VIT-C1000-ZD",
        dosage: "1 tableta diaria",
        form: "Tabletas",
        quantity: "60 tabletas",
        expiryDate: "24 meses desde la fecha de fabricación",
    }

    // Sucursales de ejemplo
    const branches = [
        { id: 1, name: "Sucursal Centro", stock: 15, address: "Av. Principal 123, Centro" },
        { id: 2, name: "Sucursal Norte", stock: 8, address: "Blvd. Norte 456, Zona Industrial" },
        { id: 3, name: "Sucursal Sur", stock: 0, address: "Calle Sur 789, Residencial Las Palmas" },
        { id: 4, name: "Sucursal Este", stock: 22, address: "Av. Oriente 234, Plaza Comercial" },
        { id: 5, name: "Sucursal Oeste", stock: 0, address: "Calle Poniente 567, Centro Comercial Oeste" },
    ]

    // Reseñas de ejemplo
    const reviews = [
        {
            id: 1,
            name: "María García",
            rating: 5,
            date: "15 mayo, 2023",
            comment:
                "Excelente producto. Desde que comencé a tomarlo he notado una mejora en mi energía y no me he enfermado en todo el invierno.",
        },
        {
            id: 2,
            name: "Carlos Rodríguez",
            rating: 4,
            date: "3 abril, 2023",
            comment:
                "Buen producto, las tabletas son un poco grandes pero se pueden partir fácilmente. He notado mejoría en mi salud general.",
        },
        {
            id: 3,
            name: "Laura Martínez",
            rating: 5,
            date: "22 marzo, 2023",
            comment:
                "Lo compro regularmente para toda mi familia. La calidad es excelente y el precio es muy bueno comparado con otras marcas.",
        },
    ]

    // Productos relacionados
    const relatedProducts = [
        {
            id: 1,
            name: "Vitamina D3 5000 UI",
            price: "$19.99",
            image: "/placeholder.svg?height=200&width=200&text=Vitamina+D3",
            rating: 4.5,
            reviewCount: 86,
        },
        {
            id: 2,
            name: "Zinc 50mg",
            price: "$14.99",
            image: "/placeholder.svg?height=200&width=200&text=Zinc",
            rating: 4.3,
            reviewCount: 52,
        },
        {
            id: 3,
            name: "Complejo B",
            price: "$22.99",
            image: "/placeholder.svg?height=200&width=200&text=Complejo+B",
            rating: 4.7,
            reviewCount: 104,
        },
        {
            id: 4,
            name: "Multivitamínico",
            price: "$29.99",
            image: "/placeholder.svg?height=200&width=200&text=Multivitamínico",
            rating: 4.6,
            reviewCount: 138,
        },
    ]

    return (
        <div className="container px-4 py-6 md:py-8">
            {/* Breadcrumb y navegación */}
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center text-sm text-muted-foreground">
                    <Link href="/medicine-ecommerce" className="hover:text-primary">
                        Inicio
                    </Link>
                    <ChevronRight className="mx-1 h-4 w-4" />
                    <Link href="/products-listing" className="hover:text-primary">
                        Vitaminas y Suplementos
                    </Link>
                    <ChevronRight className="mx-1 h-4 w-4" />
                    <span className="truncate max-w-[150px] sm:max-w-none">Vitamina C 1000mg</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Galería de imágenes */}
                <div className="md:col-span-1">
                    <div className="mb-3 overflow-hidden rounded-lg border">
                        <img
                            src={product.images[activeImage] || "/placeholder.svg"}
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {product.images.map((image, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer overflow-hidden rounded-md border ${activeImage === index ? "ring-2 ring-primary" : ""
                                    }`}
                                onClick={() => setActiveImage(index)}
                            >
                                <img
                                    src={image || "/placeholder.svg"}
                                    alt={`${product.name} ${index + 1}`}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Información del producto */}
                <div className="md:col-span-1 lg:col-span-2">
                    <div className="space-y-4">
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                    {product.category}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                    {product.brand}
                                </Badge>
                                {product.discount && <Badge className="bg-primary text-primary-foreground">{product.discount}</Badge>}
                            </div>
                            <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{product.name}</h1>
                            <div className="mt-1 flex items-center gap-2">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < Math.floor(product.rating)
                                                    ? "fill-primary text-primary"
                                                    : "fill-muted text-muted-foreground"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {product.rating} ({product.reviewCount} reseñas)
                                </span>
                                <Link href="#reviews" className="text-sm text-primary hover:underline">
                                    Ver reseñas
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold">{product.price}</span>
                            {product.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                            )}
                            <Badge variant="outline" className="ml-2 text-xs text-green-600">
                                Envío gratis
                            </Badge>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">{product.description}</p>
                        </div>

                        <div>
                            <h3 className="mb-2 font-medium">Características principales:</h3>
                            <ul className="space-y-1">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="flex items-start text-sm">
                                        <span className="mr-2 text-primary">•</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
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
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Truck className="h-4 w-4" />
                                <span>Envío a domicilio disponible</span>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                                                <InfoIcon className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="max-w-xs text-xs">
                                                Envío gratis en compras mayores a $50. Tiempo estimado de entrega: 1-3 días hábiles.
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <div className="flex items-center">
                                <span className="mr-2 text-sm font-medium">Cantidad:</span>
                                <div className="flex items-center">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 rounded-r-none"
                                        onClick={decrementQuantity}
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="h-3 w-3" />
                                    </Button>
                                    <Input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
                                        className="h-8 w-12 rounded-none border-x-0 text-center"
                                    />
                                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-l-none" onClick={incrementQuantity}>
                                        <Plus className="h-3 w-3" />
                                    </Button>
                                </div>
                                <span className="ml-4 text-sm text-muted-foreground">{product.stock}</span>
                            </div>

                            <div className="flex flex-col gap-2 sm:flex-row">
                                <Button className="flex-1 gap-2">
                                    <ShoppingCart className="h-4 w-4" />
                                    Agregar al carrito
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Heart className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Share2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pestañas de información adicional */}
            <div className="mt-8">
                <Tabs defaultValue="description">
                    <TabsList className="w-full justify-start">
                        <TabsTrigger value="description">Descripción</TabsTrigger>
                        <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
                        <TabsTrigger value="reviews" id="reviews">
                            Reseñas ({reviews.length})
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="mt-4">
                        <Card>
                            <CardContent className="p-4 sm:p-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-medium">Descripción detallada</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            La Vitamina C es un nutriente esencial que el cuerpo no puede producir por sí mismo. Este
                                            suplemento de alta potencia proporciona 1000mg de Vitamina C por tableta, junto con Zinc y
                                            Vitamina D para un apoyo inmunológico completo.
                                        </p>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            La Vitamina C contribuye a la función normal del sistema inmunitario y a la protección de las
                                            células contra el estrés oxidativo. También ayuda a reducir el cansancio y la fatiga, y aumenta la
                                            absorción de hierro.
                                        </p>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            El Zinc contribuye al funcionamiento normal del sistema inmunitario y a la protección de las
                                            células contra el estrés oxidativo. La Vitamina D contribuye al funcionamiento normal del sistema
                                            inmunitario y al mantenimiento de los huesos en condiciones normales.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium">Modo de empleo</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Tomar 1 tableta al día con alimentos. No exceder la dosis diaria recomendada.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium">Ingredientes</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Ácido L-ascórbico (Vitamina C), agente de carga (celulosa microcristalina), citrato de zinc,
                                            colecalciferol (Vitamina D3), antiaglomerantes (estearato de magnesio vegetal, dióxido de
                                            silicio).
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-medium">Advertencias</h3>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            Mantener fuera del alcance de los niños. No utilizar si el sello de seguridad está roto. Los
                                            suplementos alimenticios no deben utilizarse como sustituto de una dieta variada y equilibrada y
                                            un estilo de vida saludable. Consultar con un profesional de la salud en caso de embarazo,
                                            lactancia o si está tomando medicamentos.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="specifications" className="mt-4">
                        <Card>
                            <CardContent className="p-4 sm:p-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Especificaciones del producto</h3>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                                <span className="font-medium">Marca:</span>
                                                <span>{product.brand}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                                <span className="font-medium">Categoría:</span>
                                                <span>{product.category}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                                <span className="font-medium">SKU:</span>
                                                <span>{product.sku}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                                <span className="font-medium">Forma:</span>
                                                <span>{product.form}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                                <span className="font-medium">Dosis:</span>
                                                <span>{product.dosage}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                                <span className="font-medium">Cantidad:</span>
                                                <span>{product.quantity}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                                <span className="font-medium">Caducidad:</span>
                                                <span>{product.expiryDate}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 border-b pb-2">
                                                <span className="font-medium">Almacenamiento:</span>
                                                <span>Lugar fresco y seco</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <h3 className="text-lg font-medium">Información nutricional</h3>
                                        <div className="mt-2 overflow-x-auto">
                                            <table className="w-full min-w-[400px] border-collapse">
                                                <thead>
                                                    <tr className="border-b">
                                                        <th className="py-2 text-left font-medium">Nutriente</th>
                                                        <th className="py-2 text-left font-medium">Por tableta</th>
                                                        <th className="py-2 text-left font-medium">%VRN*</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-b">
                                                        <td className="py-2">Vitamina C</td>
                                                        <td className="py-2">1000 mg</td>
                                                        <td className="py-2">1250%</td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="py-2">Zinc</td>
                                                        <td className="py-2">15 mg</td>
                                                        <td className="py-2">150%</td>
                                                    </tr>
                                                    <tr className="border-b">
                                                        <td className="py-2">Vitamina D3</td>
                                                        <td className="py-2">1000 UI (25 μg)</td>
                                                        <td className="py-2">500%</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <p className="mt-2 text-xs text-muted-foreground">*VRN: Valores de Referencia de Nutrientes</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="reviews" className="mt-4">
                        <Card>
                            <CardContent className="p-4 sm:p-6">
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <h3 className="text-lg font-medium">Reseñas de clientes</h3>
                                            <div className="mt-1 flex items-center gap-2">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${i < Math.floor(product.rating)
                                                                    ? "fill-primary text-primary"
                                                                    : "fill-muted text-muted-foreground"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-sm font-medium">{product.rating} de 5</span>
                                                <span className="text-sm text-muted-foreground">Basado en {product.reviewCount} reseñas</span>
                                            </div>
                                        </div>
                                        <Button>Escribir reseña</Button>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-[1fr_3fr]">
                                        <div className="space-y-4 rounded-lg bg-muted p-4">
                                            <h4 className="font-medium">Resumen de calificaciones</h4>
                                            <div className="space-y-2">
                                                {[5, 4, 3, 2, 1].map((star) => (
                                                    <div key={star} className="flex items-center gap-2">
                                                        <div className="flex w-16 items-center">
                                                            <span className="text-sm">{star}</span>
                                                            <Star className="ml-1 h-3 w-3 fill-primary text-primary" />
                                                        </div>
                                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted-foreground/20">
                                                            <div
                                                                className="h-full rounded-full bg-primary"
                                                                style={{
                                                                    width: `${star === 5 ? "70" : star === 4 ? "20" : star === 3 ? "5" : star === 2 ? "3" : "2"
                                                                        }%`,
                                                                }}
                                                            />
                                                        </div>
                                                        <span className="text-xs text-muted-foreground">
                                                            {star === 5 ? "70" : star === 4 ? "20" : star === 3 ? "5" : star === 2 ? "3" : "2"}%
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            {reviews.map((review) => (
                                                <div key={review.id} className="space-y-2 rounded-lg border p-4">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <Avatar className="h-8 w-8">
                                                                <AvatarImage src={`/placeholder.svg?text=${review.name.charAt(0)}`} />
                                                                <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <div className="font-medium">{review.name}</div>
                                                                <div className="text-xs text-muted-foreground">{review.date}</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-sm">{review.comment}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Productos relacionados */}
            <div className="mt-8">
                <h2 className="mb-4 text-xl font-bold">Productos relacionados</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {relatedProducts.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                            <div className="relative">
                                <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    className="aspect-square w-full object-cover"
                                />
                                <Button size="icon" variant="ghost" className="absolute right-2 top-2 h-8 w-8 rounded-full">
                                    <Heart className="h-4 w-4" />
                                </Button>
                            </div>
                            <CardContent className="p-3">
                                <h3 className="line-clamp-2 text-sm font-medium">{item.name}</h3>
                                <div className="mt-1 flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-3 w-3 ${i < Math.floor(item.rating) ? "fill-primary text-primary" : "fill-muted text-muted-foreground"
                                                }`}
                                        />
                                    ))}
                                    <span className="text-xs text-muted-foreground">({item.reviewCount})</span>
                                </div>
                                <div className="mt-2 flex items-center justify-between">
                                    <span className="font-bold">{item.price}</span>
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                        <ShoppingCart className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
