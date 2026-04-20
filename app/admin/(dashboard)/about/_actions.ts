"use server";

import { revalidatePath } from "next/cache";
import {
  deleteAboutContent,
  listAboutContentForAdmin,
  upsertAboutContent,
} from "@/app/actions/about-content";

type AboutSection =
  | "landing_hero"
  | "about_hero"
  | "mission"
  | "story"
  | "values"
  | "founder";

function getOptionalString(formData: FormData, key: string) {
  const value = formData.get(key);
  if (!value) return undefined;
  const text = String(value).trim();
  return text.length ? text : undefined;
}

function parseParagraphs(value?: string) {
  if (!value) return [];
  // If it's HTML (contains tags), return as a single element to preserve rich text
  if (value.includes("<") && value.includes(">")) {
    return [value];
  }
  return value
    .split("\n\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function buildMetadata(section: string, formData: FormData) {
  if (section === "values") {
    const stats = [1, 2, 3]
      .map((index) => ({
        value: getOptionalString(formData, `stat${index}Value`),
        description: getOptionalString(formData, `stat${index}Description`),
      }))
      .filter((item) => item.value || item.description);

    return { stats };
  }

  if (section === "founder") {
    const paragraphs = parseParagraphs(
      getOptionalString(formData, "founderParagraphs"),
    );

    return {
      label: getOptionalString(formData, "founderLabel"),
      name: getOptionalString(formData, "founderName"),
      role: getOptionalString(formData, "founderRole"),
      tagline: getOptionalString(formData, "founderTagline"),
      intro: getOptionalString(formData, "founderIntro"),
      paragraphs,
    };
  }

  return {};
}

function getContentType(section: string) {
  if (section === "values" || section === "founder") return "json";
  return "text";
}

function revalidateAboutPages() {
  revalidatePath("/admin/about");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/api/about");
}

export async function createAboutContentAction(formData: FormData) {
  "use server";

  const section = formData.get("section") as string;
  if (!section) return;

  await upsertAboutContent({
    section: section as AboutSection,
    contentType: getContentType(section),
    title: String(formData.get("title") ?? "") || null,
    body: String(formData.get("body") ?? "") || null,
    publicUrl: String(formData.get("publicUrl") ?? "") || null,
    storageBucket: String(formData.get("storageBucket") ?? "images") || null,
    storagePath: String(formData.get("storagePath") ?? "") || null,
    sortOrder: Number(formData.get("sortOrder") ?? 0),
    status: String(formData.get("status") ?? "published") as
      | "draft"
      | "published"
      | "archived",
    metadata: buildMetadata(section, formData),
  });

  revalidateAboutPages();
}

export async function updateAboutContentAction(formData: FormData) {
  "use server";

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const section = formData.get("section") as string;
  if (!section) return;

  const existingItems = await listAboutContentForAdmin();
  const existingItem = existingItems.find((item) => item.id === id);
  if (!existingItem) return;

  await upsertAboutContent({
    id,
    section: section as AboutSection,
    contentType: getContentType(section),
    title: formData.has("title")
      ? String(formData.get("title") ?? "") || null
      : existingItem.title,
    body: formData.has("body")
      ? String(formData.get("body") ?? "") || null
      : existingItem.body,
    publicUrl: formData.has("publicUrl")
      ? String(formData.get("publicUrl") ?? "") || null
      : existingItem.publicUrl,
    storageBucket: formData.has("storageBucket")
      ? String(formData.get("storageBucket") ?? "") || existingItem.storageBucket
      : existingItem.storageBucket,
    storagePath: formData.has("storagePath")
      ? String(formData.get("storagePath") ?? "") || null
      : existingItem.storagePath,
    sortOrder: formData.has("sortOrder")
      ? Number(formData.get("sortOrder"))
      : existingItem.sortOrder ?? 0,
    status: formData.has("status")
      ? (String(formData.get("status")) as "draft" | "published" | "archived")
      : (existingItem.status || "published"),
    metadata: buildMetadata(section, formData),
  });

  revalidateAboutPages();
}

export async function deleteAboutContentAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await deleteAboutContent(id);
  revalidateAboutPages();
}

export async function publishAboutContentAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const items = await listAboutContentForAdmin();
  const existing = items.find((item) => item.id === id);
  if (!existing) return;

  await upsertAboutContent({
    id,
    section: existing.section as AboutSection,
    contentType: existing.contentType as "image" | "video" | "text" | "json",
    title: existing.title,
    body: existing.body,
    publicUrl: existing.publicUrl,
    storageBucket: existing.storageBucket,
    storagePath: existing.storagePath,
    sortOrder: existing.sortOrder ?? 0,
    status: "published",
    metadata: (existing.metadata as Record<string, unknown>) || {},
    publishedAt: new Date(),
  });

  revalidateAboutPages();
}
