"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { LoadingSpinner } from "@/components/shared/loading-spinner"
import {  Apple, AlertCircle, Eye, EyeOff } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Logo } from "@/components/layout/navbar/Logo"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

function LoginPageInner() {
    const supabase = createClient()
    const searchParams = useSearchParams()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const redirectedFrom = searchParams.get("redirectedFrom")
    const reason = searchParams.get("reason")

    const handleLogin = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        toast.success("Welcome back!")
        
        // Handle role-based redirection if no explicit redirect is set
        if (!redirectedFrom) {
            const userRole = data.user?.user_metadata?.role as string | undefined;
            if (userRole === "admin") {
                window.location.href = "/admin";
                return;
            }
        }
        
        window.location.href = redirectedFrom || "/"
    }

    const handleOAuth = async (provider: "google" | "apple") => {
        setLoading(true)

        const callbackUrl = new URL(`${window.location.origin}/auth/callback`)
        if (redirectedFrom) {
            callbackUrl.searchParams.set("next", redirectedFrom)
        }

        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: callbackUrl.toString(),
            },
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        }
    }


    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#f8f6f3] py-8">
            <div className="mb-6 flex flex-col items-center gap-2">
                <Logo />
                <p className="text-[#a8a29e] font-darker text-sm text-center">
                    Welcome back to your style sanctuary
                </p>
            </div>

            <Card className="w-full max-w-md border-none shadow-none bg-white p-6 sm:p-10 rounded-none">
                <CardHeader className="space-y-2 px-0 pt-0 pb-6">
                    <CardTitle className="text-2xl font-cormorant font-medium text-[#1c1917] tracking-tight">
                        Sign In
                    </CardTitle>
                    <CardDescription className="font-darker text-sm text-[#78716c] leading-relaxed">
                        Access your measurements, saved reviews, and personalized recommendations
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 px-0 pb-0">
                    {reason === "guest_limit" && (
                        <Alert className="bg-amber-50 border-amber-200 mb-4 rounded-none">
                            <AlertCircle className="h-4 w-4 text-amber-600" />
                            <AlertDescription className="text-amber-800 font-darker text-sm">
                                You have reached the guest limit. Please sign in to continue browsing.
                            </AlertDescription>
                        </Alert>
                    )}

                    {error && (
                        <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800 mb-4 rounded-none">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription className="font-darker text-sm">{error}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="font-darker text-[11px] font-semibold uppercase tracking-wider text-[#44403c]">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setEmail(e.target.value)
                                }
                                required
                                disabled={loading}
                                className="bg-[#f5f5f5] border-none h-11 focus-visible:ring-1 focus-visible:ring-[#4F0E19] px-4 font-darker text-sm rounded-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center w-full">
                                <Label htmlFor="password" className="font-darker text-[11px] font-semibold uppercase tracking-wider text-[#44403c]">
                                    Password
                                </Label>
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-[12px] font-darker text-[#4F0E19]/80 hover:text-[#4F0E19] hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setPassword(e.target.value)
                                    }
                                    required
                                    disabled={loading}
                                    className="bg-[#f5f5f5] border-none h-11 focus-visible:ring-1 focus-visible:ring-[#4F0E19] px-4 font-darker text-sm pr-10 rounded-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716c] hover:text-[#44403c] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2 pt-1">
                            <Checkbox id="remember" className="h-4 w-4 border-[#a8a29e] data-[state=checked]:bg-[#4F0E19] data-[state=checked]:border-[#4F0E19] rounded-none" />
                            <label
                                htmlFor="remember"
                                className="text-xs font-darker font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#44403c]"
                            >
                                Remember me
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-11 bg-[#4F0E19] hover:bg-[#3d0b13] text-white font-darker text-sm font-medium tracking-wide transition-all rounded-none"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <LoadingSpinner size="sm" variant="white" className="mr-2" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>

                    <div className="relative py-3">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full bg-[#f5f5f5]" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-3 text-[#a8a29e] font-darker tracking-widest text-[9px]">
                                OR
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Button
                            variant="outline"
                            onClick={() => handleOAuth("google")}
                            disabled={loading}
                            type="button"
                            className="h-11 border-[#e7e5e4] cursor-pointer hover:bg-[#f5f5f5] font-darker text-sm text-[#44403c] flex items-center justify-center gap-2 transition-colors rounded-none"
                        >
                            <Image src="/google.svg" alt="Google" width={20} height={20} />
                            Continue with Google
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => handleOAuth("apple")}
                            disabled={loading}
                            type="button"
                            className="h-11 border-[#e7e5e4] cursor-pointer hover:bg-[#f5f5f5] font-darker text-sm text-[#44403c] flex items-center justify-center gap-2 transition-colors rounded-none"
                        >
                            <Image src="/apple.svg" alt="Apple" width={28} height={28} />
                            Continue with Apple
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <CardFooter className="flex justify-center pt-6 pb-0 px-0">
                    <p className="text-sm text-[#78716c] font-darker">
                        New to SUEDE?{" "}
                        <Link
                            href="/auth/register"
                            className="font-semibold text-[#4F0E19] hover:underline"
                        >
                            Create an account
                        </Link>
                    </p>
                </CardFooter>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#f8f6f3]" />}>
            <LoginPageInner />
        </Suspense>
    )
}
