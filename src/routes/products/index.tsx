import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight, Filter, Grid3X3, Heart, List, ShoppingCart, X } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 100])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Datos de ejemplo
  const branches = [
    { id: 1, name: "Sucursal Centro" },
    { id: 2, name: "Sucursal Norte" },
    { id: 3, name: "Sucursal Sur" },
    { id: 4, name: "Sucursal Este" },
    { id: 5, name: "Sucursal Oeste" },
  ]

  const categories = [
    { id: 1, name: "Medicamentos", count: 245 },
    { id: 2, name: "Vitaminas y Suplementos", count: 124 },
    { id: 3, name: "Cuidado Personal", count: 89 },
    { id: 4, name: "Dispositivos Médicos", count: 56 },
    { id: 5, name: "Cuidado de Bebés", count: 42 },
    { id: 6, name: "Productos Ayurvédicos", count: 37 },
  ]

  const brands = [
    { id: 1, name: "MediMart", count: 78 },
    { id: 2, name: "HealthPlus", count: 64 },
    { id: 3, name: "NutriVita", count: 52 },
    { id: 4, name: "PharmaCare", count: 45 },
    { id: 5, name: "WellnessOne", count: 38 },
  ]

  // Productos de ejemplo
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `${["Vitamina", "Suplemento", "Jarabe", "Tabletas", "Cápsulas"][i % 5]} ${String.fromCharCode(65 + (i % 26))} ${(i % 3) + 1}00${["mg", "g", "ml"][i % 3]}`,
    price: (9.99 + i * 2.5).toFixed(2),
    originalPrice: i % 3 === 0 ? ((9.99 + i * 2.5) * 1.2).toFixed(2) : null,
    discount: i % 3 === 0 ? "20% OFF" : null,
    rating: (3 + (i % 3)) as 3 | 4 | 5,
    reviewCount: 10 + i * 5,
    image: `/placeholder.svg?height=200&width=200&text=Producto+${i + 1}`,
    brand: brands[i % 5].name,
    inStock: i % 7 !== 0,
    availableBranches: branches.filter((_, j) => j % ((i % 3) + 2) === 0).map((b) => b.id),
  }))

  return (
    <div className="flex flex-col w-full border px-4 py-6 md:py-8">
      {/* Título y controles móviles */}
      <div className="mb-6 flex flex-wrap items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="md:hidden" onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? <X className="mr-2 h-4 w-4" /> : <Filter className="mr-2 h-4 w-4" />}
            {showFilters ? "Cerrar filtros" : "Filtros"}
          </Button>
          <Select defaultValue="featured">
            <SelectTrigger className="h-9 w-[160px] text-xs sm:text-sm">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Destacados</SelectItem>
              <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
              <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
              <SelectItem value="newest">Más recientes</SelectItem>
              <SelectItem value="rating">Mejor calificados</SelectItem>
            </SelectContent>
          </Select>
          <div className="hidden md:flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 rounded-none rounded-l-md ${viewMode === "grid" ? "bg-muted" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="sr-only">Vista de cuadrícula</span>
            </Button>
            <Separator orientation="vertical" className="h-5" />
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 rounded-none rounded-r-md ${viewMode === "list" ? "bg-muted" : ""}`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">Vista de lista</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] lg:gap-8">
        {/* Filtros para móvil */}
        {showFilters && (
          <div className="fixed inset-0 z-50 flex flex-col bg-background p-6 md:hidden">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filtros</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-4 flex-1 overflow-auto">
              {/* Contenido de filtros para móvil - mismo que el de escritorio */}
              <div className="space-y-6">
                {/* Filtro de categorías */}
                <div>
                  <h3 className="mb-3 font-medium">Categorías</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Checkbox id={`category-mobile-${category.id}`} />
                          <Label htmlFor={`category-mobile-${category.id}`} className="text-sm">
                            {category.name}
                          </Label>
                        </div>
                        <span className="text-xs text-muted-foreground">({category.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Filtro de precio */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-medium">Rango de precio</h3>
                    <span className="text-xs text-muted-foreground">
                      ${priceRange[0]} - ${priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[0, 100]}
                    max={100}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="py-4"
                  />
                  <div className="mt-2 flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
                      className="h-8 text-xs"
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 100])}
                      className="h-8 text-xs"
                    />
                  </div>
                </div>

                <Separator />

                {/* Filtro de marcas */}
                <div>
                  <h3 className="mb-3 font-medium">Marcas</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Checkbox id={`brand-mobile-${brand.id}`} />
                          <Label htmlFor={`brand-mobile-${brand.id}`} className="text-sm">
                            {brand.name}
                          </Label>
                        </div>
                        <span className="text-xs text-muted-foreground">({brand.count})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Filtro de disponibilidad */}
                <div>
                  <h3 className="mb-3 font-medium">Disponibilidad</h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="in-stock-mobile" />
                    <Label htmlFor="in-stock-mobile" className="text-sm">
                      Solo productos en stock
                    </Label>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowFilters(false)}>
                Cancelar
              </Button>
              <Button className="flex-1" onClick={() => setShowFilters(false)}>
                Aplicar filtros
              </Button>
            </div>
          </div>
        )}

        {/* Filtros para escritorio */}
        <div className="hidden md:block">
          <div className="sticky top-20 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filtros</h2>
              <Button variant="ghost" size="sm" className="h-8 text-xs">
                Limpiar todo
              </Button>
            </div>

            {/* Filtro de categorías */}
            <div>
              <h3 className="mb-3 font-medium">Categorías</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox id={`category-${category.id}`} />
                      <Label htmlFor={`category-${category.id}`} className="text-sm">
                        {category.name}
                      </Label>
                    </div>
                    <span className="text-xs text-muted-foreground">({category.count})</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Filtro de precio */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-medium">Rango de precio</h3>
                <span className="text-xs text-muted-foreground">
                  ${priceRange[0]} - ${priceRange[1]}
                </span>
              </div>
              <Slider
                defaultValue={[0, 100]}
                max={100}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
                className="py-4"
              />
              <div className="mt-2 flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
                  className="h-8 text-xs"
                />
                <span className="text-muted-foreground">-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 100])}
                  className="h-8 text-xs"
                />
              </div>
            </div>
            <Separator />

            {/* Filtro de marcas */}
            <div>
              <h3 className="mb-3 font-medium">Marcas</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox id={`brand-${brand.id}`} />
                      <Label htmlFor={`brand-${brand.id}`} className="text-sm">
                        {brand.name}
                      </Label>
                    </div>
                    <span className="text-xs text-muted-foreground">({brand.count})</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Filtro de disponibilidad */}
            <div>
              <h3 className="mb-3 font-medium">Disponibilidad</h3>
              <div className="flex items-center space-x-2">
                <Checkbox id="in-stock" />
                <Label htmlFor="in-stock" className="text-sm">
                  Solo productos en stock
                </Label>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de productos */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Mostrando 1-{products.length} de 593 productos</p>
            <div className="hidden sm:block">
              <Select defaultValue="12">
                <SelectTrigger className="h-8 w-[70px] text-xs">
                  <SelectValue placeholder="12" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">12</SelectItem>
                  <SelectItem value="24">24</SelectItem>
                  <SelectItem value="36">36</SelectItem>
                  <SelectItem value="48">48</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="aspect-square w-full object-cover"
                      width={200}
                      height={200}
                    />
                    {product.discount && (
                      <Badge className="absolute left-2 top-2 bg-primary text-xs">{product.discount}</Badge>
                    )}
                    {!product.inStock && (
                      <Badge variant="secondary" className="absolute left-2 top-2 text-xs">
                        Agotado
                      </Badge>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-1 top-1 h-7 w-7 rounded-full sm:right-2 sm:top-2 sm:h-8 sm:w-8"
                    >
                      <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="sr-only">Agregar a favoritos</span>
                    </Button>
                  </div>
                  <CardContent className="p-2 sm:p-4">
                    <div className="mb-1 text-xs text-muted-foreground">{product.brand}</div>
                    <h3 className="line-clamp-2 text-xs font-semibold sm:text-sm">{product.name}</h3>
                    <div className="mt-1 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className={`h-3 w-3 ${
                            i < product.rating ? "text-yellow-500" : "text-muted-foreground opacity-25"
                          }`}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                      <span className="text-[10px] text-muted-foreground">({product.reviewCount})</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs font-bold sm:text-sm">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <div className="mt-1 text-[10px] text-muted-foreground">
                      {product.inStock ? <span className="text-green-600">En stock</span> : <span>Agotado</span>}
                      {product.availableBranches.length > 0 && product.inStock && (
                        <span> - Disponible en {product.availableBranches.length} sucursales</span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-2 pt-0 sm:p-4 sm:pt-0">
                    <Button className="w-full text-xs" disabled={!product.inStock}>
                      <ShoppingCart className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                      Agregar
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div key={product.id} className="flex flex-col overflow-hidden rounded-lg border sm:flex-row">
                  <div className="relative h-40 w-full sm:h-auto sm:w-40 md:w-48">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                    {product.discount && (
                      <Badge className="absolute left-2 top-2 bg-primary text-xs">{product.discount}</Badge>
                    )}
                    {!product.inStock && (
                      <Badge variant="secondary" className="absolute left-2 top-2 text-xs">
                        Agotado
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="mb-1 text-xs text-muted-foreground">{product.brand}</div>
                    <h3 className="text-sm font-semibold sm:text-base">{product.name}</h3>
                    <div className="mt-1 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className={`h-3 w-3 ${
                            i < product.rating ? "text-yellow-500" : "text-muted-foreground opacity-25"
                          }`}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                      <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {product.inStock ? <span className="text-green-600">En stock</span> : <span>Agotado</span>}
                      {product.availableBranches.length > 0 && product.inStock && (
                        <span> - Disponible en {product.availableBranches.length} sucursales</span>
                      )}
                    </div>
                    <div className="mt-auto flex gap-2 pt-4">
                      <Button className="text-xs" disabled={!product.inStock}>
                        <ShoppingCart className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                        Agregar al carrito
                      </Button>
                      <Button variant="outline" size="icon" className="h-9 w-9">
                        <Heart className="h-4 w-4" />
                        <span className="sr-only">Agregar a favoritos</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Paginación */}
          <div className="mt-8 flex items-center justify-center gap-1">
            <Button variant="outline" size="icon" className="h-8 w-8" disabled>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Página anterior</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              3
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              4
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              5
            </Button>
            <span className="mx-1">...</span>
            <Button variant="outline" size="sm" className="h-8 w-8">
              42
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Página siguiente</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
