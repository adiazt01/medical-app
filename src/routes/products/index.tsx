import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { QueryKeys } from '@/config/query-key'
import { PaginationButtons } from '@/modules/core/components/buttons/pagination-buttons'
import { usePagination } from '@/modules/core/hooks/use-pagination'
import { ProductCardList } from '@/modules/products/components/lists/ProductCardList'
import { getProducts } from '@/modules/products/services/medicines-api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Filter, X } from 'lucide-react'
import { useState } from 'react'
import { useDebounce } from "@uidotdev/usehooks";

export const Route = createFileRoute('/products/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [showFilters, setShowFilters] = useState(false)
  const [search, setSearch] = useState()
  const debouncedSearch = useDebounce(search, 500)

  const { page, limit, setPage, totalPages, setTotalPages } = usePagination()

  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.products, debouncedSearch, page, limit],
    queryFn: async () => {
      const data = await getProducts(page, limit, search)
      const totalPages = Math.ceil(data?.meta?.total / limit)
      setTotalPages(totalPages)
      return data
    },
  })

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

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



  return (
    <div className="flex flex-col w-full px-4 py-6 md:py-8">
      {/* Título y controles móviles */}
      <div className="mb-6 flex flex-wrap items-center justify-end gap-4">
        <Input
          placeholder="Buscar productos"
          onChange={handleSearchChange}
          value={search}
          className="flex-1 h-9 text-sm"
        />
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
          </div>
        </div>

        {/* Lista de productos */}
        <div>
          <ProductCardList products={data?.data} isLoading={isLoading} />
          {/* Paginación */}
          <div className="mt-8 flex items-center justify-center gap-1">
            <PaginationButtons page={page} setPage={setPage} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  )
}
