"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";
import { RippleButton } from "@/components/ui/ripple-button";
import Image from "next/image";
import { LogoSmall } from "@/components/layout/navbar/LogoSmall";

function LoginPageInner() {
  const supabase = createClient();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectedFrom = searchParams.get("redirectedFrom");
  const reason = searchParams.get("reason");

  const handleLogin = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    toast.success("Welcome back!");

    // Handle role-based redirection if no explicit redirect is set
    if (!redirectedFrom) {
      const userRole = data.user?.user_metadata?.role as string | undefined;
      if (userRole === "admin") {
        window.location.href = "/admin";
        return;
      }
    }

    window.location.href = redirectedFrom || "/";
  };

  const handleOAuth = async (provider: "google" | "apple") => {
    setLoading(true);

    const callbackUrl = new URL(`${window.location.origin}/auth/callback`);
    if (redirectedFrom) {
      callbackUrl.searchParams.set("next", redirectedFrom);
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: callbackUrl.toString(),
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f6f3] px-4 py-8">
      <div className="mb-6 flex flex-col items-center gap-2">
        <LogoSmall />
        <p className="font-darker text-center text-[14.14px] text-black/50">
          Welcome back to your style sanctuary
        </p>
      </div>

      <Card className="w-full max-w-md rounded-none border-none bg-white p-6 shadow-none sm:p-10">
        <CardHeader className="space-y-2 px-0 pt-0 pb-6">
          <CardTitle className="font-cormorant text-2xl font-medium tracking-tight text-[#1c1917]">
            Sign In
          </CardTitle>
          <CardDescription className="font-darker text-[14.14px] leading-relaxed text-[#8A8A82]">
            Access your measurements, saved reviews, and personalized
            recommendations
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 px-0 pb-0">
          {reason === "guest_limit" && (
            <Alert className="mb-4 rounded-none border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="font-darker text-[14.14px] text-amber-800">
                You have reached the guest limit. Please sign in to continue
                browsing.
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert
              variant="destructive"
              className="mb-4 rounded-none border-red-200 bg-red-50 text-red-800"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="font-darker text-sm">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="font-darker text-[11px] font-semibold tracking-wider text-[#44403c] uppercase"
              >
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
                className="font-darker h-11 rounded-none border-none bg-[#f5f5f5] px-4 text-sm focus-visible:ring-1 focus-visible:ring-black"
              />
            </div>

            <div className="space-y-2">
              <div className="flex w-full items-center justify-between">
                <Label
                  htmlFor="password"
                  className="font-darker text-[11px] font-semibold tracking-wider text-[#44403c] uppercase"
                >
                  Password
                </Label>
                <Link
                  href="/auth/forgot-password"
                  className="font-darker text-[12px] text-black/80 hover:text-black hover:underline"
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
                  className="font-darker h-11 rounded-none border-none bg-[#f5f5f5] px-4 pr-10 text-sm focus-visible:ring-1 focus-visible:ring-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-[#78716c] transition-colors hover:text-[#44403c]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <Checkbox
                id="remember"
                className="h-4 w-4 rounded-none border-[#a8a29e] data-[state=checked]:border-black data-[state=checked]:bg-black"
              />
              <label
                htmlFor="remember"
                className="font-darker text-xs leading-none font-medium text-[#44403c] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>

            <RippleButton
              type="submit"
              className="font-darker h-11 w-full rounded-none bg-black text-sm font-medium tracking-wide text-white transition-all hover:bg-black/90"
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
            </RippleButton>
          </form>

          <div className="relative py-3">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-[#f5f5f5]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="font-darker bg-white px-3 text-[9px] tracking-widest text-[#a8a29e]">
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
              className="font-darker flex h-11 cursor-pointer items-center justify-center gap-2 rounded-none border-[#e7e5e4] text-sm text-[#44403c] transition-colors hover:bg-[#f5f5f5]"
            >
              <Image src="/google.svg" alt="Google" width={20} height={20} />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleOAuth("apple")}
              disabled={loading}
              type="button"
              className="font-darker flex h-11 cursor-pointer items-center justify-center gap-2 rounded-none border-[#e7e5e4] text-sm text-[#44403c] transition-colors hover:bg-[#f5f5f5]"
            >
              <Image src="/apple.svg" alt="Apple" width={28} height={28} />
              Continue with Apple
            </Button>
          </div>
        </CardContent>
      </Card>
      <CardFooter className="flex justify-center px-0 pt-6 pb-0">
        <p className="font-darker text-sm text-[#78716c]">
          New to SUEDE?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-black hover:underline"
          >
            Create an account
          </Link>
        </p>
      </CardFooter>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8f6f3]" />}>
      <LoginPageInner />
    </Suspense>
  );
}
