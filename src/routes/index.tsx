
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, ShoppingBag, TrendingUp } from "lucide-react"
import { ProductCardList } from "@/modules/products/components/lists/ProductCardList"
import { getProducts } from "@/modules/products/services/medicines-api"
import Image from "@/modules/core/components/Image"
import { createFileRoute } from "@tanstack/react-router"
import { QueryKeys } from "@/config/query-key"

export const Route = createFileRoute('/')({
  component: LandingPage,
})

export default function LandingPage() {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const limit = 8 // Número de productos por página

  // Consulta para obtener productos
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.products, page, limit],
    queryFn: async () => {
      const data = await getProducts(page, limit)
      const totalPages = Math.ceil(data?.meta?.total / limit)
      setTotalPages(totalPages)
      return data
    },
  })
  
  console.log(data)

  // Función para cambiar de página
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
    }
  }

  // Extraer productos destacados (primeros 2)
  const featuredProducts = data?.data?.slice(0, 2)

  // Resto de productos
  const regularProducts = data?.data?.slice(2)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Descubre nuestros productos de calidad
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Encuentra todo lo que necesitas con los mejores precios y calidad garantizada.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button size="lg" className="gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Comprar ahora
                </Button>
                <Button variant="outline" size="lg">
                  Ver ofertas
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Productos destacados</h2>
                <p className="text-muted-foreground">Nuestras mejores recomendaciones para ti</p>
              </div>
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md"
                >
                  <div className="aspect-[16/9]">
                    {product.file && (
                      <Image 
                        queryKey="products"                        
                        file={product.file || "/placeholder.svg"}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 text-white w-full">
                      <h3 className="font-bold">{product.name}</h3>
                      <p className="text-sm opacity-90">${product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products Section */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Todos los productos</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1 || isLoading}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Página {page} de {totalPages || 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages || isLoading}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Productos */}
          <ProductCardList products={regularProducts} isLoading={isLoading} />

          {/* Paginación móvil (visible solo en móvil) */}
          <div className="flex justify-center mt-8 md:hidden">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1 || isLoading}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Página {page} de {totalPages || 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages || isLoading}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
    </div>
  )
}
