"use server";

import { and, asc, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { aboutContentUploads } from "@/db/schema/about";
import { admins, profiles } from "@/db/schema/core";
import { hasValidAdminSession } from "@/lib/auth/admin-session";

type AboutSection =
  | "landing_hero"
  | "about_hero"
  | "mission"
  | "story"
  | "values"
  | "founder";
type AboutContentType = "image" | "video" | "text" | "json";
type AboutStatus = "draft" | "published" | "archived";

type UpsertAboutContentInput = {
  id?: string;
  section: AboutSection;
  contentType: AboutContentType;
  title?: string | null;
  body?: string | null;
  storageBucket?: string | null;
  storagePath?: string | null;
  publicUrl?: string | null;
  metadata?: Record<string, unknown>;
  sortOrder?: number;
  status?: AboutStatus;
  publishedAt?: Date | null;
};

async function assertDashboardAdminSession() {
  const isAuthed = await hasValidAdminSession();
  if (!isAuthed) {
    throw new Error("Forbidden");
  }
}

async function getSeededUploaderId() {
  const admin = await db.query.admins.findFirst({
    columns: { id: true },
  });

  if (admin?.id) {
    return admin.id;
  }

  const preferredEmail = process.env.ADMIN_SEEDED_EMAIL || "admin@local.suede";

  let profile = await db.query.profiles.findFirst({
    where: eq(profiles.email, preferredEmail),
    columns: { id: true },
  });

  if (!profile?.id) {
    const adminProfile = await db.query.profiles.findFirst({
      where: eq(profiles.role, "admin"),
      columns: { id: true },
    });

    if (adminProfile?.id) {
      profile = adminProfile;
    }
  }

  const profileId = profile?.id ?? crypto.randomUUID();

  if (!profile?.id) {
    await db.insert(profiles).values({
      id: profileId,
      email: preferredEmail,
      role: "admin",
      displayName: "Seeded Admin",
    });
  }

  await db
    .insert(admins)
    .values({ id: profileId })
    .onConflictDoNothing({ target: admins.id });

  return profileId;
}

export async function upsertAboutContent(input: UpsertAboutContentInput) {
  await assertDashboardAdminSession();

  const payload = {
    section: input.section,
    contentType: input.contentType,
    title: input.title ?? null,
    body: input.body ?? null,
    storageBucket: input.storageBucket ?? null,
    storagePath: input.storagePath ?? null,
    publicUrl: input.publicUrl ?? null,
    metadata: input.metadata ?? {},
    sortOrder: input.sortOrder ?? 0,
    status: input.status ?? "draft",
    publishedAt: input.publishedAt ?? null,
    updatedAt: new Date(),
  };

  if (input.id) {
    const [updated] = await db
      .update(aboutContentUploads)
      .set(payload)
      .where(eq(aboutContentUploads.id, input.id))
      .returning();

    return updated ?? null;
  }

  const [created] = await db
    .insert(aboutContentUploads)
    .values({
      ...payload,
      uploadedBy: await getSeededUploaderId(),
    })
    .returning();

  return created;
}

export async function deleteAboutContent(id: string) {
  await assertDashboardAdminSession();

  const [deleted] = await db
    .delete(aboutContentUploads)
    .where(eq(aboutContentUploads.id, id))
    .returning({ id: aboutContentUploads.id });

  return deleted ?? null;
}

export async function listAboutContentForAdmin(section?: AboutSection) {
  await assertDashboardAdminSession();

  return db.query.aboutContentUploads.findMany({
    where: section ? eq(aboutContentUploads.section, section) : undefined,
    orderBy: [
      asc(aboutContentUploads.section),
      asc(aboutContentUploads.sortOrder),
      desc(aboutContentUploads.createdAt),
    ],
  });
}

export async function listPublishedAboutContent(section?: AboutSection) {
  return db.query.aboutContentUploads.findMany({
    where: and(
      eq(aboutContentUploads.status, "published"),
      section ? eq(aboutContentUploads.section, section) : undefined,
    ),
    orderBy: [
      asc(aboutContentUploads.sortOrder),
      desc(aboutContentUploads.createdAt),
    ],
  });
}
