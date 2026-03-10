import { createServerClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

// Route configurations
const AUTH_ROUTES = ['/login', '/register', '/forgot-password', '/auth/callback']
const PROTECTED_ROUTES = ['/profile', '/reviews/write', '/marketplace/sell', '/my-listings']
const ADMIN_ROUTES = ['/admin']

// Guest limit configuration
const GUEST_LIMIT = 5
const GUEST_TRACKED_ROUTES = ['/reviews/', '/brands/', '/profile/', '/products/']

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ??
    process.env.SUPABASE_URL

  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    process.env.SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      [
        "Your project's URL and Key are required to create a Supabase client!",
        '',
        'Set one of these env vars:',
        '- NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL)',
        '- NEXT_PUBLIC_SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, SUPABASE_ANON_KEY, SUPABASE_PUBLISHABLE_KEY)',
        '',
        'Find them in your Supabase project settings: Settings -> API.',
      ].join('\n')
    )
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })
          
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const guestSessionId = await handleGuestSession(request, response)

  const { pathname } = request.nextUrl
  const isApiRoute = pathname.startsWith('/api/')
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route))
  const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route))
  const isAdminRoute = ADMIN_ROUTES.some(route => pathname.startsWith(route))

  if (isApiRoute) {
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    return response
  }

  if (isAuthRoute) {
    if (user) {
      const redirectTo = request.nextUrl.searchParams.get('redirectedFrom') || '/'
      return NextResponse.redirect(new URL(redirectTo, request.url))
    }
    return response
  }

  if (isProtectedRoute && !user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirectedFrom', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAdminRoute) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const isAdmin = await checkIsAdmin(supabase, user.id)
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  if (!user && shouldTrackGuestView(pathname)) {
    const canProceed = await checkGuestLimit(supabase, guestSessionId, pathname)
    
    if (!canProceed) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirectedFrom', pathname)
      loginUrl.searchParams.set('reason', 'guest_limit')
      return NextResponse.redirect(loginUrl)
    }

    const remainingViews = await getRemainingGuestViews(supabase, guestSessionId)
    response.headers.set('X-Guest-Views-Remaining', String(remainingViews))
  }

  applySecurityHeaders(response)

  return response
}

async function handleGuestSession(request: NextRequest, response: NextResponse): Promise<string> {
  let sessionId = request.cookies.get('guest_session_id')?.value
  
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    
    response.cookies.set({
      name: 'guest_session_id',
      value: sessionId,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/'
    })
    
    response.cookies.set({
      name: 'suede_guest',
      value: 'true',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/'
    })
  }
  
  return sessionId
}

function shouldTrackGuestView(pathname: string): boolean {
  return GUEST_TRACKED_ROUTES.some(route => pathname.startsWith(route))
}

async function checkGuestLimit(supabase: SupabaseClient, sessionId: string, pathname: string): Promise<boolean> {
  try {
    const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    
    const { count, error } = await supabase
      .from('guest_activity')
      .select('*', { count: 'exact', head: true })
      .eq('session_id', sessionId)
      .gte('created_at', cutoffTime)

    if (error) {
      console.error('Guest limit check error:', error)
      return true
    }

    const currentCount = count || 0
    
    if (currentCount >= GUEST_LIMIT) {
      return false
    }

    const { error: insertError } = await supabase.from('guest_activity').insert({
      session_id: sessionId,
      activity_type: 'page_view',
      item_type: 'page',
      item_path: pathname,
      created_at: new Date().toISOString()
    });

    if (insertError) {
      console.error(insertError);
    }

    return true
  } catch (error) {
    console.error('Guest tracking error:', error)
    return true
  }
}

async function getRemainingGuestViews(supabase: SupabaseClient, sessionId: string): Promise<number> {
  const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  
  const { count } = await supabase
    .from('guest_activity')
    .select('*', { count: 'exact', head: true })
    .eq('session_id', sessionId)
    .gte('created_at', cutoffTime)

  return Math.max(0, GUEST_LIMIT - (count || 0))
}

async function checkIsAdmin(supabase: SupabaseClient, userId: string): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (user?.user_metadata?.role === 'admin') return true

    const { data } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', userId)
      .single()

    return data?.is_admin === true
  } catch {
    return false
  }
}

function applySecurityHeaders(response: NextResponse): void {
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('Strict-Transport-Security', 'max-age=63072000')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://*.supabase.co https://*.mux.com https://res.cloudinary.com; font-src 'self'; connect-src 'self' https://*.supabase.co https://api.stripe.com https://*.mux.com;"
  )
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
