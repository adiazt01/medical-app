import * as React from 'react'
import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Heart, Menu, Search, ShoppingCart, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface IRouterContext {
  auth: ReturnType<typeof useAuth>
}

export const Route = createRootRouteWithContext<IRouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  const auth = useAuth()

  console.log(auth)
  return (
    <div className='relative min-h-screen w-full flex flex-col'>
      <header className="sticky justify-between top-0 z-40 w-full border-b bg-background">
        <div className=" flex h-16 items-center py-4">
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <Link to="/" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <span className="text-lg font-bold sm:text-xl">MediMart</span>
            </Link>
          </div>
          <div className="hidden  md:flex md:flex-1 md:items-center md:justify-center">
            <nav className="flex items-center gap-4 text-sm lg:gap-6">
              <Link to="#" className="font-medium transition-colors hover:text-primary">
                Home
              </Link>
              <Link to="#" className="font-medium text-muted-foreground transition-colors hover:text-primary">
                Products
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="relative md:w-64">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="h-5 w-5" />
                <span className="sr-only">
                  Buscar
                </span>
              </Button>
              <Input
                type="search"
                placeholder="Buscar medicinas"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">2</Badge>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </div>
        </div>
      </header>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  )
}
