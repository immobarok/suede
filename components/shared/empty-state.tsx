import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { 
  Search, 
  Package, 
  FileText, 
  Users, 
  ShoppingBag, 
  Heart,
  MessageSquare,
  type LucideIcon 
} from 'lucide-react'
import Link from 'next/link'

type EmptyStateType = 
  | 'search' 
  | 'reviews' 
  | 'products' 
  | 'brands' 
  | 'listings' 
  | 'favorites' 
  | 'messages'
  | 'orders'
  | 'custom'

interface EmptyStateProps {
  type?: EmptyStateType
  title?: string
  description?: string
  icon?: LucideIcon
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  secondaryAction?: {
    label: string
    href?: string
    onClick?: () => void
  }
  className?: string
  compact?: boolean
}

const defaultContent: Record<EmptyStateType, { 
  title: string
  description: string
  icon: LucideIcon 
}> = {
  search: {
    title: 'No results found',
    description: 'Try adjusting your search or filters to find what you are looking for.',
    icon: Search
  },
  reviews: {
    title: 'No reviews yet',
    description: 'Be the first to share your experience and help others find their perfect fit.',
    icon: FileText
  },
  products: {
    title: 'No products available',
    description: 'Check back soon for new arrivals from this brand.',
    icon: Package
  },
  brands: {
    title: 'No brands found',
    description: 'We are constantly adding new brands. Check back soon!',
    icon: Users
  },
  listings: {
    title: 'No listings yet',
    description: 'Start selling your pre-loved fashion items on our marketplace.',
    icon: ShoppingBag
  },
  favorites: {
    title: 'No favorites yet',
    description: 'Start exploring and save items you love to your collection.',
    icon: Heart
  },
  messages: {
    title: 'No messages yet',
    description: 'Your conversations with brands and sellers will appear here.',
    icon: MessageSquare
  },
  orders: {
    title: 'No orders yet',
    description: 'Start shopping to see your order history here.',
    icon: ShoppingBag
  },
  custom: {
    title: 'Nothing to show',
    description: 'There is no content to display at this time.',
    icon: Package
  }
}

export function EmptyState({
  type = 'custom',
  title: customTitle,
  description: customDescription,
  icon: CustomIcon,
  action,
  secondaryAction,
  className,
  compact = false
}: EmptyStateProps) {
  const content = defaultContent[type]
  const Icon = CustomIcon || content.icon
  const title = customTitle || content.title
  const description = customDescription || content.description

  if (compact) {
    return (
      <div className={cn('text-center py-8', className)}>
        <Icon className="w-10 h-10 text-suede-300 mx-auto mb-3" strokeWidth={1.5} />
        <h3 className="text-sm font-semibold text-suede-900 mb-1">{title}</h3>
        <p className="text-xs text-suede-500 max-w-xs mx-auto">{description}</p>
        {action && (
          <div className="mt-3">
            {action.href ? (
              <Button asChild size="sm" variant="outline">
                <Link href={action.href}>{action.label}</Link>
              </Button>
            ) : (
              <Button size="sm" variant="outline" onClick={action.onClick}>
                {action.label}
              </Button>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={cn('text-center py-16 px-4', className)}>
      <div className="w-24 h-24 bg-suede-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="w-12 h-12 text-suede-400" strokeWidth={1.5} />
      </div>
      
      <h3 className="text-xl font-semibold text-suede-900 mb-2">
        {title}
      </h3>
      
      <p className="text-suede-600 max-w-md mx-auto mb-8 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {action && (
          action.href ? (
            <Button asChild size="lg">
              <Link href={action.href}>{action.label}</Link>
            </Button>
          ) : (
            <Button size="lg" onClick={action.onClick}>
              {action.label}
            </Button>
          )
        )}
        
        {secondaryAction && (
          secondaryAction.href ? (
            <Button asChild variant="outline" size="lg">
              <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
            </Button>
          ) : (
            <Button variant="outline" size="lg" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )
        )}
      </div>
    </div>
  )
}

// Specialized empty states for common use cases
export function NoSearchResults({ 
  query, 
  onClear 
}: { 
  query: string
  onClear: () => void 
}) {
  return (
    <EmptyState
      type="search"
      title={`No results for "${query}"`}
      description="Try checking for typos, using fewer filters, or searching for something related."
      action={{ label: 'Clear search', onClick: onClear }}
    />
  )
}

export function NoReviewsYet({ 
  brandName, 
  onWriteReview 
}: { 
  brandName?: string
  onWriteReview?: () => void 
}) {
  return (
    <EmptyState
      type="reviews"
      title={brandName ? `No reviews for ${brandName} yet` : 'No reviews yet'}
      description="Be the first to share your fit experience and help the community find their perfect size."
      action={onWriteReview ? { label: 'Write a review', onClick: onWriteReview } : undefined}
    />
  )
}

export function GuestLimitReached({ onLogin }: { onLogin: () => void }) {
  return (
    <EmptyState
      type="custom"
      icon={Search}
      title="Viewing limit reached"
      description="You have viewed 5 items as a guest. Create a free account to unlock unlimited access to reviews, brands, and personalized fit recommendations."
      action={{ label: 'Create free account', onClick: onLogin }}
      secondaryAction={{ label: 'Log in', onClick: onLogin }}
    />
  )
}