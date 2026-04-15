"use server";

import { db } from "@/db";
import { newsletterSubscriptions } from "@/db/schema/core";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function subscribeToNewsletter(email: string) {
    if (!email || !email.includes("@")) {
        return { success: false, error: "Please provide a valid email address." };
    }

    try {
        // Check if already subscribed
        const existing = await db.query.newsletterSubscriptions.findFirst({
            where: eq(newsletterSubscriptions.email, email.toLowerCase()),
        });

        if (existing) {
            if (existing.status === "active") {
                return { success: false, error: "This email is already subscribed!" };
            } else {
                // Re-activate
                await db.update(newsletterSubscriptions)
                    .set({ status: "active", updatedAt: new Date() })
                    .where(eq(newsletterSubscriptions.id, existing.id));
                return { success: true, message: "Welcome back! Your subscription has been reactivated." };
            }
        }

        // New subscription
        await db.insert(newsletterSubscriptions).values({
            email: email.toLowerCase(),
            status: "active",
        });

        revalidatePath("/"); // Update footer everywhere if needed

        return { success: true, message: "Thank you for subscribing to our newsletter!" };
    } catch (error) {
        console.error("Newsletter subscription error:", error);
        return { success: false, error: "Failed to subscribe. Please try again later." };
    }
}
