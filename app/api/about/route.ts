import { NextResponse } from "next/server";
import { listPublishedAboutContent } from "@/app/actions/about-content";

type AboutItem = Awaited<ReturnType<typeof listPublishedAboutContent>>[number];

function normalizeSectionKey(section: string) {
  if (section === "etymology") return "mission";
  if (section === "our_origin") return "story";
  if (section === "our_values") return "values";
  return section;
}

function normalizeMetadata(metadata: unknown) {
  if (!metadata) return {};
  if (typeof metadata === "object" && !Array.isArray(metadata)) return metadata;

  if (typeof metadata === "string") {
    try {
      const parsed = JSON.parse(metadata);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      return {};
    }
  }

  return {};
}

function buildPublicUrl(item: AboutItem) {
  if (item.publicUrl) return item.publicUrl;
  if (!item.storageBucket || !item.storagePath) return null;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return null;

  const normalizedBase = supabaseUrl.endsWith("/")
    ? supabaseUrl.slice(0, -1)
    : supabaseUrl;
  const normalizedPath = item.storagePath.startsWith("/")
    ? item.storagePath.slice(1)
    : item.storagePath;

  return `${normalizedBase}/storage/v1/object/public/${item.storageBucket}/${normalizedPath}`;
}

function normalizeAboutItem(item: AboutItem) {
  const publicUrl = buildPublicUrl(item);

  return {
    ...item,
    section: normalizeSectionKey(item.section),
    metadata: normalizeMetadata(item.metadata),
    publicUrl,
    public_url: publicUrl,
  };
}

export async function GET() {
  try {
    const content = (await listPublishedAboutContent()).map(normalizeAboutItem);

    // Group by section
    const groupedContent = content.reduce(
      (acc, item) => {
        if (!acc[item.section]) {
          acc[item.section] = [];
        }
        acc[item.section].push(item);
        return acc;
      },
      {} as Record<string, typeof content>,
    );

    if (!groupedContent.quote && groupedContent.founder) {
      groupedContent.quote = groupedContent.founder;
    }

    return NextResponse.json(groupedContent, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Error fetching about content:", error);
    return NextResponse.json(
      { error: "Failed to fetch about content" },
      { status: 500 },
    );
  }
}
