import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

// Route configurations
const PUBLIC_ROUTES = ["/", "/about", "/brands", "/collections", "/reviews"];
const AUTH_ROUTES = ["/login", "/register", "/forgot-password", "/auth/callback"];
const PROTECTED_ROUTES = [
  "/profile",
  "/reviews/write",
  "/marketplace/sell",
  "/my-listings",
];
const ADMIN_ROUTES = ["/admin"];

// Guest limit configuration
const GUEST_LIMIT = 5;
const GUEST_TRACKED_ROUTES = ["/reviews/", "/brands/", "/profile/", "/products/"];

export async function proxy(request: NextRequest) {
  // First, update the session (from official docs)
  let response = await updateSession(request);

  // Get the supabase client from the updated response
  // We need to recreate it to access auth methods
  const { createServerClient } = await import("@supabase/ssr");
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // IMPORTANT: Do NOT remove this - refreshes session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get or create guest session
  const guestSessionId = await handleGuestSession(request, response);

  const { pathname } = request.nextUrl;
  const isApiRoute = pathname.startsWith("/api/");
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isAdminRoute = ADMIN_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  // 1. API Routes
  if (isApiRoute) {
    return response;
  }

  // 2. Auth Routes - Redirect logged in users away
  if (isAuthRoute) {
    if (user) {
      const redirectTo = request.nextUrl.searchParams.get("redirectedFrom") || "/";
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
    return response;
  }

  // 3. Protected Routes - Must be logged in
  if (isProtectedRoute && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectedFrom", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 4. Admin Routes - Must be admin
  if (isAdminRoute) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const isAdmin = await checkIsAdmin(supabase, user.id);
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // 5. Guest Limit Tracking
  if (!user && shouldTrackGuestView(pathname)) {
    const canProceed = await checkGuestLimit(supabase, guestSessionId, pathname);

    if (!canProceed) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirectedFrom", pathname);
      loginUrl.searchParams.set("reason", "guest_limit");
      return NextResponse.redirect(loginUrl);
    }

    const remainingViews = await getRemainingGuestViews(supabase, guestSessionId);
    response.headers.set("X-Guest-Views-Remaining", String(remainingViews));
  }

  return response;
}

// Helper functions
async function handleGuestSession(
  request: NextRequest,
  response: NextResponse
): Promise<string> {
  let sessionId = request.cookies.get("guest_session_id")?.value;

  if (!sessionId) {
    sessionId = crypto.randomUUID();

    response.cookies.set({
      name: "guest_session_id",
      value: sessionId,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    response.cookies.set({
      name: "suede_guest",
      value: "true",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });
  }

  return sessionId;
}

function shouldTrackGuestView(pathname: string): boolean {
  return GUEST_TRACKED_ROUTES.some((route) => pathname.startsWith(route));
}

async function checkGuestLimit(
  supabase: any,
  sessionId: string,
  pathname: string
): Promise<boolean> {
  try {
    const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { count, error } = await supabase
      .from("guest_activity")
      .select("*", { count: "exact", head: true })
      .eq("session_id", sessionId)
      .gte("created_at", cutoffTime);

    if (error) return true;

    const currentCount = count || 0;
    if (currentCount >= GUEST_LIMIT) return false;

    // Log view asynchronously
    supabase
      .from("guest_activity")
      .insert({
        session_id: sessionId,
        activity_type: "page_view",
        item_type: "page",
        item_path: pathname,
        created_at: new Date().toISOString(),
      })
      .catch(console.error);

    return true;
  } catch {
    return true;
  }
}

async function getRemainingGuestViews(
  supabase: any,
  sessionId: string
): Promise<number> {
  const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { count } = await supabase
    .from("guest_activity")
    .select("*", { count: "exact", head: true })
    .eq("session_id", sessionId)
    .gte("created_at", cutoffTime);

  return Math.max(0, GUEST_LIMIT - (count || 0));
}

async function checkIsAdmin(supabase: any, userId: string): Promise<boolean> {
  const { data } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", userId)
    .single();

  return data?.is_admin === true;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};