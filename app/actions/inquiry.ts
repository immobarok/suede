"use server";

import { db } from "@/db";
import { reviewRequests } from "@/db/schema/lookbook";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { scrapeProductMetadata } from "./scraper";
import { desc, eq } from "drizzle-orm";

export async function fetchProductMetadata(url: string) {
  return await scrapeProductMetadata(url);
}

export async function submitInquiry(formData: {
  productUrl: string;
  selectedSizes: string[];
  specificQuestions: string;
  productName?: string;
  brandName?: string;
  productImageUrl?: string;
}) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "You must be logged in to submit an inquiry." };
    }

    // Insert into review_requests table
    await db.insert(reviewRequests).values({
      userId: user.id,
      productUrl: formData.productUrl,
      productName: formData.productName || "Pending Product",
      brandName: formData.brandName || "Unknown Brand",
      productImageUrl: formData.productImageUrl,
      sizeInterested: formData.selectedSizes.join(", "),
      specificQuestions: formData.specificQuestions,
      status: "open",
    });

    revalidatePath("/admin/inquiries");
    
    return { success: true };
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    return { success: false, error: "Failed to submit inquiry. Please try again later." };
  }
}

export async function getUserInquiries() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Not authenticated" };
    }

    const inquiries = await db
      .select({
        id: reviewRequests.id,
        productName: reviewRequests.productName,
        brandName: reviewRequests.brandName,
        productImageUrl: reviewRequests.productImageUrl,
        productUrl: reviewRequests.productUrl,
        sizeInterested: reviewRequests.sizeInterested,
        specificQuestions: reviewRequests.specificQuestions,
        status: reviewRequests.status,
        responsesCount: reviewRequests.responsesCount,
        createdAt: reviewRequests.createdAt,
      })
      .from(reviewRequests)
      .where(eq(reviewRequests.userId, user.id))
      .orderBy(desc(reviewRequests.createdAt));

    return { success: true, inquiries };
  } catch (error) {
    console.error("Error fetching user inquiries:", error);
    return { success: false, error: "Failed to fetch inquiries" };
  }
}
