import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import { Link } from '@tanstack/react-router'
import { Menu, ShoppingCart, User } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Navbar() {
    const { isAuthenticated, accessTokenData } = useAuth()

    return (
        <header className="sticky justify-between top-0 z-40 w-full border-b bg-background">
            <div className="max-w-screen-xl mx-auto flex h-16 items-center py-4">
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
                        <Link to="/" className="font-medium transition-colors hover:text-primary">
                            Home
                        </Link>
                        <Link to="/products" className="font-medium text-muted-foreground transition-colors hover:text-primary">
                            Products
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                    <div className="relative flex flex-row items-center gap-2">
                        <Button variant="ghost" size="icon" className="relative" asChild>
                            <Link to="/protected/cart">
                                <ShoppingCart className='' />
                            </Link>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className='relative
                                '>
                                    <Avatar >
                                        <AvatarImage alt="@shadcn" />
                                        <AvatarFallback>
                                        {accessTokenData?.firstNames[0]}{accessTokenData?.lastNames[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>
                                    Mi cuenta
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        Perfil
                                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    Cerrar sesion
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </header>
    )
}
