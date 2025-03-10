import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <main className="w-full flex-col justify-center">
      <section className="bg-muted py-8 sm:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center items-center space-y-4"> 
              <div className="space-y-2 text-center"> 
                <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                  Tu salud, nuestra prioridad
                </h1>
                <p className="max-w-[1500px] text-sm text-muted-foreground sm:text-base md:text-xl">
                  Nuestro compromiso es proporcionarte productos de alta calidad y un servicio excepcional para garantizar tu bienestar. Explora nuestra tienda y descubre cómo podemos ayudarte a mantener y mejorar tu salud.
                </p>
              </div>
              <div className="flex justify-center flex-col gap-2 sm:flex-row">
                <Button size="lg" className="sm:text-sm md:text-base">
                  Comprar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                Compra por categoria
              </h2>
              <p className="max-w-[600px] text-sm text-muted-foreground sm:text-base md:text-xl">
                Explora nuestras categorías y encuentra los productos que necesitas para cuidar de tu salud y bienestar.
              </p>
            </div>
          </div>
          
          {/* Carrusel Horizontal */}
          <div className="mt-6 sm:mt-8 overflow-x-auto mx-auto">
            <div className="flex space-x-4">
              {[
                { name: "Medicamentos", icon: "💊" },
                { name: "Vitaminas y Suplementos", icon: "🍊" },
                { name: "Cuidado personal", icon: "🧴" },
                { name: "Dispositivos medicos", icon: "🥼" },
                { name: "Cuidado de Bebes", icon: "🍼" },
                { name: "Producto Ayurvedicos", icon: "🏵" },
              ].map((category) => (
                <Card key={category.name} className="flex flex-col items-center justify-center text-center min-w-[150px]">
                  <CardHeader className="pb-2 pt-4">
                    <div className="text-3xl sm:text-4xl">{category.icon}</div>
                  </CardHeader>
                  <CardContent className="pb-2 pt-0">
                    <CardTitle className="text-sm sm:text-base">{category.name}</CardTitle>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                      Ver mas
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
              {/* Carrusel de Marcas */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                Compra por Marca
              </h2>
              <p className="max-w-[600px] text-sm text-muted-foreground sm:text-base md:text-xl">
                Explora nuestras marcas disponibles y encuentra los productos que necesitas para cuidar de tu salud y bienestar.
              </p>
            </div>
          </div>

          <div className="container mx-auto px-4 md:px-6">
        <div className="mt-6 sm:mt-8 overflow-x-auto mx-auto">
            <div className="flex  space-x-4">
              {[
                { name: "MediMart", icon: "🛕" },
                { name: "HealthPlus", icon: "🕍" },
                { name: "NutriVita", icon: "🏰" },
                { name: "PharmaCare", icon: "🏨" },
                { name: "WellnessOne", icon: "🏤" },
              ].map((category) => (
                <Card key={category.name} className="flex flex-col items-center justify-center text-center min-w-[150px]">
                  <CardHeader className="pb-2 pt-4">
                    <div className="text-3xl sm:text-4xl">{category.icon}</div>
                  </CardHeader>
                  <CardContent className="pb-2 pt-0">
                    <CardTitle className="text-sm sm:text-base">{category.name}</CardTitle>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                      Ver mas
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          </div>
      </section>
      <div className="grid grid-cols-2 gap-3 xs:gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        <Card key={1} className="overflow-hidden">
          <div className="relative">
            <img
              src={"/placeholder.svg"}
              className="aspect-square w-full object-cover"
              width={200}
              height={200}
            />
          </div>
          <CardContent className="p-2 sm:p-4">
            <h3 className="text-xs font-semibold sm:text-sm md:text-base">{"product"}</h3>
            <p className="text-xs text-muted-foreground">By MediMart</p>
            <div className="mt-1 sm:mt-2 flex items-center justify-between">
              <span className="text-xs font-bold sm:text-sm md:text-base">{100}</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
                <span className="text-[10px] sm:text-xs text-muted-foreground">(42)</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-2 pt-0 sm:p-4 sm:pt-0">
            <Button className="w-full text-xs sm:text-sm">Add to Cart</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
