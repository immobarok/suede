"use client";

import { useEffect, useState } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  profileAvatarUrl: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    isLoading: true,
    isAuthenticated: false,
    profileAvatarUrl: null,
  });

  useEffect(() => {
    const supabase = createClient();

    const load = async (session: Session | null) => {
      const user = session?.user ?? null;

      let profileAvatarUrl: string | null = null;
      if (user) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Error loading profile avatar:", profileError);
        }

        profileAvatarUrl = profile?.avatar_url ?? null;
      }

      setState({
        user,
        session,
        isLoading: false,
        isAuthenticated: !!user,
        profileAvatarUrl,
      });
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      load(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      load(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    ...state,
  };
}

export function useRequireAuth(redirectTo: string = "/login") {
  const { user, isLoading, isAuthenticated } = useAuth();
  return {
    user,
    isLoading,
    isAuthenticated,
    redirectTo,
  };
}

export function useAdmin() {
  const { user, isLoading, isAuthenticated } = useAuth();

  const isAdmin = user?.user_metadata?.role === "admin" || false;

  return {
    isAdmin,
    isLoading: isLoading || !isAuthenticated,
    user,
  };
}
