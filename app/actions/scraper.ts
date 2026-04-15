"use server";

export async function scrapeProductMetadata(url: string) {
  try {
    // Basic URL validation
    const validUrl = new URL(url);
    
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
        return { error: `Failed to fetch URL: ${response.statusText}` };
    }

    const html = await response.text();

    const getMeta = (property: string) => {
      // Direct property/name match
      const regex = new RegExp(`<meta[^>]*(?:property|name)=["']${property}["'][^>]*content=["']([^"']*)["']`, "i");
      let match = html.match(regex);
      if (match) return match[1];
      
      // Reverse order (content first)
      const reverseRegex = new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*(?:property|name)=["']${property}["']`, "i");
      match = html.match(reverseRegex);
      return match ? match[1] : null;
    };

    const getLink = (rel: string) => {
      const regex = new RegExp(`<link[^>]*rel=["']${rel}["'][^>]*href=["']([^"']*)["']`, "i");
      const match = html.match(regex);
      return match ? match[1] : null;
    };

    const getTitle = () => {
      const match = html.match(/<title>([^<]*)<\/title>/i);
      return match ? match[1] : null;
    };

    // Extracting fields with extensive fallbacks
    const productName = 
        getMeta("og:title") || 
        getMeta("twitter:title") || 
        getTitle() || 
        "Product found";

    const brandName = 
        getMeta("og:site_name") || 
        getMeta("application-name") ||
        validUrl.hostname.replace("www.", "").split(".")[0];

    const productImageUrl = 
        getMeta("og:image") || 
        getMeta("og:image:url") || 
        getMeta("og:image:secure_url") || 
        getMeta("twitter:image") || 
        getMeta("twitter:image:src") ||
        getLink("image_src") ||
        getLink("apple-touch-icon");

    return {
      productName: productName.trim(),
      brandName: brandName.charAt(0).toUpperCase() + brandName.slice(1),
      productImageUrl,
      success: true,
    };
  } catch (error) {
    console.error("Scraping error:", error);
    return { error: "Could not retrieve product information. Please check the URL." };
  }
}
