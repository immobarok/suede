"use client"

import { useEffect, useState, useCallback } from "react"
import type { User, Session } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"

interface AuthState {
    user: User | null
    session: Session | null
    isLoading: boolean
    isAuthenticated: boolean
}

export function useAuth() {
    const [state, setState] = useState<AuthState>({
        user: null,
        session: null,
        isLoading: true,
        isAuthenticated: false,
    })

    const refreshUser = useCallback(async () => {
        const supabase = createClient()

        try {
            const { data: { user }, error: userError } = await supabase.auth.getUser()

            if (userError) {
                console.error("Error getting user:", userError)
                setState(prev => ({ ...prev, isLoading: false, isAuthenticated: false }))
                return
            }

            const { data: { session } } = await supabase.auth.getSession()

            setState({
                user,
                session,
                isLoading: false,
                isAuthenticated: !!user,
            })
        } catch (error) {
            console.error("Auth error:", error)
            setState({
                user: null,
                session: null,
                isLoading: false,
                isAuthenticated: false,
            })
        }
    }, [])

    useEffect(() => {
        const supabase = createClient()

        // Get initial auth state
        refreshUser()

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log("Auth event:", event)

                setState({
                    user: session?.user ?? null,
                    session: session ?? null,
                    isLoading: false,
                    isAuthenticated: !!session?.user,
                })

                // Handle specific events
                if (event === "SIGNED_OUT") {
                    // Clear any local state if needed
                }
            }
        )

        return () => {
            subscription.unsubscribe()
        }
    }, [refreshUser])

    return {
        ...state,
        refreshUser,
    }
}

// Hook for protected routes
export function useRequireAuth(redirectTo: string = "/login") {
    const { user, isLoading, isAuthenticated } = useAuth()

    return {
        user,
        isLoading,
        isAuthenticated,
        redirectTo,
    }
}

// Hook for admin check
export function useAdmin() {
    const { user, isLoading, isAuthenticated } = useAuth()

    const isAdmin = user?.user_metadata?.role === "admin" || false

    return {
        isAdmin,
        isLoading: isLoading || !isAuthenticated,
        user,
    }
}