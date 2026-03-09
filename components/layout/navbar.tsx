"use client"

import Link from "next/link"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LoadingSpinner } from "@/components/shared/loading-spinner"
import { Menu, User, Ruler, ShoppingBag, LogOut, Heart } from "lucide-react"
import { useAuth } from "@/hooks/use-user"
import { createClient } from "@/lib/supabase/client"

export function Navbar() {
    const { user, isLoading, isAuthenticated } = useAuth()

    const handleSignOut = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        toast.success("Signed out successfully")
        window.location.reload()
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-bold tracking-tight">SUEDE</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        href="/the-capsule"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        The Capsule
                    </Link>
                    <Link
                        href="/the-lookbook"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        The Lookbook
                    </Link>
                    <Link
                        href="/the-collective"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        The Collective
                    </Link>
                    <Link
                        href="/the-consign"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        The Consign
                    </Link>
                </nav>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    {isLoading ? (
                        <LoadingSpinner size="sm" />
                    ) : isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage
                                            src={user?.user_metadata?.avatar_url}
                                            alt={user?.email || ""}
                                        />
                                        <AvatarFallback>
                                            {user?.email?.[0].toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">
                                            {user?.user_metadata?.full_name || "User"}
                                        </p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {user?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/profile" className="cursor-pointer">
                                        <User className="mr-2 h-4 w-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/profile/measurements" className="cursor-pointer">
                                        <Ruler className="mr-2 h-4 w-4" />
                                        My Measurements
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/favorites" className="cursor-pointer">
                                        <Heart className="mr-2 h-4 w-4" />
                                        Favorites
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/my-listings" className="cursor-pointer">
                                        <ShoppingBag className="mr-2 h-4 w-4" />
                                        My Listings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer text-red-600 focus:text-red-600"
                                    onClick={handleSignOut}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Sign out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="hidden md:flex items-center gap-2">
                            <Button variant={"link"} asChild>
                                <Link href="/auth/login">Sign in</Link>
                            </Button>
                            <Button asChild className="uppercase rounded-none">
                                <Link href="/auth/register">Create Account</Link>
                            </Button>
                        </div>
                    )}

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <nav className="flex flex-col gap-4 mt-8">
                                <Link href="/the-capsule" className="text-lg font-medium">
                                    The Capsule
                                </Link>
                                <Link href="/the-lookbook" className="text-lg font-medium">
                                    The Lookbook
                                </Link>
                                <Link href="/the-collective" className="text-lg font-medium">
                                    The Collective
                                </Link>
                                <Link href="/the-consign" className="text-lg font-medium">
                                    The Consign
                                </Link>

                                {!isAuthenticated && (
                                    <div className="flex flex-col gap-2 mt-4">
                                        <Button asChild variant="outline">
                                            <Link href="/auth/login">Sign in</Link>
                                        </Button>
                                        <Button asChild>
                                            <Link href="/auth/register">Get Started</Link>
                                        </Button>
                                    </div>
                                )}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}