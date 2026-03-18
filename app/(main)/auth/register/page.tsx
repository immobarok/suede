"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { LoadingSpinner } from "@/components/shared/loading-spinner"
import { Eye, EyeOff, AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Logo } from "@/components/layout/navbar/Logo"
import Image from "next/image"

export default function RegisterPage() {
    const supabase = createClient()
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [agreed, setAgreed] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleRegister = async (e: React.BaseSyntheticEvent) => {
        e.preventDefault()
        
        if (!agreed) {
            setError("You must agree to the Terms of Service and Privacy Policy")
            return
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        setLoading(true)
        setError(null)

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    full_name: `${firstName} ${lastName}`.trim(),
                    role: "user",
                },
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        if (data.user && data.user.identities && data.user.identities.length === 0) {
            setError("Email already registered. Please sign in instead.")
            setLoading(false)
            return
        }

        setSuccess(true)
        setLoading(false)
        toast.success("Check your email for confirmation link!")
    }

    const handleOAuth = async (provider: "google" | "apple") => {
        setLoading(true)
        setError(null)

        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
                queryParams: {
                    access_type: "offline",
                    prompt: "consent",
                },
            },
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-[#f8f6f3]">
                <Card className="w-full max-w-md border-none shadow-none bg-white p-6 sm:p-10 rounded-none">
                    <CardHeader className="px-0 pt-0 pb-4">
                        <CardTitle className="text-center text-2xl font-cormorant font-medium text-[#1c1917] tracking-tight">
                            Check your email!
                        </CardTitle>
                        <CardDescription className="text-center font-darker text-sm text-[#78716c] leading-relaxed mt-2">
                            We have sent a confirmation link to <strong>{email}</strong>.
                            Please click the link to complete your registration.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-center p-0 pt-4">
                        <Button asChild className="w-full h-11 bg-[#4F0E19] hover:bg-[#3d0b13] text-white font-darker text-sm font-medium tracking-wide transition-all rounded-none">
                            <Link href="/auth/login">Go to login</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-[#f8f6f3] py-6 my-10">
            <div className="mb-4 flex flex-col items-center gap-2">
                <Logo />
                <p className="text-[#a8a29e] font-darker text-sm text-center">
                    Join the community of informed luxury shoppers
                </p>
            </div>

            <Card className="w-full max-w-md border-none shadow-none bg-white p-6 sm:p-8 rounded-none">
                <CardHeader className="space-y-1.5 px-0 pt-0 pb-4">
                    <CardTitle className="text-[26px] font-cormorant font-medium text-[#1c1917] tracking-tight">
                        Create Account
                    </CardTitle>
                    <CardDescription className="font-darker text-[14px] text-[#78716c] leading-relaxed">
                        Start building your measurement profile and discover perfectly fitting pieces
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 px-0 pb-0">
                    {error && (
                        <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800 mb-3 rounded-none">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription className="font-darker text-sm">{error}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleRegister} className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1.5">
                                <Label htmlFor="firstName" className="font-darker text-[12px] text-[#44403c]">
                                    First Name
                                </Label>
                                <Input
                                    id="firstName"
                                    placeholder="First"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    disabled={loading}
                                    className="bg-[#f5f5f5] border-none h-10 focus-visible:ring-1 focus-visible:ring-[#4F0E19] px-3 font-darker text-sm rounded-none"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="lastName" className="font-darker text-[12px] text-[#44403c]">
                                    Last Name
                                </Label>
                                <Input
                                    id="lastName"
                                    placeholder="Last"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    disabled={loading}
                                    className="bg-[#f5f5f5] border-none h-10 focus-visible:ring-1 focus-visible:ring-[#4F0E19] px-3 font-darker text-sm rounded-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="font-darker text-[12px] text-[#44403c]">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                                className="bg-[#f5f5f5] border-none h-10 focus-visible:ring-1 focus-visible:ring-[#4F0E19] px-3 font-darker text-sm rounded-none"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="password" className="font-darker text-[12px] text-[#44403c]">
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="At least 12 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={12}
                                    disabled={loading}
                                    className="bg-[#f5f5f5] border-none h-10 focus-visible:ring-1 focus-visible:ring-[#4F0E19] px-3 font-darker text-sm pr-10 rounded-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716c] hover:text-[#44403c]"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="confirmPassword" className="font-darker text-[12px] text-[#44403c]">
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Re-enter password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                    className="bg-[#f5f5f5] border-none h-10 focus-visible:ring-1 focus-visible:ring-[#4F0E19] px-3 font-darker text-sm pr-10 rounded-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716c] hover:text-[#44403c]"
                                >
                                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-start space-x-2 pt-0.5">
                            <Checkbox 
                                id="terms" 
                                checked={agreed}
                                onCheckedChange={(val: boolean) => setAgreed(val)}
                                className="mt-0.5 h-3.5 w-3.5 border-[#a8a29e] data-[state=checked]:bg-[#4F0E19] data-[state=checked]:border-[#4F0E19] rounded-none" 
                            />
                            <label
                                htmlFor="terms"
                                className="text-[12px] font-darker font-medium leading-tight text-[#44403c]"
                            >
                                I agree to the <Link href="/terms" className="text-[#4F0E19] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#4F0E19] hover:underline">Privacy Policy</Link>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-10 bg-[#4F0E19] hover:bg-[#3d0b13] text-white font-darker text-sm font-medium tracking-wide transition-all rounded-none mt-1"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <LoadingSpinner size="sm" variant="white" className="mr-2" />
                                    Creating Account...
                                </>
                            ) : (
                                "Create Account"
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
                            className="h-10 border-[#e7e5e4] cursor-pointer hover:bg-[#f5f5f5] font-darker text-sm text-[#44403c] flex items-center justify-center gap-2 transition-colors rounded-none"
                        >
                            <Image src="/google.svg" alt="Google" width={18} height={18} />
                            Continue with Google
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => handleOAuth("apple")}
                            disabled={loading}
                            type="button"
                            className="h-10 border-[#e7e5e4] cursor-pointer hover:bg-[#f5f5f5] font-darker text-sm text-[#44403c] flex items-center justify-center gap-2 transition-colors rounded-none"
                        >
                            <Image src="/apple.svg" alt="Apple" width={22} height={22} />
                            Continue with Apple
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-center pt-4 pb-2">
                <p className="text-sm text-[#78716c] font-darker">
                    Already have an account?{" "}
                    <Link
                        href="/auth/login"
                        className="font-semibold text-[#4F0E19] hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}