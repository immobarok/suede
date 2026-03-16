import { NextResponse } from "next/server";
import sharp from "sharp";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

const DEFAULT_MAX_WIDTH = 1600;
const DEFAULT_QUALITY = 80;
const DEFAULT_FORMAT = "webp";

export async function POST(request: Request) {
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const bucket = String(formData.get("bucket") ?? "images");
    const folder = String(formData.get("folder") ?? "uploads");
    const maxWidth = Number(formData.get("maxWidth") ?? DEFAULT_MAX_WIDTH);
    const quality = Number(formData.get("quality") ?? DEFAULT_QUALITY);
    const format = String(
      formData.get("format") ?? DEFAULT_FORMAT,
    ).toLowerCase();

    const buffer = Buffer.from(await file.arrayBuffer());
    const image = sharp(buffer).rotate();

    const output =
      format === "png"
        ? image
            .resize({ width: maxWidth, withoutEnlargement: true })
            .png({ quality })
        : format === "jpeg" || format === "jpg"
          ? image
              .resize({ width: maxWidth, withoutEnlargement: true })
              .jpeg({ quality, mozjpeg: true })
          : image
              .resize({ width: maxWidth, withoutEnlargement: true })
              .webp({ quality });

    const processed = await output.toBuffer();
    const extension = format === "jpg" ? "jpeg" : format;
    const filename = `${crypto.randomUUID()}.${extension}`;
    const path = `${folder}/${filename}`;

    const admin = createAdminClient();
    const { error: uploadError } = await admin.storage
      .from(bucket)
      .upload(path, processed, {
        contentType: `image/${extension}`,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data } = admin.storage.from(bucket).getPublicUrl(path);

    return NextResponse.json({
      path,
      publicUrl: data.publicUrl,
      bucket,
      width: maxWidth,
      format: extension,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
