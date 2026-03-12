"use client"

import { useState } from "react"
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
import { Chrome, Apple, AlertCircle, Chromium } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
    const supabase = createClient()
    const searchParams = useSearchParams()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
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

        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        Welcome back
                    </CardTitle>
                    <CardDescription className="text-center">
                        Sign in to continue to SUEDE
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {reason === "guest_limit" && (
                        <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                                You have reached the guest limit. Please sign in to continue browsing.
                            </AlertDescription>
                        </Alert>
                    )}

                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setEmail(e.target.value)
                                }
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-sm text-muted-foreground hover:text-primary"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setPassword(e.target.value)
                                }
                                required
                                disabled={loading}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
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

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="outline"
                            onClick={() => handleOAuth("google")}
                            disabled={loading}
                            type="button"
                        >
                            <Chromium className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => handleOAuth("apple")}
                            disabled={loading}
                            type="button"
                        >
                            <Apple className="mr-2 h-4 w-4" />
                            Apple
                        </Button>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                        Do not have an account?{" "}
                        <Link
                            href="/auth/register"
                            className="font-semibold text-primary hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}