"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RippleButton } from "@/components/ui/ripple-button";
import Image from "next/image";
import { LogoSmall } from "@/components/layout/navbar/LogoSmall";

export default function RegisterPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    if (!agreed) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

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
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (
      data.user &&
      data.user.identities &&
      data.user.identities.length === 0
    ) {
      setError("Email already registered. Please sign in instead.");
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
    toast.success("Check your email for confirmation link!");
  };

  const handleOAuth = async (provider: "google" | "apple") => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f6f3] px-4">
        <Card className="w-full max-w-md rounded-none border-none bg-white p-6 shadow-none sm:p-10">
          <CardHeader className="px-0 pt-0 pb-4">
            <CardTitle className="font-cormorant text-center text-2xl font-medium tracking-tight text-[#1c1917]">
              Check your email!
            </CardTitle>
            <CardDescription className="font-darker mt-2 text-center text-sm leading-relaxed text-[#78716c]">
              We have sent a confirmation link to <strong>{email}</strong>.
              Please click the link to complete your registration.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center p-0 pt-4">
            <RippleButton className="font-darker h-11 w-full rounded-none bg-black text-sm font-medium tracking-wide text-white transition-all hover:bg-black/90">
              <Link href="/auth/login">Go to login</Link>
            </RippleButton>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8f6f3] px-4 py-16">
      <div className="mb-4 flex flex-col items-center gap-2">
        <LogoSmall />
        <p className="font-darker text-center text-sm text-[#a8a29e]">
          Join the community of informed luxury shoppers
        </p>
      </div>

      <Card className="w-full max-w-md rounded-none border-none bg-white p-6 shadow-none sm:p-8">
        <CardHeader className="space-y-1.5 px-0 pt-0 pb-4">
          <CardTitle className="font-cormorant text-[26px] font-medium tracking-tight text-[#1c1917]">
            Create Account
          </CardTitle>
          <CardDescription className="font-darker text-[14px] leading-relaxed text-[#78716c]">
            Start building your measurement profile and discover perfectly
            fitting pieces
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-3 px-0 pb-0">
          {error && (
            <Alert
              variant="destructive"
              className="mb-3 rounded-none border-red-200 bg-red-50 text-red-800"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="font-darker text-sm">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleRegister} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label
                  htmlFor="firstName"
                  className="font-darker text-[12px] text-[#44403c]"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  placeholder="First"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={loading}
                  className="font-darker h-10 rounded-none border-none bg-[#f5f5f5] px-3 text-sm focus-visible:ring-1 focus-visible:ring-black"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="lastName"
                  className="font-darker text-[12px] text-[#44403c]"
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Last"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={loading}
                  className="font-darker h-10 rounded-none border-none bg-[#f5f5f5] px-3 text-sm focus-visible:ring-1 focus-visible:ring-black"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="font-darker text-[12px] text-[#44403c]"
              >
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
                className="font-darker h-10 rounded-none border-none bg-[#f5f5f5] px-3 text-sm focus-visible:ring-1 focus-visible:ring-black"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="password"
                className="font-darker text-[12px] text-[#44403c]"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  disabled={loading}
                  className="font-darker h-10 rounded-none border-none bg-[#f5f5f5] px-3 pr-10 text-sm focus-visible:ring-1 focus-visible:ring-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-[#78716c] hover:text-[#44403c]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="confirmPassword"
                className="font-darker text-[12px] text-[#44403c]"
              >
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
                  className="font-darker h-10 rounded-none border-none bg-[#f5f5f5] px-3 pr-10 text-sm focus-visible:ring-1 focus-visible:ring-black"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-[#78716c] hover:text-[#44403c]"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-2 pt-0.5">
              <Checkbox
                id="terms"
                checked={agreed}
                onCheckedChange={(val: boolean) => setAgreed(val)}
                className="mt-0.5 h-3.5 w-3.5 rounded-none border-[#a8a29e] data-[state=checked]:border-black data-[state=checked]:bg-black"
              />
              <label
                htmlFor="terms"
                className="font-darker text-[12px] leading-tight font-medium text-[#44403c]"
              >
                I agree to the{" "}
                <Link href="/terms" className="text-black hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-black hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <RippleButton
              type="submit"
              className="font-darker mt-1 h-10 w-full rounded-none bg-black text-sm font-medium tracking-wide text-white transition-all hover:bg-black/90"
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
              className="font-darker flex h-10 cursor-pointer items-center justify-center gap-2 rounded-none border-[#e7e5e4] text-sm text-[#44403c] transition-colors hover:bg-[#f5f5f5]"
            >
              <Image src="/google.svg" alt="Google" width={18} height={18} />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleOAuth("apple")}
              disabled={loading}
              type="button"
              className="font-darker flex h-10 cursor-pointer items-center justify-center gap-2 rounded-none border-[#e7e5e4] text-sm text-[#44403c] transition-colors hover:bg-[#f5f5f5]"
            >
              <Image src="/apple.svg" alt="Apple" width={22} height={22} />
              Continue with Apple
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-4 pb-2">
        <p className="font-darker text-sm text-[#78716c]">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-black hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
