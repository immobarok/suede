"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const PRIMARY = "#9c8b7a"

interface ComingSoonProps {
    feature?: string
}

export function ComingSoon({ feature = "This feature" }: ComingSoonProps) {
    const [email, setEmail] = useState("")
    const [subscribed, setSubscribed] = useState(false)

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        if (!email) return

        setSubscribed(true)
        toast.success("We'll notify you when this launches!")
    }

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center p-4 text-center"
            style={{
                background: `linear-gradient(135deg, ${PRIMARY}10 0%, ${PRIMARY}25 50%, ${PRIMARY}15 100%)`
            }}
        >
            {/* Background glow */}
            <div
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-40 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${PRIMARY}30, transparent 70%)` }}
            />

            <div className="relative z-10 max-w-md w-full">
                {/* Icon */}
                <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-8 mx-auto"
                    style={{
                        background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY}90)`,
                        boxShadow: `0 8px 40px ${PRIMARY}50`
                    }}
                >
                    <span className="text-3xl text-white">✦</span>
                </div>

                {/* Title */}
                <h1
                    className="text-3xl md:text-4xl font-bold mb-4"
                    style={{
                        background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY}cc)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}
                >
                    {feature} Coming Soon
                </h1>

                <p className="text-lg text-muted-foreground mb-10 max-w-md mx-auto">
                    We're working on something amazing. Get notified when it's ready.
                </p>

                {/* Email Form */}
                {!subscribed ? (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-12 bg-white/80 backdrop-blur text-base"
                        />
                        <Button
                            type="submit"
                            className="h-12 px-8 shadow-lg whitespace-nowrap"
                            style={{
                                background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY}cc)`,
                                color: "white"
                            }}
                        >
                            Notify Me
                        </Button>
                    </form>
                ) : (
                    <div
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full"
                        style={{ background: `${PRIMARY}20` }}
                    >
                        <span style={{ color: PRIMARY }}>✓</span>
                        <span className="font-medium" style={{ color: PRIMARY }}>
                            You're on the list!
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}