"use server";

import { revalidatePath } from "next/cache";
import {
  deleteAboutContent,
  listAboutContentForAdmin,
  upsertAboutContent,
} from "@/app/actions/about-content";

export async function createAboutContentAction(formData: FormData) {
  "use server";

  const section = formData.get("section") as string;
  if (!section) return;

  // Build metadata object
  const metadata: Record<string, unknown> = {};

  if (section === "mission") {
    metadata.problemPercentage = formData.get("problemPercentage")
      ? Number(formData.get("problemPercentage"))
      : undefined;
    metadata.problemDescription = formData.get("problemDescription")
      ? String(formData.get("problemDescription"))
      : undefined;
    metadata.solutionPercentage = formData.get("solutionPercentage")
      ? Number(formData.get("solutionPercentage"))
      : undefined;
    metadata.solutionTitle = formData.get("solutionTitle")
      ? String(formData.get("solutionTitle"))
      : undefined;
    metadata.solutionDescription = formData.get("solutionDescription")
      ? String(formData.get("solutionDescription"))
      : undefined;
    metadata.matchScoreDescription = formData.get("matchScoreDescription")
      ? String(formData.get("matchScoreDescription"))
      : undefined;
  }

  if (section === "values") {
    const getValue = (key: string) => {
      const value = formData.get(key);
      return value && String(value).trim() !== "" ? String(value) : undefined;
    };

    metadata.header = {
      subtitle: getValue("headerSubtitle"),
      title: getValue("headerTitle"),
    };
    metadata.values = [
      {
        title: getValue("value1Title"),
        icon: getValue("value1Icon"),
        description: getValue("value1Description"),
      },
      {
        title: getValue("value2Title"),
        icon: getValue("value2Icon"),
        description: getValue("value2Description"),
      },
      {
        title: getValue("value3Title"),
        icon: getValue("value3Icon"),
        description: getValue("value3Description"),
      },
      {
        title: getValue("value4Title"),
        icon: getValue("value4Icon"),
        description: getValue("value4Description"),
      },
    ];
  }

  await upsertAboutContent({
    section: section as any,
    contentType: (section === "values" ? "json" : "text") as any,
    title: String(formData.get("title") ?? "") || null,
    body: String(formData.get("body") ?? "") || null,
    publicUrl: String(formData.get("publicUrl") ?? "") || null,
    storageBucket: String(formData.get("storageBucket") ?? "images") || null,
    storagePath: String(formData.get("storagePath") ?? "") || null,
    sortOrder: Number(formData.get("sortOrder") ?? 0),
    status: String(formData.get("status") ?? "published") as any,
    metadata,
  });

  revalidatePath("/admin/about");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/api/about");
}

export async function updateAboutContentAction(formData: FormData) {
  "use server";

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const section = formData.get("section") as string;
  if (!section) return;

  // Get existing item first to preserve fields that aren't in the form
  const existingItems = await listAboutContentForAdmin();
  const existingItem = existingItems.find((item) => item.id === id);
  if (!existingItem) return;

  // Build metadata object
  const metadata: Record<string, unknown> = {};

  if (section === "mission") {
    metadata.problemPercentage = formData.get("problemPercentage")
      ? Number(formData.get("problemPercentage"))
      : undefined;
    metadata.problemDescription = formData.get("problemDescription")
      ? String(formData.get("problemDescription"))
      : undefined;
    metadata.solutionPercentage = formData.get("solutionPercentage")
      ? Number(formData.get("solutionPercentage"))
      : undefined;
    metadata.solutionTitle = formData.get("solutionTitle")
      ? String(formData.get("solutionTitle"))
      : undefined;
    metadata.solutionDescription = formData.get("solutionDescription")
      ? String(formData.get("solutionDescription"))
      : undefined;
    metadata.matchScoreDescription = formData.get("matchScoreDescription")
      ? String(formData.get("matchScoreDescription"))
      : undefined;
  }

  if (section === "values") {
    const getValue = (key: string) => {
      const value = formData.get(key);
      return value && String(value).trim() !== "" ? String(value) : undefined;
    };

    metadata.header = {
      subtitle: getValue("headerSubtitle"),
      title: getValue("headerTitle"),
    };
    metadata.values = [
      {
        title: getValue("value1Title"),
        icon: getValue("value1Icon"),
        description: getValue("value1Description"),
      },
      {
        title: getValue("value2Title"),
        icon: getValue("value2Icon"),
        description: getValue("value2Description"),
      },
      {
        title: getValue("value3Title"),
        icon: getValue("value3Icon"),
        description: getValue("value3Description"),
      },
      {
        title: getValue("value4Title"),
        icon: getValue("value4Icon"),
        description: getValue("value4Description"),
      },
    ];
  }

  await upsertAboutContent({
    id,
    section: section as any,
    contentType: (section === "values" ? "json" : "text") as any,
    title: formData.has("title") ? (String(formData.get("title") ?? "") || null) : existingItem.title,
    body: formData.has("body") ? (String(formData.get("body") ?? "") || null) : existingItem.body,
    publicUrl: formData.has("publicUrl") ? (String(formData.get("publicUrl") ?? "") || null) : existingItem.publicUrl,
    storageBucket: formData.has("storageBucket") ? (String(formData.get("storageBucket") ?? "") || existingItem.storageBucket) : existingItem.storageBucket,
    storagePath: formData.has("storagePath") ? (String(formData.get("storagePath") ?? "") || null) : existingItem.storagePath,
    sortOrder: formData.has("sortOrder") ? Number(formData.get("sortOrder")) : existingItem.sortOrder ?? 0,
    status: formData.has("status") ? String(formData.get("status")) as any : (existingItem.status || "published") as any,
    metadata,
  });

  revalidatePath("/admin/about");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/api/about");
}

export async function deleteAboutContentAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await deleteAboutContent(id);
  revalidatePath("/admin/about");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/api/about");
}

export async function publishAboutContentAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const item = await listAboutContentForAdmin();
  const existing = item.find((i) => i.id === id);
  if (!existing) return;

  await upsertAboutContent({
    id,
    section: existing.section,
    contentType: existing.contentType,
    title: existing.title,
    body: existing.body,
    publicUrl: existing.publicUrl,
    storageBucket: existing.storageBucket,
    storagePath: existing.storagePath,
    sortOrder: existing.sortOrder ?? 0,
    status: "published",
    metadata: existing.metadata as Record<string, unknown>,
    publishedAt: new Date(),
  });

  revalidatePath("/admin/about");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/api/about");
}
