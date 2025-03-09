
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { QueryKeys } from '@/config/query-key'
import { PaginationButtons } from '@/modules/core/components/buttons/pagination-buttons'
import { usePagination } from '@/modules/core/hooks/use-pagination'
import { ProductCardList } from '@/modules/products/components/lists/ProductCardList'
import { getProducts } from '@/modules/products/services/medicines-api'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
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


  return (
    <div className="flex flex-col w-full px-4 py-6 md:py-8">
      {/* Título y controles móviles */}
      <div className="mb-6 flex flex-wrap items-center justify-end gap-4">
      <h3 className="w-full text-xl font-semibold ml-2">Buscar productos</h3>
        <Input
          placeholder="Nombre del producto"
          onChange={handleSearchChange}
          value={search}
          className="flex-1 h-9 text-sm"
        />
        
      </div>

      <div className="grid p-10 ">
       
        {/* Lista de productos */}
        <div>
          <ProductCardList products={data?.data} isLoading={isLoading} />
          {/* Paginación */}
          <div className="mt-8 flex items-center justify-center gap-1 ">
            <PaginationButtons page={page} setPage={setPage} totalPages={totalPages} />
          </div>
        </div>
      </div>
    </div>
  )
}
