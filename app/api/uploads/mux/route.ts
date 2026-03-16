import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";
import { createClient as createServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tokenId = process.env.MUX_TOKEN_ID;
    const tokenSecret = process.env.MUX_TOKEN_SECRET;
    const corsOrigin = process.env.NEXT_PUBLIC_SITE_URL;

    if (!tokenId || !tokenSecret || !corsOrigin) {
      return NextResponse.json(
        { error: "Mux env vars missing" },
        { status: 500 },
      );
    }

    const mux = new Mux({ tokenId, tokenSecret });

    const upload = await mux.video.uploads.create({
      cors_origin: corsOrigin,
      new_asset_settings: {
        playback_policy: ["public"],
        mp4_support: "standard",
      },
    });

    return NextResponse.json({
      uploadId: upload.id,
      uploadUrl: upload.url,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
