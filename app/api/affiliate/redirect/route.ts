import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/db';
import { affiliateLinks, affiliateClicks } from '@/db/schema/affiliates';
import { eq } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const affiliateLinkId = searchParams.get('link_id');

    if (!affiliateLinkId) {
      return NextResponse.json({ error: 'Missing affiliate link ID' }, { status: 400 });
    }

    // 1. Resolve destination url from DB using Drizzle
    const linkInfo = await db.query.affiliateLinks.findFirst({
      where: eq(affiliateLinks.id, affiliateLinkId),
      columns: {
        destinationUrl: true
      }
    });

    if (!linkInfo) {
      return NextResponse.json({ error: 'Invalid affiliate link' }, { status: 404 });
    }

    // 2. Generate suede_redirect_id securely (nanoid equivalent)
    const suedeRedirectId = crypto.randomBytes(12).toString('base64url');

    // 3. Hash IP securely
    const rawIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
      
    const salt = process.env.IP_HASH_SALT || 'fallback_suede_salt_123';
    const ipHash = crypto.createHash('sha256').update(`${rawIp}${salt}`).digest('hex');

    const userAgent = request.headers.get('user-agent') || 'unknown';

    // 4. Insert click record using Drizzle
    try {
      await db.insert(affiliateClicks).values({
        affiliateLinkId: affiliateLinkId,
        suedeRedirectId: suedeRedirectId,
        ipHash: ipHash,
        rawIp: rawIp,
        userAgent: userAgent
      });

    } catch (insertError) {
      console.error('Failed to log affiliate click:', insertError);
      // We proceed even if tracking fails, so we don't break the UX
    }

    // 5. Server-Side 302 Redirect with tracking ID appended
    const destinationUrl = new URL(linkInfo.destinationUrl);
    destinationUrl.searchParams.set('suede_click_id', suedeRedirectId);

    return NextResponse.redirect(destinationUrl.toString(), { status: 302 });
  } catch (error) {
    console.error('Affiliate redirect error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
