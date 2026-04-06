"use server";

import crypto from "crypto";
import { db } from "@/db";
import {
  affiliateLinks,
  affiliateClicks,
  affiliateConversions,
} from "@/db/schema/affiliates";
import { eq } from "drizzle-orm";

export async function resolveAffiliateLink(affiliateLinkId: string) {
  if (!affiliateLinkId) {
    throw new Error("Missing affiliate link ID");
  }

  const linkInfo = await db.query.affiliateLinks.findFirst({
    where: eq(affiliateLinks.id, affiliateLinkId),
    columns: {
      destinationUrl: true,
    },
  });

  if (!linkInfo) {
    throw new Error("Invalid affiliate link");
  }

  return { destinationUrl: linkInfo.destinationUrl };
}

export async function trackAffiliateClick(
  affiliateLinkId: string,
  ipHash?: string,
) {
  const suedeRedirectId = crypto.randomBytes(12).toString("base64url");

  const rawIp = "unknown";
  const salt = process.env.IP_HASH_SALT || "fallback_suede_salt_123";
  const computedIpHash =
    ipHash ||
    crypto.createHash("sha256").update(`${rawIp}${salt}`).digest("hex");

  try {
    await db.insert(affiliateClicks).values({
      affiliateLinkId,
      suedeRedirectId,
      ipHash: computedIpHash,
    });
  } catch (error) {
    console.error("Failed to log affiliate click:", error);
  }

  return { suedeRedirectId };
}

export async function recordAffiliateConversion(
  networkEventId: string,
  suedeRedirectId?: string,
  commissionAmount?: number,
) {
  if (!networkEventId) {
    throw new Error("Missing network event ID for idempotency");
  }

  try {
    await db.insert(affiliateConversions).values({
      suedeRedirectId: suedeRedirectId || null,
      networkEventId,
      rawPayload: {},
      commissionAmount: (commissionAmount || 0).toString(),
      status: "pending",
    });

    return { success: true };
  } catch (error: any) {
    if (error.code === "23505") {
      return { success: true, message: "Already processed" };
    }
    console.error("Failed to insert affiliate conversion:", error);
    throw new Error("Database error");
  }
}
