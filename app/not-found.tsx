'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Search,
  Home,
  ArrowLeft,
  ShoppingBag,
  Ruler,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import "./globals.css";

export default function NotFound() {
  const pathname = usePathname()

  // Determine context based on URL
  const getContext = () => {
    if (pathname.includes('/brands')) {
      return {
        title: 'Brand Not Found',
        message: "We couldn't find this brand in our directory. They may not be listed yet or the URL might be incorrect.",
        icon: ShoppingBag,
        suggestions: [
          { label: 'Browse All Brands', href: '/brands' },
          { label: 'Suggest a Brand', href: '/brands/suggest' }
        ]
      }
    }

    if (pathname.includes('/reviews')) {
      return {
        title: 'Review Not Found',
        message: "This review doesn't exist or may have been removed by the author.",
        icon: Ruler,
        suggestions: [
          { label: 'Browse Reviews', href: '/reviews' },
          { label: 'Write a Review', href: '/reviews/write' }
        ]
      }
    }

    if (pathname.includes('/marketplace')) {
      return {
        title: 'Listing Not Found',
        message: "This item is no longer available or the listing has expired.",
        icon: ShoppingBag,
        suggestions: [
          { label: 'Browse Marketplace', href: '/marketplace' },
          { label: 'Sell an Item', href: '/marketplace/sell' }
        ]
      }
    }

    if (pathname.includes('/profile')) {
      return {
        title: 'Profile Not Found',
        message: "This user doesn't exist or their profile is private.",
        icon: Sparkles,
        suggestions: [
          { label: 'Discover Community', href: '/brands' }
        ]
      }
    }

    return {
      title: 'Page Not Found',
      message: "We couldn't find what you're looking for. The page may have moved or doesn't exist.",
      icon: Search,
      suggestions: [
        { label: 'Go Home', href: '/' },
        { label: 'Browse Brands', href: '/brands' }
      ]
    }
  }

  const context = getContext()
  const Icon = context.icon

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-suede-50 flex items-center justify-center px-4 py-12">
          <div className="max-w-2xl w-full text-center">

            {/* Animated 404 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <span className="text-9xl font-bold text-suede-200 select-none">
                  404
                </span>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <div className="w-24 h-24 bg-suede-900 rounded-full flex items-center justify-center shadow-2xl">
                    <Icon className="w-12 h-12 text-white" strokeWidth={1.5} />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-3xl font-bold text-suede-900 mb-4">
                {context.title}
              </h1>

              <p className="text-lg text-suede-600 mb-8 max-w-md mx-auto leading-relaxed">
                {context.message}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button asChild size="lg" className="gap-2">
                  <Link href={context.suggestions[0].href}>
                    <Home className="w-4 h-4" />
                    {context.suggestions[0].label}
                  </Link>
                </Button>

                {context.suggestions[1] && (
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <Link href={context.suggestions[1].href}>
                      {context.suggestions[1].label}
                    </Link>
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="lg"
                  className="gap-2"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </Button>
              </div>

              {/* Helpful Links */}
              <div className="border-t border-suede-200 pt-8">
                <p className="text-sm text-suede-500 mb-4">
                  Looking for something else?
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link
                    href="/brands"
                    className="text-sm text-suede-600 hover:text-suede-900 underline underline-offset-4"
                  >
                    All Brands
                  </Link>
                  <Link
                    href="/collections"
                    className="text-sm text-suede-600 hover:text-suede-900 underline underline-offset-4"
                  >
                    Collections
                  </Link>
                  <Link
                    href="/reviews"
                    className="text-sm text-suede-600 hover:text-suede-900 underline underline-offset-4"
                  >
                    Reviews
                  </Link>
                  <Link
                    href="/marketplace"
                    className="text-sm text-suede-600 hover:text-suede-900 underline underline-offset-4"
                  >
                    Marketplace
                  </Link>
                  <Link
                    href="/help"
                    className="text-sm text-suede-600 hover:text-suede-900 underline underline-offset-4"
                  >
                    Help Center
                  </Link>
                </div>
              </div>

              {/* Search Suggestion */}
              <motion.div
                className="mt-8 p-4 bg-white rounded-lg border border-suede-200 inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-sm text-suede-600 mb-2">
                  Try searching instead:
                </p>
                <form action="/search" className="flex gap-2">
                  <input
                    type="search"
                    name="q"
                    placeholder="Search brands, reviews..."
                    className="px-4 py-2 border border-suede-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-suede-900 w-64"
                    defaultValue={pathname.split('/').pop()?.replace(/-/g, ' ')}
                  />
                  <Button type="submit" size="sm">
                    <Search className="w-4 h-4" />
                  </Button>
                </form>
              </motion.div>
            </motion.div>

            {/* Brand Element */}
            <motion.div
              className="mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/" className="inline-flex items-center gap-2 text-suede-400 hover:text-suede-600 transition-colors">
                <span className="font-bold text-xl tracking-tight">SUEDE</span>
                <span className="text-sm">Find Your Perfect Fit</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </body>
    </html>
  )
}