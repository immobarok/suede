import { NextResponse } from 'next/server';
import { db } from '@/db';
import { affiliateConversions } from '@/db/schema/affiliates';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // The network event ID is mandatory for idempotency
    const networkEventId = body.event_id || body.transaction_id || body.id;

    if (!networkEventId) {
      return NextResponse.json(
        { error: 'Missing network event ID for idempotency' },
        { status: 400 }
      );
    }

    const suedeRedirectId = body.suede_click_id || body.sub_id;
    const commissionAmount = body.commission || body.payout || 0;

    // Insert conversion directly using Drizzle
    try {
      await db.insert(affiliateConversions).values({
        suedeRedirectId: suedeRedirectId || null,
        networkEventId: networkEventId,
        rawPayload: body,
        commissionAmount: commissionAmount.toString(),
        status: 'pending'
      });
    } catch (insertError: any) {
      // Postgres error code 23505 is for UNIQUE VIOLATION
      if (insertError.code === '23505') {
        console.log(`Idempotency hit: Webhook with event_id ${networkEventId} already processed.`);
        // Return 200 OK so the network STOPS retrying duplicate webhooks!
        return NextResponse.json({ success: true, message: 'Already processed' }, { status: 200 });
      }

      console.error('Failed to insert affiliate conversion:', insertError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Affiliate webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
