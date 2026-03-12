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
import { LoadingSpinner } from "@/components/shared/loading-spinner"
import { Menu, User, Ruler, ShoppingBag, LogOut, Heart } from "lucide-react"
import { useAuth } from "@/hooks/use-user"
import { createClient } from "@/lib/supabase/client"
import MotionDrawer from "@/components/motion-drawer"
import { useState } from "react"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"


import { usePathname } from "@/i18n/routing"
import { useLocale, useTranslations } from "next-intl"

export function Navbar() {
    const t = useTranslations("Navbar")
    const { user, isLoading, isAuthenticated } = useAuth()
    const pathname = usePathname()
    const locale = useLocale()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const handleSignOut = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        toast.success(t("signedOutSuccess"))
        window.location.reload()
    }


    
    return (
        <header className="fixed top-0 z-50 w-full">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-muted-foreground text-2xl font-serif tracking-[40%] uppercase font-logo">SUEDE</span>
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                        {t("tooltipHome")}
                    </TooltipContent>
                </Tooltip>


                <nav className="hidden md:flex items-center gap-6">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/the-capsule"
                                className="text-[16px] font-normal text-muted-foreground hover:text-primary transition-colors"
                            >
                                {t("capsule")}
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            {t("tooltipCapsule")}
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/the-lookbook"
                                className="text-[16px] font-normal text-muted-foreground hover:text-primary transition-colors"
                            >
                                {t("lookbook")}
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            {t("tooltipLookbook")}
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/the-collective"
                                className="text-[16px] font-normal text-muted-foreground hover:text-primary transition-colors"
                            >
                                {t("collective")}
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            {t("tooltipCollective")}
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/the-consign"
                                className="text-[16px] font-normal text-muted-foreground hover:text-primary transition-colors"
                            >
                                {t("consign")}
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            {t("tooltipConsign")}
                        </TooltipContent>
                    </Tooltip>
                </nav>


                {/* Right Side */}
                <div className="flex items-center gap-4">
                    {isLoading ? (
                        <LoadingSpinner size="sm" />
                    ) : isAuthenticated ? (
                        <DropdownMenu>
                            <Tooltip>
                                <TooltipTrigger asChild>
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
                                </TooltipTrigger>
                                <TooltipContent>
                                    {t("tooltipUser")}
                                </TooltipContent>
                            </Tooltip>

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
                            <Tooltip>
                                <TooltipTrigger asChild>
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
                                </TooltipTrigger>
                                <TooltipContent>
                                    {t("tooltipLanguage")}
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant={"link"} asChild className="text-lg font-medium">
                                        <Link href="/auth/login">{t("signIn")}</Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {t("tooltipSignIn")}
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button asChild className="uppercase rounded-none text-[16px] h-10.5">
                                        <Link href="/auth/register">{t("createAccount")}</Link>
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {t("tooltipRegister")}
                                </TooltipContent>
                            </Tooltip>
                        </div>

                    )}

                    {/* Mobile Menu Toggle */}
                    <Button

                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsDrawerOpen(true)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>

                    {/* Mobile Menu Drawer */}
                    <MotionDrawer
                        isOpen={isDrawerOpen}
                        onToggle={setIsDrawerOpen}
                        direction="right"
                        showToggleButton={false}
                        showCloseButton={true}
                        width={300}
                        backgroundColor="white"
                        contentClassName="border-l border-border"
                        className="md:hidden"
                    >
                        <nav className="flex flex-col gap-6">
                            <Link
                                href="/the-capsule"
                                className="text-xl font-medium text-foreground hover:text-primary transition-colors"
                                onClick={() => setIsDrawerOpen(false)}
                            >
                                {t("capsule")}
                            </Link>
                            <Link
                                href="/the-lookbook"
                                className="text-xl font-medium text-foreground hover:text-primary transition-colors"
                                onClick={() => setIsDrawerOpen(false)}
                            >
                                {t("lookbook")}
                            </Link>
                            <Link
                                href="/the-collective"
                                className="text-xl font-medium text-foreground hover:text-primary transition-colors"
                                onClick={() => setIsDrawerOpen(false)}
                            >
                                {t("collective")}
                            </Link>
                            <Link
                                href="/the-consign"
                                className="text-xl font-medium text-foreground hover:text-primary transition-colors"
                                onClick={() => setIsDrawerOpen(false)}
                            >
                                {t("consign")}
                            </Link>

                            {!isAuthenticated && (
                                <div className="flex flex-col gap-3 mt-4">
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="text-md font-medium h-12 rounded-none"
                                        onClick={() => setIsDrawerOpen(false)}
                                    >
                                        <Link href="/auth/login">{t("signIn")}</Link>
                                    </Button>
                                    <Button
                                        asChild
                                        className="h-12 uppercase rounded-none"
                                        onClick={() => setIsDrawerOpen(false)}
                                    >
                                        <Link href="/auth/register">{t("createAccount")}</Link>
                                    </Button>
                                </div>
                            )}

                            {/* Language Switcher for Mobile */}
                            <div className="flex items-center text-sm pt-6 mt-6 border-t border-border">
                                <Link
                                    href={`/en${pathname === '/' ? '' : pathname}`}
                                    className={`transition-colors text-lg ${locale === 'en' ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-primary'}`}
                                    onClick={() => setIsDrawerOpen(false)}
                                >
                                    EN
                                </Link>
                                <span className="mx-3 text-muted-foreground">/</span>
                                <Link
                                    href={`/fr${pathname === '/' ? '' : pathname}`}
                                    className={`transition-colors text-lg ${locale === 'fr' ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-primary'}`}
                                    onClick={() => setIsDrawerOpen(false)}
                                >
                                    FR
                                </Link>
                            </div>
                        </nav>
                    </MotionDrawer>
                </div>
            </div>
        </header>
    )
}