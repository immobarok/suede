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

import { usePathname } from "@/i18n/routing"
import { useLocale, useTranslations } from "next-intl"

export function Navbar() {
    const t = useTranslations("Navbar")
    const { user, isLoading, isAuthenticated } = useAuth()
    const pathname = usePathname()
    const locale = useLocale()

    const handleSignOut = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        toast.success(t("signedOutSuccess"))
        window.location.reload()
    }

    return (
        <header className="absolute top-0 z-50 w-full bg-transparent">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-muted-foreground text-2xl font-serif tracking-[40%] uppercase font-logo">SUEDE</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link
                        href="/the-capsule"
                        className="text-[16px] font-normal text-muted-foreground hover:text-primary transition-colors"
                    >
                        {t("capsule")}
                    </Link>
                    <Link
                        href="/the-lookbook"
                        className="text-[16px] font-normal text-muted-foreground hover:text-primary transition-colors"
                    >
                        {t("lookbook")}
                    </Link>
                    <Link
                        href="/the-collective"
                        className="text-[16px] font-normal text-muted-foreground hover:text-primary transition-colors"
                    >
                        {t("collective")}
                    </Link>
                    <Link
                        href="/the-consign"
                        className="text-[16px] font-normal text-muted-foreground hover:text-primary transition-colors"
                    >
                        {t("consign")}
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
                                            {user?.user_metadata?.full_name || t("user")}
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
                                        {t("profile")}
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/profile/measurements" className="cursor-pointer">
                                        <Ruler className="mr-2 h-4 w-4" />
                                        {t("measurements")}
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/favorites" className="cursor-pointer">
                                        <Heart className="mr-2 h-4 w-4" />
                                        {t("favorites")}
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/my-listings" className="cursor-pointer">
                                        <ShoppingBag className="mr-2 h-4 w-4" />
                                        {t("listings")}
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer text-red-600 focus:text-red-600"
                                    onClick={handleSignOut}
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    {t("signOut")}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="hidden md:flex items-center gap-2">
                            <div className="flex items-center text-sm pr-4 border-r border-border">
                                <Link
                                    href={`/en${pathname === '/' ? '' : pathname}`}
                                    className={`transition-colors ${locale === 'en' ? 'text-accent font-semibold' : 'text-muted-foreground hover:text-accent'}`}
                                >
                                    EN
                                </Link>
                                <span className="mx-1 text-muted-foreground">/</span>
                                <Link
                                    href={`/fr${pathname === '/' ? '' : pathname}`}
                                    className={`transition-colors ${locale === 'fr' ? 'text-accent font-semibold' : 'text-muted-foreground hover:text-accent'}`}
                                >
                                    FR
                                </Link>
                            </div>
                            <Button variant={"link"} asChild className="text-lg font-medium">
                                <Link href="/auth/login">{t("signIn")}</Link>
                            </Button>
                            <Button asChild className="uppercase rounded-none text-[16px] h-10.5">
                                <Link href="/auth/register">{t("createAccount")}</Link>
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
                                    {t("capsule")}
                                </Link>
                                <Link href="/the-lookbook" className="text-lg font-medium">
                                    {t("lookbook")}
                                </Link>
                                <Link href="/the-collective" className="text-lg font-medium">
                                    {t("collective")}
                                </Link>
                                <Link href="/the-consign" className="text-lg font-medium">
                                    {t("consign")}
                                </Link>

                                {!isAuthenticated && (
                                    <div className="flex flex-col gap-2 mt-4">
                                        <Button asChild variant="outline" className="text-md font-medium">
                                            <Link href="/auth/login">{t("signIn")}</Link>
                                        </Button>
                                        <Button asChild>
                                            <Link href="/auth/register">{t("createAccount")}</Link>
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