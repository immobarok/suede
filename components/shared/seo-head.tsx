import Head from 'next/head'
import { useRouter } from 'next/router'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'product'
  twitterCard?: 'summary' | 'summary_large_image'
  noIndex?: boolean
  noFollow?: boolean
  keywords?: string[]
  author?: string
  publishedTime?: string
  modifiedTime?: string
  structuredData?: Record<string, unknown>
}

const defaultSEO = {
  title: 'SUEDE - Find Your Perfect Fit',
  description: 'SUEDE matches you with reviews from people with similar body measurements. Discover emerging and minority-owned fashion brands that actually fit.',
  ogImage: 'https://suede.com/og-default.jpg',
  twitterCard: 'summary_large_image' as const,
  siteName: 'SUEDE',
  twitterHandle: '@suedefashion'
}

export function SEOHead({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noIndex = false,
  noFollow = false,
  keywords,
  author,
  publishedTime,
  modifiedTime,
  structuredData
}: SEOProps) {
  const router = useRouter()
  const currentUrl = `https://suede.com${router.asPath}`
  const canonicalUrl = canonical || currentUrl
  
  const fullTitle = title 
    ? `${title} | ${defaultSEO.siteName}`
    : defaultSEO.title

  const metaDescription = description || defaultSEO.description
  const ogImageUrl = ogImage || defaultSEO.ogImage

  // Robots meta
  const robotsContent = [
    noIndex ? 'noindex' : 'index',
    noFollow ? 'nofollow' : 'follow',
    'max-snippet:-1',
    'max-image-preview:large',
    'max-video-preview:-1'
  ].join(', ')

  // Default structured data (Organization)
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SUEDE',
    url: 'https://suede.com',
    logo: 'https://suede.com/logo.png',
    sameAs: [
      'https://twitter.com/suedefashion',
      'https://instagram.com/suedefashion'
    ],
    description: defaultSEO.description
  }

  // Merge with custom structured data
  const finalStructuredData = structuredData || defaultStructuredData

  return (
    <Head>
      {/* Basic Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Keywords (optional, less important for modern SEO) */}
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Author */}
      {author && <meta name="author" content={author} />}

      {/* Open Graph */}
      <meta property="og:site_name" content={defaultSEO.siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Article specific */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={defaultSEO.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#1a1a1a" />

      {/* Favicon */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://supabase.co" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData)
        }}
      />
    </Head>
  )
}

// Pre-configured SEO for specific page types
export function BrandSEO({ 
  brand, 
  reviewsCount 
}: { 
  brand: {
    name: string
    description: string
    slug: string
    logo_url?: string
    is_minority_owned?: boolean
    is_emerging?: boolean
  }
  reviewsCount: number
}) {
  const tags = [
    brand.is_minority_owned && 'minority-owned',
    brand.is_emerging && 'emerging designer',
    'fashion brand'
  ].filter((tag): tag is string => Boolean(tag))

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Brand',
    name: brand.name,
    description: brand.description,
    logo: brand.logo_url,
    url: `https://suede.com/brands/${brand.slug}`,
    aggregateRating: reviewsCount > 0 ? {
      '@type': 'AggregateRating',
      reviewCount: reviewsCount,
      ratingValue: '4.5' // Calculate dynamically
    } : undefined
  }

  return (
    <SEOHead
      title={`${brand.name} - Reviews & Size Guide`}
      description={`${brand.description} Read ${reviewsCount} reviews from shoppers with similar body measurements. ${tags.join(', ')}.`}
      canonical={`https://suede.com/brands/${brand.slug}`}
      ogImage={brand.logo_url}
      ogType="website"
      keywords={[brand.name, ...tags, 'size guide', 'fit reviews']}
      structuredData={structuredData}
    />
  )
}

export function ReviewSEO({ 
  review, 
  product, 
  brand 
}: { 
  review: {
    id: string
    title: string
    review_text: string
    overall_rating: number
    created_at: string
    photos?: string[]
  }
  product: { name: string }
  brand: { name: string; slug: string }
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: review.title,
    reviewBody: review.review_text,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.overall_rating,
      bestRating: 5
    },
    datePublished: review.created_at,
    itemReviewed: {
      '@type': 'Product',
      name: product.name,
      brand: {
        '@type': 'Brand',
        name: brand.name
      }
    },
    image: review.photos?.[0]
  }

  return (
    <SEOHead
      title={`${product.name} Review - ${brand.name}`}
      description={review.review_text.slice(0, 160)}
      canonical={`https://suede.com/reviews/${review.id}`}
      ogImage={review.photos?.[0]}
      ogType="article"
      publishedTime={review.created_at}
      structuredData={structuredData}
    />
  )
}

export function ProductSEO({
  product,
  brand
}: {
  product: {
    name: string
    description: string
    image_url?: string
    category?: string
  }
  brand: { name: string }
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image_url,
    brand: {
      '@type': 'Brand',
      name: brand.name
    },
    category: product.category,
    offers: {
      '@type': 'AggregateOffer',
      availability: 'https://schema.org/InStock'
    }
  }

  return (
    <SEOHead
      title={`${product.name} by ${brand.name}`}
      description={product.description}
      ogImage={product.image_url}
      ogType="product"
      structuredData={structuredData}
    />
  )
}
