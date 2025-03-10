import * as React from 'react'
import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Heart, Menu, Search, ShoppingCart, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Navbar from '@/modules/core/components/navbar/Navbar'

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
    <>
    <Navbar />
    <div className='relative max-w-screen-2xl mx-auto min-h-screen w-full flex flex-col'>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
    </>
  )
}
