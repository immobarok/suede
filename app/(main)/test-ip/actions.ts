"use server";

import crypto from "crypto";
import { headers } from "next/headers";
import { db } from "@/db";
import { affiliateLinks, affiliateClicks, affiliates } from "@/db/schema/affiliates";

export async function testIpHashAction() {
  try {
    const headersList = await headers();
    
    // 1. Get raw IP (used only for hashing)
    const rawIp =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      "127.0.0.1"; // Fallback for local testing if needed

    // 2. Hash IP securely (same logic as the redirect route)
    const salt = process.env.IP_HASH_SALT || "fallback_suede_salt_123";
    const ipHash = crypto.createHash("sha256").update(`${rawIp}${salt}`).digest("hex");

    // 3. Generate a fake suedeRedirectId for testing
    const testSuedeRedirectId = `test_${crypto.randomBytes(8).toString("hex")}`;

    // 4. Create a dummy affiliate link first (if one doesn't exist) to satisfy the foreign key
    let defaultLink = await db.query.affiliateLinks.findFirst();
    
    if (!defaultLink) {
      // We need an affiliate to create a link
      let defaultAffiliate = await db.query.affiliates.findFirst();
      if (!defaultAffiliate) {
        const [newAffiliate] = await db.insert(affiliates).values({
          name: "Test Affiliate",
          email: `test.affiliate.${Date.now()}@example.com`,
        }).returning();
        defaultAffiliate = newAffiliate;
      }
      
      const [newLink] = await db.insert(affiliateLinks).values({
        affiliateId: defaultAffiliate!.id,
        destinationUrl: "https://example.com/test",
      }).returning();
      defaultLink = newLink;
    }

    // 5. Insert test click record
    const [insertedClick] = await db.insert(affiliateClicks).values({
      affiliateLinkId: defaultLink.id,
      suedeRedirectId: testSuedeRedirectId,
      ipHash: ipHash,
    }).returning();

    return {
      success: true,
      data: {
        ipHash,
        clickRecord: insertedClick,
      },
    };
  } catch (error) {
    console.error("Test IP Hash error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
