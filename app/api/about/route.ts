import { NextResponse } from "next/server";
import { listPublishedAboutContent } from "@/app/actions/about-content";

export async function GET() {
  try {
    const content = await listPublishedAboutContent();

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
